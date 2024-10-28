# Fullstack Project Template

## Development

Follow the steps below:

1. You should have `bun` installed. See the official manual [here](https://bun.sh/).

1. Install project dependencies:
```bash
# server deps
bun install
# client deps
cd ./client && bun install
```

1. Create a `.env` file in the root directory with the following content:
```bash
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/db-name?schema=public"
# e.g., "postgresql://root:123@127.0.0.1:5432/my-project-template?schema=public"
```

1. Run the docker and execute the following command (it creates two containers: one for the `postgres` database and another for the `adminer`):
```bash
cd ./docker
docker-compose up
```

1. Apply existing Prisma migrations:
```bash
# applies migrations from prisma/migrations to the postgres database
bun run prisma:deploy
# generates Prisma client based on the schema.prisma file
bun run prisma:generate
```

### Other commands

1. To run the server:
```bash
bun run dev
```

1. To run tests:
```bash
bun run test
```

1. To build the server:
```bash
bun run build
```

## Workflow with Prisma

1. To apply all existing Prisma migrations (see [prisma/migrations](./prisma/migrations)):
```bash
bun run prisma:deploy
``` 

1. To generate Prisma client (it creates TS types for Prisma schema based on [schema.prisma](./prisma/schema.prisma)):
```bash
bun run prisma:generate
```

1. How to create a new migration (you need it when you modify the [schema.prisma](./prisma/schema.prisma) file):
```bash
bun prisma migrate dev --name 'my commit message'
# Do not forget to apply the migration and generate the client after that:
bun run prisma:deploy
bun run prisma:generate
```

This project was created using `bun init` in bun v1.1.25. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
