# Task app

> tasks management within the workspaces with some agile features: projects, backlog, epics, sprints, tasks/subtasks, canban

## Features

`Workspace`

- Workspace: every workspace has own customisable: agent_roles(defaults are OWNER, WORKERBOT), task_statuses(defaults are TODO, DOING, DONE, FINISHED), and task_labels for filtering(defaults are MINOR, ROUTINE, MAJOR).
  - Agent: user that have access tp workspace withing
  - Projects: workspace can have multiple projects, agent have to have access to specific project. Every project has own:
    - Epics: logically task grouping
    - Sprints: time related task grouping
    - Tasks/Subtasks:

`Monetization`

- Workspace
  - limited: 100 tasks per month, 10 agents, only web notifications
  - unlimited(fixed price, 1month): unlimited tasks and agents, email/phone notifications
    - non-payment: back to limitations, no more agents

## App(docker)

### Stack

- Postgres

  ```ddl
  DROP TABLE IF EXISTS user_identity;
  DROP TABLE IF EXISTS user_timeline;
  DROP TABLE IF EXISTS user_invoice;
  DROP TABLE IF EXISTS user;
  DROP TABLE IF EXISTS task_watcher;
  DROP TABLE IF EXISTS task;
  DROP TABLE IF EXISTS workspace_project_user;
  DROP TABLE IF EXISTS workspace_project_epic;
  DROP TABLE IF EXISTS workspace_project_sprint;
  DROP TABLE IF EXISTS workspace_project;
  DROP TABLE IF EXISTS workspace_user;
  DROP TABLE IF EXISTS workspace;

  -- USERS
  CREATE TABLE user (
    id serial PRIMARY KEY,
    'username' varchar(50) NOT NULL CHECK (length(VALUE) >= 5),
    fullname varchar(100) NOT NULL CHECK (length(VALUE) >= 5),
    'image' text,
    bio text,
    created_at date NOT NULL DEFAULT now(),
    updated_at date NOT NULL,
    deleted_at date
  )
  CREATE TABLE user_identity (
    email text UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
    'password' text NOT NULL,
    phone varchar(15),
    is_admin boolean DEFAULT 0,
    notification_method enum('email', 'phone') NOT NULL DEFAULT 'email',
    currency varchar(3) NOT NULL DEFAULT 'USD',
    'locale' varchar(5) NOT NULL DEFAULT 'en_US',
    user_id int REFERENCES user(id) UNIQUE ON UPDATE CASCADE ON DELETE CASCADE
  )
  CREATE TABLE user_timeline (
    notifications jsonb  -- [{ link, body, created_at }], <1000
    user_id int REFERENCES user(id) UNIQUE ON UPDATE CASCADE ON DELETE CASCADE
  )
  CREATE TABLE user_invoice (
    id serial PRIMARY KEY,
    payment enum('UNLIMITED_PROFILE', 'OFFER_PROMOTION') NOT NULL,
    comment text,
    sum numeric(15,4) NOT NULL,
    is_admin boolean DEFAULT 0,
    created_at date NOT NULL DEFAULT now(),
    user_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
  )

  -- WORKSPACE
  CREATE TABLE workspace (
    id serial PRIMARY KEY,
    'name' varchar(100) UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
    'description' text,
    'image' text,
    is_unlimited boolean DEFAULT 0,
    task_statuses varchar(50)[] DEFAULT ['TODO','DOING','DONE','FINISHED'],
    task_labels varchar(50)[] DEFAULT ['MINOR','ROUTINE','MAJOR'],
    agent_roles jsonb DEFAULT '[{"name":"owner","policies":[]},{"name":"workerbot","policies":[]}]'
    created_at date NOT NULL DEFAULT now(),
    updated_at date NOT NULL,
    deleted_at date,
    author_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL,
  )
  CREATE TABLE workspace_user (
    'role' varchar(50) NOT NULL
    rating smallint NOT NULL DEFAULT 0,
    created_at date NOT NULL DEFAULT now(),
    workspace_id int REFERENCES workspace(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (workspace_id, user_id)
  )
  CREATE TABLE workspace_project (
    id serial PRIMARY KEY,
    'name' varchar(100) UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
    'description' text,
    created_at date NOT NULL DEFAULT now(),
    updated_at date NOT NULL,
    deleted_at date,
    workspace_id int REFERENCES workspace(id) ON UPDATE CASCADE ON DELETE CASCADE,
    author_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
  )
  CREATE TABLE workspace_project_user (
    project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (project_id, user_id)
  )
  CREATE TABLE workspace_project_epic (
    id serial PRIMARY KEY,
    'name' varchar(100) UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
    'description' text,
    created_at date NOT NULL DEFAULT now(),
    project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
    author_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
  )
  CREATE TABLE workspace_project_sprint (
    id serial PRIMARY KEY,
    'name' varchar(100) UNIQUE NOT NULL CHECK (length(VALUE) >= 5),
    begins_at date NOT NULL DEFAULT now(),
    ends_at date NOT NULL,
    created_at date NOT NULL DEFAULT now(),
    project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
    author_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
  )
  CREATE TABLE task (
    id serial PRIMARY KEY,
    title varchar(300) NOT NULL CHECK (length(VALUE) >= 5),
    'description' text NOT NULL,
    assets text[] DEFAULT [],
    'status' varchar(50) NOT NULL,
    labels varchar(50)[] DEFAULT [],
    agent_min_rating int,
    comments jsonb DEFAULT '[]', -- [{ user_id, body, created_at }]
    ends_at date,
    created_at date NOT NULL DEFAULT now(),
    updates jsonb DEFAULT '[]', -- [{ user_id, created_at, field, prev, next }]
    project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
    epic_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE SET NULL,
    sprint_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE SET NULL,
    task_id int REFERENCES task(id) ON UPDATE CASCADE ON DELETE SET NULL,
    author_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL,
    assignee_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
  )
  CREATE TABLE task_watcher (
    task_id int REFERENCES task(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id int REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (task_id, user_id)
  )

  -- INDICES
  CREATE UNIQUE INDEX user_identity_user_id_idx ON user_identity(user_id);
  CREATE UNIQUE INDEX user_timeline_user_id_idx ON user_timeline(user_id);
  CREATE UNIQUE INDEX user_invoice_user_id_idx ON user_invoice(user_id);
  CREATE INDEX workspace_project_workspace_id_idx ON workspace_project(workspace_id);
  CREATE INDEX workspace_project_epic_project_id_idx ON workspace_project_epic(project_id);
  CREATE INDEX workspace_project_sprint_project_id_idx ON workspace_project_sprint(project_id);
  CREATE INDEX task_assignee_id_idx ON task(assignee_id);
  CREATE INDEX task_epic_id_idx ON task(epic_id);
  CREATE INDEX task_sprint_id_idx ON task(sprint_id);
  CREATE INDEX task_project_id_idx ON task(project_id);
  CREATE INDEX task_created_at_idx ON task(created_at);
  ```

