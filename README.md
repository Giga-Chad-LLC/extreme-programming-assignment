# Extreme Programming Assignment

Google Doc с артифактами [здесь](https://docs.google.com/document/d/1-J4p9cNFFJu1YI8H9T9lPxSzkSzGLL0J5ii4fPLM0eg/edit?usp=sharing).

# Описание проекта

## Требования:
1. Web-приложение по редактированию списков задач
2. У пользователей есть аккаунты, редактирование списков невозможно без регистрации
2. Каждый список имеет наименование и очередность в порядке добавления в общем наборе списков пользователя
3. В списках хранятся карточки в порядке добавления
4. Каждую карточку можно редактировать. Она содержит поля:
    - Название
    - Описание
    - Статус
5. У каждого пользователя может быть не более 3 активный авторизированных устройств (авторизированных сессий).   

## Сценарии:
1. Пользователь сделал регистрацию -> попал в личный кабинет.
3. Пользователь сделал вход в свой аккаунт -> попал в личный кабинет.
5. Пользователь создает новый список -> на UI отображается новый созданный список.
6. Пользователь создает новый элемент списка -> на UI отображается новый элемент списка.

## Endpoints:
1. Auth:
	1. Registration (`auth/register`): creates a new user and access/refresh tokens.
	2. Authorization (`auth/login`): checks the validity of tokens.
	3. Refresh tokens (`auth/refresh`): updates access and refresh tokens.

2. User (protected):
	1. Get user data (email, username) by ID

3. List (protected):
	1. Get all lists and tasks in them by user ID
	2. Create a new list for a user
	3. Update list's data for a user
	4. Delete a list for a user

4. Task:
	1. Create/update/delete a task in a list by user and list id

## План работ

Версия 1 (1.5h):
* [x] Endpoint'ы для регистрации, авторизации, и  обновления токенов (Владислав).
* [x] Endpoint'ы для CRUD'а списков (Дмитрий).

Версия 2 (final):
* [x] Тесты для написанных endpoint'ов регистрации, авторизации (Владислав).
* [x] Тесты для написанных endpoint'ов списков (Дмитрий).
* [x] Endpoint'ы для получения задач в списках (Дмитрий).

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
