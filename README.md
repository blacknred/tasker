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
| IDP                | keycloak          | Keycloak, HTTP1.1            | 8000/8443   |
| Sso Proxy          | sso-proxy         | Oauth2-proxy, HTTP1.1        | 4180        |
| Workspace          | workspace-svc     | NodeJs, HTTP1.1/GRPC, AMQP   | 3001/50051  |
| Issue Command      | issue-command-svc | NodeJs, HTTP1.1/GRPC, AMQP   | 3002/50052  |
| Issue Query        | issue-query-svc   | NodeJs, HTTP1.1/GRPC, AMQP   | 3003/50053  |
| Notification       | notification-svc  | NodeJs, HTTP1.1/GRPC, AMQP   | 3004/50054  |
| Search             | search-svc        | NodeJs, HTTP1.1/GRPC, AMQP   | 3005/50055  |
| Report             | report-svc        | NodeJs, HTTP1.1/GRPC, AMQP   | 3006/50056  |
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
- Postgres: database per service, for a real world scenario you definitely need an easily sharded nosql db for read DB
- EvenStoreDB
- RabbitMQ
- Minio

### Services

#### Workspace

> Workspace concept is based on Keycloak realm. Every workspace(realm) has its own members(realm users), roles(realm roles), projects(realm groups), project_members(realm group users) issue_tags, issue_statusses, invitations, sessions and authentication flows.

- The service is a Keycloak Admin REST API adapter that ensures domain compatibility with the system and provides REST API simplicity for web clients. The fact that the service internally calls the Keycloak admin REST API is acceptable since crud operations in the workspace are a relatively rare case.
- When a user creates a new workspace, the service will create a new realm with users(owner, system, sso-proxy), basic roles(product_owner, scrum_master, owner), and SSO client(system, sso-proxy). In the current version without multi-tenancy, system(administrator) implements operations in all workspaces(realms) since it has access to them as a realm user & client.
- A member can update their attributes such as avatar and search filters.
- The service sends notifications associated with the workspace and updates the corresponding search entries.
- Keycloak uses an external database (PG), which means the system has access to workspace data.
- Keycloak has perfomance issue for 300+ realms. Instead, use a Saas provider if you need scalability.

#### Issue

> Issue related operations: issue(+comments, +votes, +subscriptions), sprints, events

- The service is split to command/query applications and implements CQRS/ES with EventStoreDB/PG. There are several reasons for this:
  - the service serves mainly non-atomic read/write operations(issue updates) in large quantities
  - every issue has an update history(issue-1), which can be observed on the issue page
  - every project has a timeline that aggregates($bc-projectId) all the events of the project/sprint and can be observed on the dashboard page

#### Fanout

> mutations via RabbitMQ, reads from web

- Notification: email/push/sse worker, delayed-message-exchange for sprint events etc (cannot delete message problem)
- Search: search entries aggregator, Pg/Redis-search
- Report: user/project/issue/sprint activity aggregator and report generator, Pg/Redis-timeseries

#### Api Gateway

- Api gateway
  - api versioning
  - load ballancing, circuit broker
  - security: ddos, helmet, cors, ssl
  - proxying HTTP1.1 & GRPC microservices
  - auth_request guard with upstream header credential mapping: keycloak sso via oauth2proxy since nginx doesnt have keycloak client
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
- Prometheus: prometheus, cadvisor, node-exporter, nginx-exporter, postgres-exporter, redis-exporter
- Grafana loki
- Fluent Bit
- Grafana
- Alertmanager

## Features

- **Project**

  - Can be created by anyone in any number.
  - Can be a canban or scrum.
  - Has user roles with privileges. Default roles are Product Owner(PO), Worker(W) and Scrum Master(SM). The last is only for scrum projects. Alike others a PO can be the only one and project author has a PO role by default. A PO also is the only role that has the _project_deletion_ privilege. Default roles cannot be changed but can be extended e.g. admin or specified worker like qa, dev etc.
  - Users can be added to project with an email address directly or via invitation link. To have more than 5 users the project needs to be switched to paid plan. Invoices monthly charge the PO.
  - Has a three issue types: epic, story, task.
  - Has a workflow with an issue status model. Defaults statuses are todo, in_progress and done. A workflow can be changed anytime with new statuses e.g. requirements, design, development, review, unit testing, integration testing, bug fixes, deployment etc.
  - Has an issue priorities set. Default priorities are low, medium and high. Issue priorities can changed anytime: routine, urgent etc.
  - Has an issue tags set which is empty by default. Issue tags can be used for example for tagging task issue type: bug, idea etc.
  - Has a boards set. Default board is the "main" board with only one col with product/sprint backlog. The main board can be extended with workflow statuses as well as new boards added to project e.g. testing board, designers board etc.

- **Work**

  1. A PO(or role with _project-management_ privilege) adds a users to project.
  1. Roadmap. PO(or role with _roadmap-access & epic-management_ privileges) creates a roadmap of the project with epic issues. Epic is a big story issue which takes up 1-2 month to implement usually. Epic may have a version tag. Roadmap describes approximate timeframe and links between epics.
  1. Backlog. PO(or role with _backlog-access & story-management_ privileges) creates a product backlog by breaking epics to story issues. Story is a product feature("as a user/customer/manager i want"). Scrum projects add concept of spring - a time-boxed work period which have a meeting lifecycle:
     - _planning meeting_ where SM(or role with _sprint-access_ privilege) and Workers planning a new sprint and a sprint backlog together. Sprint backlog is a chunk of product backlog stories that have to be executed together. Every story from sprint backlog has to have a difficult point which is estimated by Workers themselves. After the difficult pointing the team can define the sprint duration which is usually 2-3 weeks. At the end the SM starts a sprint.
     - _daily standup meeting_ where Workers discuss a sprint progress.
     - _demo meeting_ where Workers demonstrate a product progress to PO after sprint completing.
     - _retro meeting_ where SM(or role with _sprint-access_ privilege) and Workers discuss technical debt with a help of analytics from project reports.
  1. Boards. Used to observe the visual progress of product/sprint. The main board includes only the stories from product backlog in canban and stories from current spring in scrum projects. To fulfilm a story Workers(or role with _task-management_ privilege) split it to tasks and process them with workflow status model.

  - Anyone can comment task, change task status or assignee
  - , star an issue or
  - track/watch the task changes.
  - Every status update is tracked in task history.
  - Tasks can have one of relation: relate, block, duplicate, cause.

  1. Reports. Used to analyze progress on a project, identify bottlenecks and predict future performance.

## Todo

- k8s
- grpc
- billing(+stripe)
- multi-tenancy?: workspace-svc, issue-*-svc and related storages
- automation?
- shared boards?
- billing? - invoice for workspaces with 5+ members

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
