# Backend Architecture — Project Tracker

## Overview

REST API backend with JWT authentication serving the Project Tracker documentation platform. Two roles: **admin** (content managers, multiple) and **user** (viewers, multiple).

The frontend sections (**Overview**, **Documentation**, **Feature Requests**, **Active Work & Bug Reporting**, **QA**) are **fixed** — they cannot be added or removed. All **content inside** them is fully editable by admins.

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL (relational fits hierarchical content) |
| ORM | Prisma |
| Auth | JWT (`access` + `refresh` tokens) |
| Validation | Zod |
| File upload | Multer → local `uploads/` or S3-compatible |
| Docs | Swagger via `swagger-jsdoc` + `swagger-ui-express` |

---

## 2. Database Models (Prisma Schema)

### User

```prisma
model User {
  id            Int      @id @default(autoincrement())
  username      String   @unique
  password      String   // bcrypt hash
  role          Role     @default(USER)
  accountStatus Status   @default(ACTIVE)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  comments      Comment[]
}

enum Role { ADMIN USER }
enum Status { ACTIVE SUSPENDED }
```

### Platform

```prisma
model Platform {
  id              Int      @id @default(autoincrement())
  name            String   @unique  // "Admin Panel", "Call Center", etc.
  type            String   // "web" | "mobile"
  description     String   @default("")
  gitRepo         String   @default("")
  figmaLink       String   @default("")
  displayOrder    Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  documentation   PlatformDocumentation?
  features        Feature[]
  bugReports      BugReport[]
  qaStories       QAStory[]
}

model PlatformDocumentation {
  id          Int      @id @default(autoincrement())
  platformId  Int      @unique
  header      String   @default("")
  intro       String   @default("")
  body        String   @default("")
  footerNote  String   @default("")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  platform    Platform @relation(fields: [platformId], references: [id], onDelete: Cascade)
}
```

### Feature (belongs to a Platform)

```prisma
model Feature {
  id            Int      @id @default(autoincrement())
  platformId    Int
  name          String
  color         String   @default("#764ABC")
  description   String   @default("")
  displayOrder  Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  platform      Platform @relation(fields: [platformId], references: [id], onDelete: Cascade)
  subItems      SubItem[]
}
```

### SubItem (task under a Feature)

```prisma
model SubItem {
  id            Int      @id @default(autoincrement())
  featureId     Int
  name          String
  requestedById Int?      // references User
  doneById      Int?      // references User
  devPy         String   @default("") // deadline
  status        String   @default("pending") // "done" | "in-progress" | "pending"
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  feature       Feature  @relation(fields: [featureId], references: [id], onDelete: Cascade)
  requestedBy   User?    @relation("subItemsRequested", fields: [requestedById], references: [id])
  doneBy        User?    @relation("subItemsDone", fields: [doneById], references: [id])
}
```

### BugReport

```prisma
model BugReport {
  id          Int           @id @default(autoincrement())
  platformId  Int
  title       String
  doneById    Int?
  status      String        @default("pending") // "in-progress" | "review" | "pending"
  description String        @default("")
  steps       String        @default("")
  expectedFix String        @default("")
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  platform    Platform      @relation(fields: [platformId], references: [id], onDelete: Cascade)
  doneBy      User?         @relation(fields: [doneById], references: [id])
  attachments BugAttachment[]
}

model BugAttachment {
  id         Int       @id @default(autoincrement())
  bugId      Int
  type       String    // "image" | "video" | "file"
  name       String
  filePath   String    @default("") // server path or S3 URL
  createdAt  DateTime  @default(now())

  bug        BugReport @relation(fields: [bugId], references: [id], onDelete: Cascade)

  @@index([bugId])
}
```

### FeatureRequest (feature request items)

