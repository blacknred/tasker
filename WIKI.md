# Task app

## TODO

- switch api gateway from nodejs/nest to nginx: routing, authentication, swagger, monitoring(prometheus plugin), security(rate-limiting, cors, helmet), http cache, logging, ACL?
- switch web client to Next(ssg, landing, auth) + React SPA. No Auth ? Nginx returns app.com : Nginx redirects to ${workspace}.app.com
- remove mongo, use postgres only
