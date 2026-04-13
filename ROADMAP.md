# Library Management REST API – Development Roadmap

## 1. Project Overview

The **Library Management REST API** is a focused backend system for managing core library operations: user management, book catalog, and borrowing workflows. The system is designed for simplicity, correctness, and strict API contract compliance.

**Core Purpose:** Deliver a lean REST API that handles user and book management with borrowing mechanics, enforcing essential business rules without unnecessary features.

**Technology Stack:** Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL

**Design Philosophy:** API-first development constrained by a predefined Postman collection. No feature scope creep.

---

## 2. Completed Phase (Phase 0 – Setup & Foundation)

- [x] TypeScript configuration and path aliases
- [x] Express.js application bootstrap
- [x] Project folder structure (controllers, services, repositories, middlewares, routes, validators)
- [x] ESLint configuration (flat config)
- [x] Prettier configuration for code formatting
- [x] Basic HTTP server running on configured port
- [x] Initial Git repository and commit

---

## 3. Upcoming Phases

### Phase 1 – Database & Schema Setup
**Objective:** Establish database layer and define minimal data model

- [ ] Install and configure Prisma
- [ ] Set up PostgreSQL database connection
- [ ] Define schema models:
  - `User` (id, name)
  - `Book` (id, name)
  - `Borrow` (id, userId, bookId, borrowedAt, returnedAt, score)
- [ ] Configure foreign key relationships (User → Borrow, Book → Borrow)
- [ ] Create and run initial migration
- [ ] Implement database seed script with sample users, books, and borrow records
- [ ] Verify database connectivity and schema

**Deliverables:**
- `.env` file with DATABASE_URL
- `prisma/schema.prisma` with User, Book, Borrow models
- Initial migration files
- Seed data in `prisma/seed.ts`

**Key Constraints:**
- User model: `name` field only (no email, phone)
- Book model: `name` field only (no author, ISBN)
- Borrow model: track `borrowedAt`, `returnedAt`, `score`

---

### Phase 2 – Core Endpoints (API Contract)
**Objective:** Implement the 8 required endpoints matching Postman collection exactly

#### User Endpoints
- [ ] `GET /users` – List all users
  - Response: Array of users with id and name
- [ ] `GET /users/:id` – Get user details
  - Response: `{ id, name, books: { past: [...], present: [...] } }`
- [ ] `POST /users` – Create user
  - Request body: `{ "name": string }`
  - Response: 201 Created (empty body)

#### Book Endpoints
- [ ] `GET /books` – List all books
  - Response: Array of books with id and name
- [ ] `GET /books/:id` – Get book details
  - Response: `{ id, name, score }`
  - `score` should be `-1` when there is no rating data
- [ ] `POST /books` – Create book
  - Request body: `{ "name": string }`
  - Response: 201 Created (empty body)

#### Borrow Endpoints
- [ ] `POST /users/:userId/borrow/:bookId` – Borrow a book
  - Response: 204 No Content
- [ ] `POST /users/:userId/return/:bookId` – Return borrowed book
  - Request body: `{ "score": number }`
  - Response: 204 No Content

**Deliverables:**
- User controller, service, and repository
- Book controller, service, and repository
- Borrow controller, service, and repository
- Route configurations matching exact paths
- All queries implemented

**Critical Constraints:**
- NO pagination endpoints
- NO filtering or search
- NO update/delete operations
- NO custom response envelope (return data directly)
- [ ] Return data directly where required by the Postman contract
  - GET endpoints return arrays or objects
  - `POST /users` returns 201 Created with empty body
  - `POST /books` returns 201 Created with empty body
  - Borrow/return operations return 204 No Content with empty body

---

### Phase 3 – Business Logic & Constraints
**Objective:** Enforce domain rules and data consistency

- [ ] Prevent borrowing a book that user already has borrowed (not returned)
- [ ] Prevent returning a book that user didn't borrow or already returned
- [ ] Prevent borrowing non-existent books
- [ ] Prevent user operations on non-existent users
- [ ] Separate active borrows from past borrows in user details endpoint
- [ ] Calculate average score for books:
  - Only include returned books with scores
  - Return -1 if no returned books with scores exist
- [ ] Automatically set `borrowedAt` timestamp on borrow
- [ ] Automatically set `returnedAt` timestamp and store `score` on return
- [ ] Accept any numeric score value (no enforced range)

**Deliverables:**
- Service layer business logic
- Repository query constraints
- Proper data filtering logic

---

### Phase 4 – Validation & Error Handling
**Objective:** Enforce input validation and consistent error responses

#### Input Validation (Zod Schemas)
- [ ] User creation: name is required (string, non-empty)
- [ ] Book creation: name is required (string, non-empty)
- [ ] Return book: score is required (number)
- [ ] Route parameters: userId and bookId are valid numeric IDs

#### Error Handling & Status Codes
- [ ] Implement global error handler middleware
- [ ] 400 Bad Request – missing/invalid fields, invalid ID format
- [ ] 404 Not Found – user not found, book not found, borrow record not found
- [ ] 409 Conflict – duplicate borrow attempt, invalid return attempt
- [ ] 500 Internal Server Error – unexpected errors
- [ ] Consistent error response format (e.g., `{ "error": "message" }`)

**Deliverables:**
- Zod schemas in `validators/` directory
- Global error middleware in `middlewares/`
- Consistent error response structure
- Proper HTTP status codes for all scenarios

---

### Phase 5 – API Compliance & Response Format
**Objective:** Match Postman collection responses exactly

- [ ] Remove any custom response envelopes (no `status`, `data`, `message` wrapper)
- [ ] Return data directly:
  - GET endpoints return arrays or objects
  - POST /users returns 201 Created with empty body
  - POST /books returns 201 Created with empty body
  - Borrow/return operations return 204 No Content with empty body