```prisma
model FeatureRequest {
  id          Int      @id @default(autoincrement())
  platformId  Int
  name        String
  requestedById Int?
  createdDate String   @default("")
  status      String   @default("pending") // "approved" | "review" | "pending"
  mockup      String   @default("") // URL or base64
  description String   @default("")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  platform    Platform @relation(fields: [platformId], references: [id], onDelete: Cascade)
  requestedBy User?    @relation(fields: [requestedById], references: [id])
}
```

### QAStory

```prisma
model QAStory {
  id              Int      @id @default(autoincrement())
  platformId      Int
  title           String
  description     String   @default("")
  precondition    String   @default("")
  testSteps       String   // JSON array stored as text: ["step1","step2"]
  expectedResult  String   @default("")
  status          String   @default("pending") // "passed" | "in-progress" | "pending"
  testerId        Int?
  lastTested      String   @default("")
  displayOrder    Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  platform        Platform @relation(fields: [platformId], references: [id], onDelete: Cascade)
  tester          User?    @relation(fields: [testerId], references: [id])
}
```

### Comment (per-page comments)

```prisma
model Comment {
  id          Int      @id @default(autoincrement())
  sectionKey  String   // docSequence.id (e.g. "overview", "granular-admin", "qa-admin-us1")
  userId      Int
  text        String
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([sectionKey])
}
```

---

## 3. API Endpoints

All endpoints except `/auth/*` require `Authorization: Bearer <token>`. Admin role required for POST/PUT/DELETE on content resources.

### 3.1 Auth

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | None | Returns `{ accessToken, refreshToken, user }` |
| POST | `/api/auth/refresh` | None | Rotate refresh token → new access token |
| POST | `/api/auth/logout` | Any | Invalidate refresh token |

**Login body:** `{ username, password }`

### 3.2 Users (admin only for management)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/users` | Admin | List all users |
| GET | `/api/users/:id` | Admin | Get user by ID |
| POST | `/api/users` | Admin | Create user |
| PUT | `/api/users/:id` | Admin | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user |

### 3.3 Platforms

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/platforms` | Any | List all platforms (ordered) |
| GET | `/api/platforms/:id` | Any | Get platform with features/sub-items |
| PUT | `/api/platforms/:id` | Admin | Update platform metadata |
| PUT | `/api/platforms/:id/order` | Admin | Reorder platforms |

### 3.4 Features & SubItems

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/platforms/:platformId/features` | Any | List features for a platform |
| GET | `/api/features/:id` | Any | Get feature with sub-items |
| POST | `/api/platforms/:platformId/features` | Admin | Create feature |
| PUT | `/api/features/:id` | Admin | Update feature |
| DELETE | `/api/features/:id` | Admin | Delete feature (+ cascade sub-items) |
| PUT | `/api/features/:id/order` | Admin | Change feature display order |

**Sub-items are nested under features:**

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/features/:featureId/subitems` | Any | List sub-items |
| POST | `/api/features/:featureId/subitems` | Admin | Create sub-item |
| PUT | `/api/subitems/:id` | Admin | Update sub-item (name, status, doneBy, etc.) |
| DELETE | `/api/subitems/:id` | Admin | Delete sub-item |

### 3.5 Bug Reports

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/bugs` | Any | List all bugs (filterable by platform) |
| GET | `/api/bugs/:id` | Any | Get bug detail |
| POST | `/api/bugs` | Admin | Create bug (multipart for attachments) |
| PUT | `/api/bugs/:id` | Admin | Update bug |
| DELETE | `/api/bugs/:id` | Admin | Delete bug (+ cascade attachments) |
| POST | `/api/bugs/:id/attachments` | Admin | Upload attachment file (multipart) |
| DELETE | `/api/attachments/:id` | Admin | Remove attachment |

