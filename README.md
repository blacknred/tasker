# Taskapp

<img src="apps/gateway/nginx/www/logo.svg" width="75" alt="Taskapp Logo"/>

Sample b2b agile task management app

[![CI](https://github.com/blacknred/be-taskapp/workflows/release/badge.svg)](https://github.com/blacknred/be-taskapp/actions)

## Architecture(monorepo)

| Services           | Container         | Stack                        | Ports       |
| ------------------ | ----------------- | ---------------------------- | ----------- |
| Redis              | redis             | Redis stack                  | 6379        |
| Queue              | rabbitmq          | RabbitMQ                     | 5672/15672  |
| Read DB            | postgres          | Postgres                     | 5432        |
| Write DB           | eventstore        | EventStoreDB                 | 1113/2113   |
| Object storage(s3) | minio             | Minio                        | 9000        |
| -                  | -                 | -                            | -           |
| Api Gateway        | gateway           | Nginx, HTTP1.1/GRPC, Swagger | 80/443/8080 |
| Workspace          | workspace-svc     | NodeJs, HTTP1.1/GRPC, AMQP   | 3001/50051  |
| Issue Command      | issue-command-svc | NodeJs, HTTP1.1/GRPC, AMQP   | 3002/50052  |
| Issue Query        | issue-query-svc   | NodeJs, HTTP1.1/GRPC, AMQP   | 3003/50053  |
| Notification       | notification-svc  | NodeJs, HTTP1.1/GRPC, AMQP   | 3004/50054  |
| Search             | search-svc        | NodeJs, HTTP1.1/GRPC, AMQP   | 3005/50055  |
| Report             | report-svc        | NodeJs, HTTP1.1/GRPC, AMQP   | 3006/50056  |
| IDP                | keycloak          | Keycloak, HTTP1.1            | 8000/8443   |
| Sso Proxy          | sso-proxy         | Oauth2-proxy, HTTP1.1        | 4180        |
| -                  | -                 | -                            | -           |
| Tracing            | jaeger            | Jaeger                       | 9411/16686  |
| Prometheus         | prometheus        | Prometheus                   | 9090        |
| Container metrics  | cadvisor          | Prom cadvisor                | 8081        |
| Unix metrics       | node-exporter     | Prom node exporter           | 9100        |
| Nginx metrics      | nginx-exporter    | Prom nginx exporter          | 9113        |
| Postgres metrics   | postgres-exporter | Prom postgres exporter       | 9187        |
| Redis metrics      | redis-exporter    | Prom redis exporter          | 9121        |
| Logs storage       | loki              | Grafana Loki                 | 3100        |
| Logs aggregator    | fluent-bit        | Fluent Bit                   | 24224       |
| Grafana            | grafana           | Grafana                      | 3033        |
| Alerts             | alertmanager      | Alertmanager                 | 9093        |

### Data

- Redis
- Postgres(db per service)
- EvenStoreDB
- RabbitMQ
- Minio

### Services

#### Workspace

> Workspace concept is based on Keycloak realm. Every workspace(realm) has its own users(realm users), roles(realm roles), projects(realm groups), project_members(realm group users), issue_tags, issue_statusses, sessions and authentication flows.

- The service is a Keycloak Admin REST API adapter that ensures domain compatibility with the system and provides REST API simplicity for web clients. The fact that the service internally calls the Keycloak admin REST API is acceptable since crud operations in the workspace are a relatively rare case.
- When a user creates a new workspace, the service will create a new realm with users(owner, system, sso-proxy), basic roles(owner, admin, product_owner, scrum_master, worker), and SSO clients(system, sso-proxy). In the current version without multi-tenancy, system(administrator) implements operations in all workspaces(realms) since it has access to them as a realm user & client.
- A member can update their attributes such as name, avatar and search filters.
- The service sends notifications associated with the workspace and updates the corresponding search entries.
- Keycloak uses an external database (PG), which means the system has access to workspace data.
- Keycloak has perfomance issue for 300+ realms. Instead, use a Saas provider if you need scalability.

#### Issue

> Issue related operations: issue(+comments, +votes, +subscriptions), sprints, events

- The service is split to command/query applications and implements CQRS/ES with EventStoreDB as a write db and Pg as a read db. There are several reasons for this:
  - the service serves mainly non-atomic read/write operations(issue updates) in large quantities
  - every issue has an change history($issue-1), which can be observed on the issue page
  - every sprint has an change history($sprint-1)
  - every project has a timeline that aggregates($bc-projectId) all the events of the project's issue/sprint and can be observed on the dashboard page
- Each command associated with an issue (CreateComment, CreateVote, etc.) creates an IssueUpdated event, which is stored in the EventStoreDb and is used to project these partial updates to the issue state into the Pg.
- Pg is more like a write optimized database, for a real world scenario as a read database you will definitely need an easily sharded nosql database.
- Mutations/reads are limited to the projects the user has access to.

#### Fanout

> mutations via RabbitMQ, reads from web

- Notification: email/push/sse worker, delayed-message-exchange for sprint events etc (cannot delete message problem)
- Search: search entries aggregator, Pg
- Report: user/project/issue/sprint activity aggregator and report generator, Pg/Prometheus

#### Api Gateway

- Api gateway
  - api versioning
  - load ballancing, circuit broker
  - security: ddos, helmet, cors, ssl
  - proxying HTTP1.1 & GRPC microservices
  - access: auth_request to oauth2proxy and rbac
  - http cache?
- Infrastructure proxy
  - basic_auth guard
  - proxy HTTP1.1: grafana, prometheus-ui, jaeger, rabbitmq management, alertmanager
- Static serve
  - swagger-ui
- Misc
  - metrics(Prometheus)
  - opentracing

### Monitoring

- Jaeger
- Prometheus: service modules, cadvisor, node-exporter, nginx-exporter, postgres-exporter, redis-exporter
- Grafana loki
- Fluent Bit
- Grafana
- Alertmanager

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
- switch microservices to grpc
- rewrite gateway in golang to implement http1.1 restapi <-> grpc and use sso without oauth2-proxy
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
