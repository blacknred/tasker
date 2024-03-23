# Taskapp

<img src="apps/gateway/nginx/www/logo.svg" width="75" alt="Taskapp Logo"/>

Sample b2b agile task management app

[![CI](https://github.com/blacknred/be-taskapp/workflows/release/badge.svg)](https://github.com/blacknred/be-taskapp/actions)

| Nav              | Title             | Content                                                                            |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------- |
| Search           | Search</span>     | <span style="color:red">__Search__</span>: search_bar,filters                      |
| Work             | Work              | <span style="color:red">__Notification__</span>: assigned,subscribed;+issue        |
| Projects         | Projects,+project | <span style="color:blue">__Project__</span>: board,roadmap,backlog,settings;+issue |
| -- Recent        | Name*             | localstorage                                                                       |
| Filters          | Filters,+filter   | <span style="color:red">__Workspace__.user.attributes</span>                       |
| -- Recent        | Name*             | localstorage                                                                       |
|                  |                   |                                                                                    |
| Reports          | Reports           | <span style="color:red">__Report__</span>: Name*, filters, +generate               |
| People           | People,+user      | <span style="color:red">__Workspace__.users</span>                                 |
| Settings         | Settings          | <span style="color:red">__Workspace__.attributes.roles</span>                      |
|                  |                   |                                                                                    |
| Profile(KK_link) |                   |                                                                                    |

## Architecture

### Node

| Services          | Container           | Stack                      | Ports       |
| ----------------- | ------------------- | -------------------------- | ----------- |
| __apps__          | -                   | -                          | -           |
| IDP               | keycloak            | Keycloak, REST             | 8080/8443   |
| Workspace         | workspace-svc       | NodeJs, GRPC, AMQP         | 50051       |
| Notification      | notification-svc    | NodeJs, GRPC, AMQP         | 50052       |
| Search            | search-svc          | NodeJs, GRPC, AMQP         | 50053       |
| Report            | report-svc          | NodeJs, GRPC, AMQP         | 50054       |
| Project Command   | project-command-svc | NodeJs, GRPC, AMQP         | 50055       |
| Project Query     | project-query-svc   | NodeJs, GRPC, AMQP         | 50056       |
| Api Gateway       | gateway             | Golang, REST/GRPC, Swagger | 80/443/8000 |
| __data__          | -                   | -                          | -           |
| Queue             | rabbitmq            | RabbitMQ                   | 5672/15672  |
| Workspace DB      | postgres            | Postgres                   | 5432/5442   |
| Project DB        | mongo(replica set)  | MongoDB                    | 27017/27018 |
| Text Search DB    | redissearch         | RediSearch                 | 6379/6389   |
| Report DB         | clickhouse          | Clickhouse                 | 8123/9440   |
| Notification DB   | cassandra           | Cassandra                  | 7000        |
| Object storage    | minio               | Minio                      | 9000        |
| __monitoring__    | -                   | -                          | -           |
| Logs aggregator   | fluent-bit          | Fluent Bit                 | 24224       |
| Container metrics | cadvisor            | Prom cadvisor              | 8081        |
| Unix metrics      | node-exporter       | Prom node exporter         | 9100        |
| Postgres metrics  | postgres-exporter   | Prom postgres exporter     | 9187        |
| Mongo metrics     | mongo-exporter      | Prom mongo exporter        | 9001        |
| Redis metrics     | redis-exporter      | Prom redis exporter        | 9121        |

### Monitoring machine

| Services           | Container         | Stack                        | Ports       |
| ------------------ | ----------------- | ---------------------------- | ----------- |
| Tracing            | jaeger            | Jaeger                       | 9411/16686  |
| Prometheus         | prometheus        | Prometheus                   | 9090        |
| Logs storage       | loki              | Grafana Loki                 | 3100        |
| Grafana            | grafana           | Grafana                      | 80          |
| Alerts             | alertmanager      | Alertmanager                 | 9093        |
| Alerts bot         | alertmanager-bot  | Alertmanager Bot             | 8080        |

### Services(monorepo)

#### IDP

> Keycloak

- Multitenancy. Since this app is a sort of b2b we need a separated workspaces of users, roles and sso clients. There are some possible implementations in Keycloak (<https://github.com/keycloak/keycloak/discussions/23948>):
  - "keycloak per workspace": con is resource greadiness
  - *"realm per workspace": con is realm creation time grows exponentially for 300+ realms on single instance (<https://github.com/keycloak/keycloak/discussions/11074>) and the new storage model is the only way to eliminate such obstacles in future versions. Here we use realm per workspace implementation for simplicity but after all you can have ballancer and multiple instances with up to 300 realms each.
  - "group as workspace within one realm": cons are slowness after ~250k users in realm, need to put available groups in a token, too much policy granularity in a client, usernames cannot be duplicated within a realm, redirect_uri will be the same for all workspaces.
- Perfomance. Keycloak on 4core/8threads + 16gbRam machine gives us:
  - 1400–1700 TPS per core in token introspecting: 1400 TPS for tokeninfo endpoint, and 1700 TPS for userinfo endpoint.
  - 200 TPS per core in token refreshing.
  - 10-75 TPS per core in session opening. 75 TPS if the user passwords storage is a third-party system (LDAP directory etc) or if the PBKDF2 function is configured with one iteration. The choice of the database has no significant impact on performance.
- Auth. Every workspace(realm) has its own
  - roles(owner, admin, product_owner, scrum_master, worker), users(owner, system, ~~sso-proxy~~) and groups(future projects)
  - client(system, sso-proxy)
    - Resource(object):
    - __res:workspace__, __res:role__, __res:user__,
    - __res:project__, __res:sprint__, __res:issue__, __res:comment__, __res:vote__, __res:subscription__
    - Scope(action): __scope:create__, __scope:read__, __scope:update__, __scope:delete__
    - Policy(roles mappings): Admin(mapped roles, e.g. "admin")
    - Permission(resource or resource:scopes mappings): resource:policies or resource:scopes:policies mapping
      - __workspace:update__, __workspace:delete__
      - __role:create__, __role:read__, __role:update__, __role:delete__
      - __user:create__, __user:read__, __user:update__, __user:delete__
      - __project:create__, __project:read__, __project:update__, __project:delete__
      - __sprint:create__, __sprint:read__, __sprint:update__, __sprint:delete__
      - __issue:create__, __issue:read__, __issue:update__, __issue:delete__
      - __comment:create__, __comment:read__, __comment:update__, __comment:delete__
      - __vote:create__, __vote:read__, __vote:update__, __vote:delete__
      - __subscription:create__, __subscription:read__, __subscription:update__, __subscription:delete__
    - token retrospection: {..., permissions: {"scopes": ["scope:create"], "rsid": some_uuid, "rsname": "res:report"}[]}

In the current version without multi-tenancy, system(administrator) implements operations in all workspaces(realms) since it has access to them as a realm user & client. There are Realm roles(admin, user, manager etc) and Client roles(post, comment, like etc at the client level)



#### Workspace

> Microservice for IDP operation automation and system compatibility.

- Why do we use this microservice as an adapter instead of calling Keycloak Rest Api directly in Api gateway?
  - user dto need to be validated before inserting in Keycloak user attributes
  - user can update own attributes such as name, avatar and search filters
  - need common response dto and some requests need api composition
  - need invitation logic
  - adding/removing user to/from workspace or project need to be propagated to Notification microservice with Saga
  - adding/removing user to/from workspace need to be propagated to Search microservice with Saga
  - as we often need reads from Keycloak (list workspace users & roles,  etc) and
  - since Keycloak uses an external database (PG) we will execute reads (but not mutations) from PG directly to reduce common non-auth operations with Keycloak Rest Api:
    - list workspace users, roles, projects(groups)
    - list project users
    - validating Project user on Project Issue assigning via rpc call from Project microservice (can be avoided if will use User cache in Project microservice itself)

#### Project

> Projects(tags, workflow, sprints) and Issues(+comments, +votes, +subscriptions, +history)

- Why CQRS/ES?
  - the service serves mainly non-atomic read/write operations(issue updates etc) in large quantities
  - audit log of project events (observed by admins) will be very useful for some type of projects
  - Impl
    - Here we use events collection and views on the same db(replicated MongoDB) but through two apps.
    - Commands just update `project_events` collection. Project updates propagated to Notification/Search/Report microservices with Saga.
    - We dont use Events and message broker here since MongoDB has `change stream` on replica set which Query service will listen and project changes by refreshing Projects and Issues materialized views. This way, eventual consistency will be guaranteed on the database side itself.
    - Previously we used EventStoreDB as write db and listened $project-1 stream on Query side to project state on Pg tables
- Modelling
  - We model Issues materialized views outside Project since we mostly query them separately.
  - Issue includes a lot of embedded things itself and Project with embedded Issues can surpass 16mb limit.
- Why dont we separate Issues to another microservice?
  - We dont split Issues to another microservice since we need Project data such a tags, workflows and sprints for Issue update validation
  - Meanwhile project users are part of Workspace domain and we need rpc call to Workspace microservice to validate assignments (mutations/reads are limited to the projects the user has access to)

#### Notification

> notification aggregator(Cassandra, 1 table) and sse/push fanout. Emails are auth related and handled by Keycloak itself. Notifications: user assignments, updates in assigned/watched issues, sprint start/finish (via rabbitmq delayed-message-exchange), @mentions in issues comments.

#### Search

> users/projects/sprints/issues aggregator(Redisearch, structure per workspace) for fts in a workspace

#### Report

> user/project/issue/sprint activity aggregator(Clickhouse) and chart/pdf report generator

#### Api Gateway

> At first it was Nginx, but since we need Rest to Grpc transcoding, it should be either Golang or something OpenResty based like Apache Apisix (with the grpc-transcode module).

- api versioning
- load ballancing, circuit broker
- security: ddos, connection/request limiting, helmet, cors, tls
- http cache?
- monitoring: opentracing, logging, metrics
- access(keycloak sso): for token introspection we use a realm(workspace) name(myworkspace.caplan.com) from http header.
  - valiants
    - nginx: auth_request to oauth2proxy and rbac
    - apache apisix: authz-keycloak module to call with requested permissions
    - *golang: Nerzal/gocloak IntrospectToken=>permissions
- perfomance
  - needs: even though this an app for work and most users are active daily the most often requests (issue status/assignee change) are rare, lets say 1 request per 30 min. This way the throughput for 1kk active users will be approximately 1000000/30*60 ~ 500rps.
  - limits: token introspection itself will limit the rps of gateway to ~5500 rps on 4core keycloak machine (~1400 per 1 core) which is more than we need in most cases
- routing rest ro grpc microservices
  - Keycloak
    - P /auth =>REST(keycloak) {}=>{}
    - G /auth =>REST(keycloak) {realm,clientId}=>{}
  - Workspace

  - Project
    - P /projects =>auth() =>GRPC(Project, {}=>{}) =>Saga[Workspace(project:user(creator)), Search(new entry), Notification]
    - G /projects =>auth() =>GRPC(Project, Rpc(Workspace(available projects)), {}=>{}[])
    - G /projects/:id =>auth() =>GRPC(Project, {}=>{}) 
    - P /projects/:id =>GRPC(Project) {} => {}
    - D /projects/:id =>GRPC(Project) {} => {}
  - Search
    - G /search =>GRPC(search) {}=>{}
  - Report
    - G /reports =>GRPC(report) {}=>{}[]
    - G /reports/:id =>GRPC(report) {}=>{}
  - Notification
    - P /notifications/push =>GRPC(notification) {tokens}=>{}
    - G /notifications =>GRPC(notification) {}=>{}[]
    - G /notifications/sse REST<=>GRPC_stream(notification) {}=>{}  



GetRealmRolesByGroupID ?? RetrospectToken(=>permissions)










P /workspaces {} => {}
G /workspaces {} => {}[]
G /workspaces/:id {} => {}
P /workspaces/:id {} => {}
D /workspaces/:id {} => {}

P /roles {} => {}
G /roles => {}[]
G /roles/:id {} => {}
P /roles/:id {} => {}
D /roles/:id {} => {}

P /users {} => {}
G /users => {}[]
G /users/:id {} => {}
P /users/:id {} => {}
D /users/:id {} => {}



P /projects/:id/sprints =>GRPC(project_write) {} => {}
G /projects/:id/sprints =>GRPC(project_read) {} => {}[]
G /projects/:id/sprints/:id =>GRPC(project_read) {} => {}
P /projects/:id/sprints/:id =>GRPC(project_write) {} => {}
D /projects/:id/sprints/:id =>GRPC(project_write) {} => {}

P /projects/:id/issues =>GRPC(project_write) {} => {}
G /projects/:id/issues =>GRPC(project_read) {} => {}[]
G /projects/:id/issues/:id =>GRPC(project_read) {} => {}
P /projects/:id/issues/:id =>GRPC(project_write) {} => {}
D /projects/:id/issues/:id =>GRPC(project_write) {} => {}
P /projects/:id/issues/:id/comments =>GRPC(project_write) {} => {}
G /projects/:id/issues/:id/comments =>GRPC(project_read) {} => {}[]
G /projects/:id/issues/:id/comments/:id =>GRPC(project_read) {} => {}
P /projects/:id/issues/:id/comments/:id =>GRPC(project_write) {} => {}
D /projects/:id/issues/:id/comments/:id =>GRPC(project_write) {} => {}
P /projects/:id/issues/:id/votes =>GRPC(project_write) {} => {}
G /projects/:id/issues/:id/votes =>GRPC(project_read) {} => {}[]
D /projects/:id/issues/:id/votes =>GRPC(project_write) {} => {}
P /projects/:id/issues/:id/subscriptions =>GRPC(project_write) {} => {}
G /projects/:id/issues/:id/subscriptions =>GRPC(project_read) {} => {}[]
D /projects/:id/issues/:id/subscriptions =>GRPC(project_write) {} => {}
G /projects/:id/issues/:id/history =>GRPC(project_read) {} => {}[]

## Features

- To create a workspace, you only need a unique workspace name, the owner's email address, and a username. The workspace must be activated the first time the owner logs in within 1 day, otherwise it will be deleted.
- The owner, as well as any other user of the workspace with the appropriate policy, can manage roles, users and projects. The default roles are Owner, Administrator, Product Owner (PO), Worker (W), and Scrum Master (SM). The default user is the owner. To add a new user to your workspace, you only need an email address and a username (optional).
- Authentication is implemented using email-based magic links instead of basic authentication (login/password pair). If desired, you can enable 2fa for workspace.
- Projects can be Kanban or Scrum and have their own tags, workflow statuses, issues and sprints.

  - Default statuses: “todo”, “in_progress” and “done”. The workflow can be changed at any time by adding new statuses, such as requirements, design, development, review, unit testing, integration testing, bug fixing, deployment, etc.
  - Issue , among other properties, has some constants: type, priority, other release relations. The type can be "epic", "story", "task" and "bug". The priority can be "trivial", "low", "medium", "high", "critical" and "blocking". Relationships can be "relate", "block", "duplicate" and "cause".
  - There are also issue related comments, voters, followers and update history.
  - Project workflow:

    1. Roadmap. PO creates a roadmap of the project with epic issues. Epic is a big story issue which takes up 1-2 month to implement usually. Epic may have a version tag. Roadmap describes approximate timeframe and links between epics.
    1. Backlog. PO creates a product backlog by breaking epics to story issues. Story is a product feature("as a user/customer/manager i want"). Scrum projects add concept of sprint - a time-boxed work period which have a meeting lifecycle:

       - _planning meeting_ where SM and Workers planning a new sprint and a sprint backlog together. Sprint backlog is a chunk of product backlog stories that have to be executed together. Every story from sprint backlog has to have a difficult point which is estimated by Workers themselves. After the difficult pointing the team can define the sprint duration which is usually 2-3 weeks. At the end the SM starts a sprint.
       - _daily standup meeting_ where Workers discuss a sprint progress.
       - _demo meeting_ where Workers demonstrate a product progress to PO after sprint completing.
       - _retro meeting_ where SM and Workers discuss technical debt with a help of analytics from project reports.

    1. Board. Used to observe the visual progress of product/sprint. The board includes only the stories from product backlog in canban and stories from current sprint in scrum projects. To fulfilm a story users split it to tasks and process them with workflow status model. The main board can be extended with workflow statuses as well as new boards added to project e.g. testing board, designers board etc.

    1. Reports. Used to analyze progress on a project, identify bottlenecks and predict future performance.

## Todo

- mvp
- k8s
- ddd, clean arch
- switch microservices to grpc
- rewrite gateway to either
  - golang to implement http1.1 restapi <-> grpc and use sso without oauth2-proxy
  - open-resty: lua-resty-grpc-gateway, <https://kevalnagda.github.io/configure-nginx-and-keycloak-to-enable-sso-for-proxied-applications>
- separate service for combined open apis: <https://blog.onesaitplatform.com/en/2022/11/23/centralized-swagger-catalog-microservices/>
- multi-tenancy?
- automation?
- billing(+stripe)? - to have more than 5 users the workspace needs to be switched to paid plan

## Run the project

### Setup

1. Fork/Clone this repo

1. Download [Docker](https://docs.docker.com/docker-for-mac/install/) (if necessary)

### Development

1. Fire up the Containers

   ```sh
   make dev
   ```

### Release

1. Build and push images to the hub

   ```sh
   make release
   ```

### Fe

/(auth ? available_workspaces : landing | /auth)
/workspace
/:workspaceId(opens in another tab)