### 3.6 Feature Requests

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/feature-requests` | Any | List all (filterable by platform) |
| GET | `/api/feature-requests/:id` | Any | Get detail |
| POST | `/api/feature-requests` | Admin | Create |
| PUT | `/api/feature-requests/:id` | Admin | Update |
| DELETE | `/api/feature-requests/:id` | Admin | Delete |

### 3.7 QA Stories

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/qa-stories` | Any | List all (filterable by platform/status) |
| GET | `/api/qa-stories/:id` | Any | Get detail with test steps |
| POST | `/api/qa-stories` | Admin | Create |
| PUT | `/api/qa-stories/:id` | Admin | Update |
| DELETE | `/api/qa-stories/:id` | Admin | Delete |
| PUT | `/api/qa-stories/:id/order` | Admin | Reorder within platform |

### 3.8 Comments

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/comments/:sectionKey` | Any | Get comments for a section |
| POST | `/api/comments/:sectionKey` | Any | Add comment (uses `req.user` for author) |
| DELETE | `/api/comments/:id` | Admin or owner | Delete a comment |

**POST body:** `{ text }` (author is derived from JWT token)

### 3.9 Content Sync (seed → DB)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/admin/seed` | Admin | Load all seed data from frontend into DB |
| POST | `/api/admin/reseed` | Admin | Drop and re-seed everything |

Useful for initial setup.

---

## 4. Auth Flow

```
POST /api/auth/login { username, password }
  → verify against bcrypt hash
  → generate { accessToken (15min), refreshToken (7d) }
  → return { accessToken, refreshToken, user: { id, username, role } }

Client stores accessToken in memory (or httpOnly cookie) + refreshToken in httpOnly cookie.

On 401 → POST /api/auth/refresh { refreshToken }
  → verify + rotate → return new accessToken
```

**Middleware pipeline:**

```
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)          // no auth middleware
app.use("/api", authenticate)             // JWT verify → req.user
app.use("/api/admin", authorize("ADMIN")) // role check
app.use("/api", resourceRoutes)           // content CRUD
app.use(errorHandler)
```

---

## 5. Permissions Matrix

| Resource | Read | Create | Update | Delete |
|---|---|---|---|---|
| User | Admin | Admin | Admin | Admin |
| Platform | Any | Admin | Admin | Admin | 
| Feature | Any | Admin | Admin | Admin |
| SubItem | Any | Admin | Admin | Admin |
| BugReport | Any | Admin | Admin | Admin |
| FeatureRequest | Any | Admin | Admin | Admin |
| QAStory | Any | Admin | Admin | Admin |
| Comment | Any | Any | Owner/Admin | Owner/Admin |

---

## 6. Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts                # frontend seed data loader
├── src/
│   ├── index.ts               # Express app entry
│   ├── config/
│   │   └── env.ts             # env vars (PORT, JWT_SECRET, DATABASE_URL)
│   ├── middleware/
│   │   ├── authenticate.ts    # JWT verify → req.user
│   │   └── authorize.ts       # role-based guard
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── platforms.ts
│   │   ├── features.ts
│   │   ├── subitems.ts
│   │   ├── bugs.ts
│   │   ├── featureRequests.ts
│   │   ├── qaStories.ts
│   │   └── comments.ts
│   ├── controllers/
│   │   └── ...                 # route handlers
│   ├── services/
│   │   └── ...                 # business logic
│   ├── validators/
│   │   └── ...                 # Zod schemas
│   └── utils/
│       ├── jwt.ts
│       └── hash.ts
├── uploads/                    # file uploads (gitignored)
├── package.json
├── tsconfig.json
└── .env
```

---

## 7. Notes

- **Passwords** stored as bcrypt hash, never plain text.
- **Refresh tokens** stored in DB (table `RefreshToken`) for revocation.
- **Display order** (`displayOrder` field) used instead of relying on insertion order.
- **Comments** keyed by `sectionKey` (maps to `docSequence.id` from frontend).
- **Seed script** (`prisma/seed.ts`) loads all hardcoded frontend data (`data.js` + `ExtraSections.jsx` data) into the database for a first run.
- **CORS** configured to allow only the frontend origin.
- **Error responses** follow `{ error: string, details?: any }` format.