- Redis
  - temp(ttl): tasks:workspace_id, confirm tokens
  - data: push_keys:user_id, last_notified:user_id
- RabbitMQ:
  - worker queue: workerbot
  - worker queue(batch): notifications
  - delayed-exchange(instead of cron)
    - delayed_exchange_user_deletion(1mon)
    - delayed_exchange_workspace_deletion(1mon)
    - delayed_exchange_project_deletion(1mon)
    - delayed_exchange_user_invoice(1mon)
- Nginx
  - proxy, http cache, load ballancer, static serving
  - security(ssl, rate limiting, cors, helmet headers)
- Nodejs
  - NestJs
    - passport(jwt), mikroorm, amqplib, ioredis
    - swagger, compodoc, metrics(prom-client, termius)
    - jest, supertest
  - ReactJs
    - NextJs(next-auth, next-pwa, next-seo)
    - tailwind, react-intl, swr, redux-toolkit, react-hook-form+zod
    - jest, testing-library, cypress

### BE

- `GATEWAY(nginx, rest)`
  - monitoring(prometheus plugin)
  - security(ssl, rate-limiting, cors, helmet)
  - http cache
  - logging
  - static: fe, swagger
  - authentication, ACL?
  - proxying microservices
- `MICROSERVICES`
  - `USER-SERVICE(nodejs tcp/amqp, crud)`
  - `WORKSPACE-SERVICE(nodejs tcp/amqp, crud)`
  - `AUTH-SERVICE(nodejs tcp, crud)`
  - `BILLING-SERVICE(nodejs tcp/amqp, crud)`
  - `NOTIFICATION-SERVICE(nodejs amqp)`
  - `WORKERBOT_SERVICE(nodejs amqp)`

### FE

- `LANDING(ssg)`
- `APP(spa)`

## TODO

- switch api gateway from nodejs/nest to nginx
- split web client to Next(landing, auth) ssg and React SPA. No Auth ? Nginx returns app.com : Nginx redirects to ${workspace}.app.com
- full text search for task.title field with tsvector
- stripe + billing setup
- web admin client: /users stats, /workspaces stats, /billing
