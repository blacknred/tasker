# Task app

> tasks management within the workspaces with some agile features: projects, backlog, epics, sprints, tasks/subtasks, canban

## Features

`Workspace`

- Groups users and projects by domain: organization, team etc
- Defines default member roles (OWNER, WORKERBOT) that can be extended
- Has some limitations by default but can be unlimited with payment
- Policies:
  - create: any user
  - read: workspace_member
  - update: project_member+author/EDIT_ANY_PROJECT
  - delete(soft): project_member+author/DELETE_ANY_PROJECT
- Inclides:

  - **Members**
    - Users who have access to the workspace within the defined role
    - Policies
      - create: workspace_member+CREATE_PROJECT
      - read: project_member
      - update: project_member+author/EDIT_ANY_PROJECT
      - delete(soft): project_member+author/DELETE_ANY_PROJECT
  - **Projects**:

    - Group users and tasks
    - Define default task statuses (TODO, DOING, DONE, FINISHED) and task tags (MINOR, ROUTINE, MAJOR). Both can be extended
    - Policies
      - create: workspace_member+CREATE_PROJECT
      - read: project_member
      - update: project_member+author/EDIT_ANY_PROJECT
      - delete(soft): project_member+author/DELETE_ANY_PROJECT
    - Include
      - **Members**: Users who have access to the project
        - Policies
          - read: project_member
          - create: project_member+MEMBER_MANAGEMENT
          - update: project_member+author/EDIT_ANY_PROJECT
          - delete: project_member+author/DELETE_ANY_PROJECT
        - Can be created/updated/deleted with _MEMBER_MANAGEMENT_ role,
      - **Tasks**: Unit of work
        - Required: a title, a description, assets, a work status and current assignee
        - Optional: end date, assets, sprint relation, comments and tags for custom grouping
        - The task starts with the TODO status and ends with the FINISHED status, alternating intermediate statuses and assignees
        - Every status or assignee update, and other updates are tracked for task history
        - There is a workerbot which can be used for mock task execution
        - Any member of the project can follow the task changes
        - Policies
          - create: project_member+CREATE_TASK
          - read: project_member+assigned/READ_ANY_TASK
          - update
            - [assignee, status, tags, comments]: project_member
            - rest: project_member+author/UPDATE_ANY_TASK
          - delete: project_member+author/DELETE_ANY_TASK
      - **Sprints**: Group tasks by time context
        - Policies:
          - read: project_member
          - create: project_member+SPRINT_MANAGEMENT
          - update: project_member+SPRINT_MANAGEMENT
          - delete: project_member+SPRINT_MANAGEMENT
      - **Epics**: Group sprints by execution context
        - Policies:
          - read: project_member
          - create: project_member+EPIC_MANAGEMENT
          - update: project_member+EPIC_MANAGEMENT
          - delete: project_member+EPIC_MANAGEMENT

Tasks in "Done" status autodeleted with sprint finishing or after 2 weeks. 

Tickets are pooled under Projects, allowing for multiple service contracts to be handled by the one system, and agents can then track and resolve tickets either manually or automatically allocated to them.


Analytics
Reports in Jira help teams analyze progress on a project, track issues, manage their time, and predict future performance. They offer critical, real-time insights for Scrum, Kanban, and other agile methodologies, so that data-driven decisions can be made (the very best kind).
Jira reports help you stay on track of sprint goals, drill down into issues, manage workloads, identify bottlenecks, and ultimately work smarter.


`Monetization`

- Workspace
  - limited: 100 tasks per month, 10 agents, only web notifications
  - unlimited(fixed price, 1month): unlimited tasks and agents, email/phone notifications
    - non-payment: back to limitations, no more agents
    - invoices charges workspace owner

    Break the big ideas down into manageable chunks across teams with user stories, issues, and tasks.

## App(docker)

### Stack