- [ ] Handle edge cases:
  - Empty user list → `[]`
  - Empty book list → `[]`
  - Book with no scores → `score: -1`
  - User with no past books → `books.past: []`
  - User with no current books → `books.present: []`
- [ ] Verify all responses match Postman collection examples exactly

**Deliverables:**
- Response formatting utilities (if needed)
- Postman collection compatibility verified
- Edge case documentation

---

### Phase 6 – Testing & Finalization
**Objective:** Ensure correctness and production readiness

- [ ] Manual endpoint testing with complete Postman collection
- [ ] Test all happy path scenarios
- [ ] Test all error scenarios (400, 404, 409, 500)
- [ ] Test edge cases:
  - Borrow non-existent book
  - Return book never borrowed
  - Return already returned book
  - Get user with no borrows
  - Get book with no scores
  - Get book with one score (average = that score)
  - Return book with various score values
- [ ] Update README.md with:
  - Setup instructions
  - Environment variables required
  - How to run the server
  - Postman collection location/usage
- [ ] Code cleanup and review
- [ ] Verify ESLint and Prettier are passing
- [ ] Final commit and repository state

**Deliverables:**
- Postman collection test results
- Updated README.md
- Clean, formatted codebase
- Deploy-ready state

---

## 4. Target Folder Structure

```
library-management-backend/
├── src/
│   ├── app.ts                          # Express app configuration
│   ├── server.ts                       # Server entry point
│   ├── controllers/
│   │   ├── userController.ts
│   │   ├── bookController.ts
│   │   └── borrowController.ts
│   ├── services/
│   │   ├── userService.ts
│   │   ├── bookService.ts
│   │   └── borrowService.ts
│   ├── repositories/
│   │   ├── userRepository.ts
│   │   ├── bookRepository.ts
│   │   └── borrowRepository.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   ├── bookRoutes.ts
│   │   └── borrowRoutes.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── validators/
│   │   ├── userValidator.ts
│   │   ├── bookValidator.ts
│   │   └── borrowValidator.ts
│   └── utils/
│       └── logger.ts
├── prisma/
│   ├── schema.prisma                   # Database schema (User, Book, Borrow)
│   ├── seed.ts                         # Seed sample data
│   └── migrations/                     # Migration files
├── .env.example                        # Environment template
├── .env                                # Environment variables (git ignored)
├── eslint.config.mjs
├── .prettierrc
├── tsconfig.json
├── package.json
├── README.md
├── ROADMAP.md
└── .gitignore
```

---

## 5. API Contract Summary

**All Endpoints (FINAL):**

| Method | Endpoint | Request Body | Response | Status |
|--------|----------|--------------|----------|--------|
| GET | /users | — | Array[User] | 200 |
| GET | /users/:id | — | User (with books) | 200 |
| POST | /users | `{ name }` | (empty) | 201 |
| GET | /books | — | Array[Book] | 200 |
| GET | /books/:id | — | Book (with avg score) | 200 |
| POST | /books | `{ name }` | (empty) | 201 |
| POST | /users/:userId/borrow/:bookId | — | (empty) | 204 |
| POST | /users/:userId/return/:bookId | `{ score }` | (empty) | 204 |

**Data Models:**

```typescript
User {
  id: number
  name: string
}

Book {
  id: number
  name: string
  score: string | -1  // stringified average, or -1 if no ratings
}

Borrow {
  id: number
  userId: number
  bookId: number
  borrowedAt: DateTime
  returnedAt: DateTime | null
  score: number | null
}
```

---

## 6. Engineering Notes

### Why This Design?

**Constraint-Driven Development:** This roadmap is strictly bound by an API contract. Every feature must trace back to an explicit requirement. No feature creep, no "nice-to-haves."

**Layered Architecture Rationale:**
- Controllers handle HTTP concerns
- Services contain business logic
- Repositories abstract data access
- Clean separation enables focused testing and maintenance

### Why These Models?

**User & Book:** Simple, minimal – only `name` field to match contract
**Borrow:** Tracks relationship with timestamps and rating
- `borrowedAt`: When book was borrowed
- `returnedAt`: When book was returned (null if not returned)
- `score`: Rating given on return (null if not returned)

### Why Prisma?

- Type-safe queries matching TypeScript
- Schema clarity prevents bugs
- Migrations ensure consistency
- Fast to iterate on constraints

### No Custom Response Envelope

Responses must match Postman collection exactly. No wrapper layers:
```javascript
// ✅ Correct
GET /users/1
{
  id: 1,
  name: "John",
  books: {
    past: [...],
    present: [...]
  }
}

// ❌ Wrong
{ status: "success", data: { id: 1, name: "John", ... } }
```

---

## Success Criteria

- [ ] Database schema with User, Book, Borrow models
- [ ] All 8 endpoints functional and tested
- [ ] Business logic prevents invalid states
- [ ] All Postman tests pass
- [ ] Error handling covers all scenarios (400, 404, 409, 500)
- [ ] Responses match Postman collection exactly (no envelope)
- [ ] Code passes ESLint/Prettier
- [ ] README provides clear setup instructions
- [ ] Ready for immediate deployment

---

## Timeline

**Optimized for Short Deadline Delivery: 1–2 Days**

- **Day 1 Morning:** Phase 1 (Database) + Phase 2 (Endpoints)
- **Day 1 Afternoon:** Phase 3 (Business Logic) + Phase 4 (Validation)
- **Day 2 Morning:** Phase 5 (API Compliance)
- **Day 2 Afternoon:** Phase 6 (Testing & Finalization)

**Critical Path:** Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6

---

**Last Updated:** April 2026  
**Project Status:** Ready for Implementation  
**Constraint:** Strict API-first design – no scope expansion beyond contract
