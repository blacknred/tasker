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
  notifications jsonb DEFAULT '[]',
  -- [{ link, body, created_at }], <1000
  user_id int UNIQUE REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE user_invoice (
  id serial PRIMARY KEY,
  payment payment_enum NOT NULL,
  "comment" text,
  sum numeric(15, 4) NOT NULL,
  is_admin boolean DEFAULT FALSE,
  created_at DATE NOT NULL DEFAULT now(),
  user_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE
  SET NULL
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
  author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE
  SET NULL
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
  task_statuses varchar(50) [] DEFAULT ARRAY ['TODO','DOING','DONE','FINISHED'],
  task_tags varchar(50) [] DEFAULT ARRAY ['MINOR','ROUTINE','MAJOR'],
  created_at DATE NOT NULL DEFAULT now(),
  updated_at DATE NOT NULL,
  deleted_at DATE,
  workspace_id int REFERENCES workspace(id) ON UPDATE CASCADE ON DELETE CASCADE,
  author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE
  SET NULL
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
  author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE
  SET NULL
);
CREATE TABLE project_sprint (
  id serial PRIMARY KEY,
  "name" varchar(100) UNIQUE NOT NULL CHECK (length("name") >= 5),
  begins_at DATE NOT NULL DEFAULT now(),
  ends_at DATE NOT NULL,
  created_at DATE NOT NULL DEFAULT now(),
  epic_id int REFERENCES project_epic(id) ON UPDATE CASCADE ON DELETE CASCADE,
  project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
  author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE
  SET NULL
);
CREATE TABLE project_task (
  id serial,
  title varchar(300) NOT NULL CHECK (length(title) >= 5),
  description text NOT NULL,
  assets text [] DEFAULT ARRAY []::text [],
  status varchar(50) NOT NULL,
  tags varchar(50) [] DEFAULT ARRAY []::varchar(50) [],
  agent_min_rating int,
  "comments" jsonb DEFAULT '[]',
  -- [{ user_id, body, created_at }]
  ends_at DATE,
  created_at DATE NOT NULL DEFAULT now(),
  updates jsonb DEFAULT '[]',
  -- [{ user_id, created_at, field, prev, next }]
  project_id int REFERENCES workspace_project(id) ON UPDATE CASCADE ON DELETE CASCADE,
  sprint_id int REFERENCES project_sprint(id) ON UPDATE CASCADE ON DELETE
  SET NULL,
    author_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE
  SET NULL,
    assignee_id int REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE
  SET NULL,
    task_id int,
    FOREIGN KEY (task_id, created_at) REFERENCES project_task("id", "created_at") ON UPDATE CASCADE ON DELETE
  SET NULL,
    PRIMARY KEY("id", "created_at")
) PARTITION BY RANGE (created_at);
CREATE TABLE project_task_2022 PARTITION OF project_task FOR
VALUES
FROM ('2022.01.01') TO ('2023-01-01');
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


-- AUTH-SERVICE(nodejs tcp crud)
--   auth
--     - post: refresh_and_access_tokens_via_cookie, payload{id}
--     <!-- - getone(401): all_user_data -->
--     - patch(401): new_access_token
--     - delete(401): remove_tokens_from_cookie
--   - tokens
-- - ` NOTIFICATION - SERVICE(nodejs tcp crud, + amqp) `
--   - post(amqp): !'instant' ? email : [db_write, instant_notification_method, push?]
--   - get: db_read