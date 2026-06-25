# Project Tracker Ecosystem

A fully Dockerized Next.js (Frontend) and Express/Node.js (Backend) application using Redux Toolkit for state management.

## Architecture

- **Frontend:** Next.js App Router, React, Redux Toolkit, Chart.js. Follows the unified `BM Delivery` UI Design System.
- **Backend:** Node.js Express API.
- **Database:** PostgreSQL & Redis (provisioned via Docker Compose).

## Running the Application

Everything runs inside Docker.

```bash
docker-compose up --build
```

- **Frontend UI:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

### First-time Setup

After starting the containers, seed the admin user:

```bash
docker compose exec backend node seedAdmin.js
```

Default admin credentials: `admin` / `admin123`

### Included Features
- Completely styled based on `style.md` and `physicsandanimation.md`.
- Implemented common components (`<DataTable/>`, `<Modal/>`, `<StatCard/>`, etc.)
- Redux Store seeded with the architecture spec (Platforms, Mobile Apps, Bugs, Feature Requests, Users).
