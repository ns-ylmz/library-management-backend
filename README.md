# Library Management Backend

A RESTful API for managing users, books, and borrowing operations.
Built with Node.js, Express, TypeScript, and Prisma (PostgreSQL).

---

## Features

* Create and list users
* Create and list books
* Borrow and return books
* Track past and present borrows per user
* Calculate average book scores
* Request validation with Zod
* Centralized error handling
* Prisma ORM with PostgreSQL

---

## Tech Stack

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Zod (validation)

---

## Database

The application uses PostgreSQL as the relational database.

Database schema is managed using Prisma ORM. All schema definitions and migrations are located under the `prisma/` directory.

Prisma generates SQL migration files automatically. These files serve as the DDL (Data Definition Language) scripts required to create and manage the database schema.

To apply migrations:

```bash
npx prisma migrate dev
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

---

### 2. Setup environment variables

Create a `.env` file (you can copy from `.env.example`):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/library_db?schema=public"
```

---

### 3. Run database (PostgreSQL)

Make sure PostgreSQL is running locally or via Docker.

---

### 4. Run migrations

```bash
npx prisma migrate dev
```

In production (Docker):

```bash
npx prisma migrate deploy
```

---

### 5. Seed database

```bash
npx prisma db seed
```

---

### 6. Start the server

```bash
npm run dev
```

Server runs on: http://localhost:3000 (default)

---

### 7. Run with Docker

```bash
docker compose up --build
```

The API will be available at http://localhost:3000

To populate the Docker database with sample data:

```bash
npm run docker:seed
```
(Equivalent to: `docker compose exec app npm run db:seed`)

---

## API Overview

### Users

* `GET /users` → list users
* `POST /users` → create user
* `GET /users/:id` → user details with borrow history

### Books

* `GET /books` → list books
* `POST /books` → create book
* `GET /books/:id` → book details with average score

### Borrowing

* `POST /users/:userId/borrow/:bookId` → borrow book
* `POST /users/:userId/return/:bookId` → return book

---

## Validation & Errors

* Request validation handled via Zod
* Invalid input → `400 Bad Request`
* Not found → `404 Not Found`
* Conflict → `409 Conflict`

---

## Notes

* `POST` endpoints return empty bodies (`201` or `204`)
* Book score:

  * average score as string (e.g. `"5.33"`)
  * `-1` if no ratings exist

---

## Development Notes

* Layered architecture: controller → service → repository
* Prisma used as data access layer
* Validation is handled before controllers via middleware

---

## Future Improvements

* Automated tests
* CI/CD pipeline

---

## Postman Collection

A Postman collection is included under `docs/postman/`

Import it into Postman to test all endpoints with predefined requests and expected responses.

---
