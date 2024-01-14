# Leads API

This API connects into MySQL LeadDB to manage data from leads.

/Leads/tablet/{{location_id}}
/Leads/tablet/338

Main Routes

- `GET /leads` Get leads using with email or phone
- `PUT /leads/{id}` Update lead info
- `POST /leads` Create new lead
- `POST /leads/{id}/notes` Create new note inside lead

## Start Project

Is necessary to have connection with Lead DB, configuring `.env` file

```dotenv
DB_LEADS=mysql://root:root@localhost:3306/tlemain_db
```

Then run the following commands

```bash
# Typescript transpiling
yarn dev
# Unit testing verbose
yarn test:unit-verb 
```

> DEV SEQUENCE

1) usecase test
2) Usecase
3) filter model repo usecase interface
4) repository

# API Docs - Swagger

TBD

# Docker

TBD

# Prisma

From schema.prisma folder
prisma db pull