- Postgres

  ```ddl
  DROP TABLE IF EXISTS task_watcher;
  DROP TABLE IF EXISTS project_task;
  DROP TABLE IF EXISTS project_user;
  DROP TABLE IF EXISTS project_sprint;
  DROP TABLE IF EXISTS project_epic;
  DROP TABLE IF EXISTS workspace_project;
  DROP TABLE IF EXISTS workspace_user;
  DROP TABLE IF EXISTS workspace;
  DROP TABLE IF EXISTS user_identity;
  DROP TABLE IF EXISTS user_timeline;
  DROP TABLE IF EXISTS user_invoice;
  DROP TABLE IF EXISTS "user";

  -- CUSTOM TYPES
  DROP TYPE IF EXISTS notification_method_enum;
  DROP TYPE IF EXISTS payment_enum;
  CREATE TYPE notification_method_enum AS ENUM('EMAIL', 'PHONE');
  CREATE TYPE payment_enum AS ENUM('UNLIMITED_WORKSPACE');

  -- USERS TABLES
  CREATE TABLE "user" (
    id serial PRIMARY KEY,
    username varchar(50) NOT NULL CHECK(length(username) >= 5),
    fullname varchar(100) NOT NULL CHECK(length(fullname) >= 5),
    image text,
    bio text,
    created_at DATE NOT NULL DEFAULT now(),
    updated_at DATE NOT NULL,
    deleted_at DATE
  );
  CREATE TABLE user_identity (
    email text UNIQUE NOT NULL CHECK (length(email) >= 5),
    "password" text NOT NULL,
    phone varchar(15),
    is_admin boolean DEFAULT false,
    is_confirmed boolean DEFAULT false,
    instant_notification_method notification_method_enum,
    currency char(3) NOT NULL DEFAULT 'USD',
    locale char(5) NOT NULL DEFAULT 'en_US',
    user_id int UNIQUE REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE
  );
  CREATE TABLE user_timeline (
    notifications jsonb DEFAULT '[]',  -- [{ link, body, created_at }], <1000
    user_id int UNIQUE REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE
  );
  CREATE TABLE user_invoice (
    id serial PRIMARY KEY,
    payment payment_enum NOT NULL,
    "comment" text,
    sum numeric(15,4) NOT NULL,
    is_admin boolean DEFAULT FALSE,
    created_at DATE NOT NULL DEFAULT now(),
    user_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL
  );

  -- WORKSPACE TABLES
  CREATE TABLE workspace (
    id serial PRIMARY KEY,
    "name" varchar(100) UNIQUE NOT NULL CHECK (length("name") >= 5),
    description text,
    is_unlimited boolean DEFAULT false,
    user_roles jsonb DEFAULT '[{"name":"owner","policies":[]},{"name":"workerbot","policies":[]}]',
    created_at DATE NOT NULL DEFAULT now(),
    updated_at DATE NOT NULL,
    deleted_at DATE,
    author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL
  );
  CREATE TABLE workspace_user (
    "role" varchar(50) NOT NULL,
    rating smallint NOT NULL DEFAULT 0,
    created_at DATE NOT NULL DEFAULT now(),
    workspace_id int REFERENCES workspace(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (workspace_id, user_id)
  );
  CREATE TABLE workspace_project (
    id serial PRIMARY KEY,
    "name" varchar(100) UNIQUE NOT NULL CHECK (length("name") >= 5),
    description text,
    image text,
    task_statuses varchar(50)[] DEFAULT ARRAY['TODO','DOING','DONE','FINISHED'],
    task_tags varchar(50)[] DEFAULT ARRAY['MINOR','ROUTINE','MAJOR'],
    created_at DATE NOT NULL DEFAULT now(),
    updated_at DATE NOT NULL,
    deleted_at DATE,
    workspace_id int REFERENCES workspace(id) ON UPDATE CASCADE ON DELETE CASCADE,
    author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL
  );
  CREATE TABLE project_user (
    project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (project_id, user_id)
  );
  CREATE TABLE project_epic (
    id serial PRIMARY KEY,
    "name" varchar(100) UNIQUE NOT NULL CHECK (length("name") >= 5),
    finished_at DATE,
    created_at DATE NOT NULL DEFAULT now(),
    project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
    author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL
  );
  CREATE TABLE project_sprint (
    id serial PRIMARY KEY,
    "name" varchar(100) UNIQUE NOT NULL CHECK (length("name") >= 5),
    begins_at DATE NOT NULL DEFAULT now(),
    ends_at DATE NOT NULL,
    created_at DATE NOT NULL DEFAULT now(),
    epic_id int REFERENCES project_epic(id) ON UPDATE CASCADE ON DELETE CASCADE,
    project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
    author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL
  );
  CREATE TABLE project_task (
    id serial,
    title varchar(300) NOT NULL CHECK (length(title) >= 5),
    description text NOT NULL,
    assets text[] DEFAULT ARRAY[]::text[],
    status varchar(50) NOT NULL,
    tags varchar(50)[] DEFAULT ARRAY[]::varchar(50)[],
    agent_min_rating int,
    "comments" jsonb DEFAULT '[]', -- [{ user_id, body, created_at }]
    ends_at DATE,
    created_at DATE NOT NULL DEFAULT now(),
    updates jsonb DEFAULT '[]', -- [{ user_id, created_at, field, prev, next }]
    project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
    sprint_id int REFERENCES project_sprint(id) ON UPDATE CASCADE ON DELETE SET NULL,
    author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL,
    assignee_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL,
    task_id int,
    FOREIGN KEY (task_id, created_at) REFERENCES project_task("id", "created_at") ON UPDATE CASCADE ON DELETE SET NULL,
    PRIMARY KEY("id", "created_at")
  ) PARTITION BY RANGE (created_at);
  CREATE TABLE project_task_2022 PARTITION OF project_task FOR VALUES FROM ('2022.01.01') TO ('2023-01-01');
  CREATE TABLE task_watcher (
    created_at DATE NOT NULL DEFAULT now(),
    task_id int,
    user_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (task_id, created_at) REFERENCES project_task("id", "created_at") ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY ("task_id", "user_id")
  );

  -- INDICES
  CREATE UNIQUE INDEX user_identity_user_id_idx ON user_identity(user_id);
  CREATE UNIQUE INDEX user_timeline_user_id_idx ON user_timeline(user_id);
  CREATE UNIQUE INDEX user_invoice_user_id_idx ON user_invoice(user_id);
  CREATE INDEX workspace_project_workspace_id_idx ON workspace_project(workspace_id);
  CREATE INDEX project_epic_project_id_idx ON project_epic(project_id);
  CREATE INDEX project_sprint_project_id_idx ON project_sprint(project_id);
  CREATE INDEX project_task_assignee_id_idx ON project_task(assignee_id);
  CREATE INDEX project_task_sprint_id_idx ON project_task(sprint_id);
  CREATE INDEX project_task_project_id_idx ON project_task(project_id);
  CREATE INDEX project_task_created_at_idx ON project_task(created_at);
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
  - `USER-SERVICE(nodejs tcp crud, +amqp)`
    - post
    - get(401)
    - getone(401)
    - patch(401,403[self])
    - delete(401,403[self]): soft_delete(delayed_exchange_user_delete)
  - `AUTH-SERVICE(nodejs tcp crud)`
    - auth
      - post: refresh_and_access_tokens_via_cookie, payload{id}
      <!-- - getone(401): all_user_data -->
      - patch(401): new_access_token
      - delete(401): remove_tokens_from_cookie
    - tokens
  - `NOTIFICATION-SERVICE(nodejs tcp crud, +amqp)`
    - post(amqp): !'instant' ? email : [db_write, instant_notification_method, push?]
    - get: db_read
  - `BILLING-SERVICE(nodejs tcp crud, +amqp)`
    - post(401): !payment_success ? 403 :
    - delete(401): db_patch(unlimited_workspace)
  - `WORKSPACE-SERVICE(nodejs tcp crud, +amqp)`
    - /workspaces
      - post
      - get
      - getone
      - patch
      - delete
    - /projects(workspace_access)
      - post
      - get
      - getone
      - patch
      - delete
    - /epics(project_access)
      - post
      - get
      - getone
      - patch
      - delete
    - /sprints(project_access)
      - post
      - get
      - getone
      - patch
      - delete
    - /tasks(project_access)
      - post
      - get
      - getone
      - patch
      - delete
    - /workspace-members
      - post
      - get
      - patch
      - delete
    - /project-members
      - post
      - get
      - delete
    - /task-watchers
      - post(401,403[project,self])
      - get(401,403[project,self])
      - delete(401,403[self])
  - `WORKERBOT-SERVICE(nodejs amqp, +tcp)`
    - post: on_done_patch_workspace-service.project_task

### FE

- `LANDING(ssg)`
- `APP(spa)`

  - Workspace_name-projects-people(A)-settings(A)--------create-notifications-profile
  - Project_name-----------page_title-----------------search-filter-board_list_canban
  - Board(active_sprint?)
  - Roadmap(epics+sprints)
  - Backlog(all_task_list)
  - People(A)
  - Settings(A)

  - / [projects list]
  - /:project_id
  - /:project_id/epics
  - /:project_id/:epic_id

  billing

## TODO

- switch api gateway from nodejs/nest to nginx
- split web client to Next(landing, auth) ssg and React SPA. No Auth ? Nginx returns app.com : Nginx redirects to ${workspace}.app.com
- full text search for task.title field with tsvector
- stripe + billing setup
- web admin client?: /users stats, /workspaces stats, /billing

- jql?
- task automation?
- dashboards


- teams?