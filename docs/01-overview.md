# Project Tracker Ecosystem

A fully Dockerized Next.js (Frontend) and Express/Node.js (Backend) application using Redux Toolkit for state management.

## Architecture

- **Frontend:** Next.js App Router, React, Redux Toolkit, Chart.js. Follows the unified `BM Delivery` UI Design System.
- **Backend:** Node.js Express API.
- **Database:** PostgreSQL & Redis (provisioned via Docker Compose).

> [!IMPORTANT]
> This application requires **Docker Compose V2 plugin** (`docker compose` CLI plugin). Older Python-based `docker-compose` (V1) is not supported and will result in build-time / container config errors.

Everything runs inside Docker.

```bash
docker compose up --build
```

- **Frontend UI:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

### First-time Setup

After starting the containers, seed the default ecosystem database (platforms, features, statuses, severities) and create the default admin user:

```bash
# 1. Seed base data & statuses
docker compose exec backend npm run db:seed

# 2. Seed the admin user (admin / admin123)
docker compose exec backend node seedAdmin.js
```

### Database Resets

If you need to completely reset the database to a clean seed state (e.g. to resolve schema conflicts or bad data):

```bash
docker compose down -v
docker compose up -d --build
docker compose exec backend npm run db:seed
docker compose exec backend node seedAdmin.js
```

### Included Features
- Completely styled based on `docs/02-design-system.md` and `docs/06-animation-spec.md`.
- Implemented common components (`<DataTable/>`, `<Modal/>`, `<StatCard/>`, etc.)
- Redux Store seeded with the architecture spec (Platforms, Mobile Apps, Bugs, Feature Requests, Users).
