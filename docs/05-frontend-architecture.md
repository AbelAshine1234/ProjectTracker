# Project Tracker — Frontend Documentation

## Overview

Single-page documentation portal for the **BM Ecosystem** platform suite. Users authenticate locally (username + password), browse platform documentation, track feature requests and bugs, manage QA test cases, and leave per-page comments. Admins can inline-edit content, manage users, and add new documentation platforms.

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | `HomePage` | Main doc SPA — sidebar + content area + right comments panel |
| `/login` | `LoginPage` | Username/password login (no email) |
| `/users` | `UsersPage` | Standalone user table (separate from the doc layout) |
| `/platforms` | `PlatformsPage` | Platforms & Features CRUD table |
| `/bugs` | `BugsPage` | Bug reports data table |

All pages are wrapped in a Redux `<StoreProvider>` via `layout.jsx`.

---

## Authentication

- **Pure client-side** — no API, no JWT, no session. Credentials validated against Redux `users.items` (hardcoded seed data).
- Login dispatches `login({ id, username, role })` to Redux `uiSlice`.
- Logout dispatches `logout()` and redirects to `/login`.
- Route protection: `page.jsx` runs `useEffect` → if `currentUser` is null, `router.replace('/login')`.
- Suspended accounts (`accountStatus !== 'active'`) are blocked at login with an error message.

### Seed Users

| Username | Password | Role | Status |
|---|---|---|---|
| `b` | `b` | Admin-Master | active |
| Yohannes K. | yohannes123 | Call-Center-Agent | active |
| Dawit M. | dawit123 | Merchant-Owner | active |
| External Merchant X | merchant123 | Merchant-Owner | suspended |
| Sara G. | sara123 | Corporate-Manager | active |

---

## Redux Store

6 slices configured in `store/store.js`:

### `uiSlice`
```
sidebarCollapsed, activeModal, modalData, toast, searchQuery, activeFilter, currentUser
```
Actions: `toggleSidebar`, `openModal`, `closeModal`, `showToast`, `hideToast`, `setSearch`, `setFilter`, `login`, `logout`

### `usersSlice`
```
items: initialUsers[]  // 5 users
```
Actions: `addUser`, `updateUser`, `toggleUserStatus`, `removeUser`

### `platformsSlice`
```
items: initialPlatforms[]  // 7 platforms with features[].subTasks[]
```
Actions: `updatePlatform`, `addFeature`, `updateSubTask`, `addSubTask`

### `bugsSlice`
```
items: initialBugs[]  // 3 bugs with attachments
```
Actions: `addBug`, `updateBug`, `removeBug`

### `featuresSlice`
```
items: []  // 4 feature request objects
```
Actions: `addFeatureRequest`, `updateFeatureRequest`, `removeFeatureRequest`

### `editDataSlice`
```
{ customPlatforms: [], ...dynamicKeys }
```
Actions: `saveEdit({ key, value })` — generic content edit storage; `addDocPlatform(platform)` — custom docs

---

## Main Doc Page (`page.jsx`)

The core of the app. Layout:

```
┌──────────┬──────────────────────────┬──────────────┐
│ Sidebar  │   Content Area           │ Right Panel  │
│ (260px)  │   (max 780px, centered)  │ (280px)      │
│          │   docs + prev/next       │ Comments     │
│ footer   │                          │ per-page     │
└──────────┴──────────────────────────┴──────────────┘
```

### State
- `activeSection` (string, default `'overview'`) — which doc section to show
- `isSidebarWide` (boolean) — toggle sidebar width 260px ↔ 360px
- `editing` (boolean) — admin edit mode toggle

### Admin Toolbar
Only visible when `role === 'Admin-Master'`. Contains:
- **Edit button** (pencil icon) — toggles `editing` state; adds purple dashed outline to content area
- Content rendered inside `<EditProvider editing={editing}>` context

### renderContent() Switch (~40 cases)
Handles every `activeSection` value, maps to one of ~20 section components. Custom platforms (IDs starting with `custom-`) are handled dynamically before the switch.

---

## Sidebar (`DocSidebar.jsx`)

6 fixed top-level sections with recursive nesting:

1. **Overview** — Intro, Links, Git Repos
2. **Documentation** — 7 platforms, each with 2-3 features
3. **Feature Requests** — Admin Panel, Merchant App, Client App
4. **Active Work & Bug Reporting** — Active Bugs, Active Work
5. **QA** — QA Overview + 7 platform QA sections (8 user stories)
6. **All Other Docs**

Plus admin-only items appended dynamically:
- **User Management** nav item at bottom
- **Custom platforms** under Documentation section (from `editData.customPlatforms`)

### Sidebar Header
- "BM Ecosystem" title — editable via `EditableField` for admins
- "Full Project Documentation" subtitle — also editable

### Sidebar Footer
- Logged-in user name + role
- Admin User Management icon button
- Logout button → dispatches `logout`, redirects to `/login`
- When logged out: "Sign in" link → `/login`

### Toggle Button
Circle at right edge toggles sidebar width (260px ↔ 360px).

---

## Section Components

### DocSections.jsx (from `en.json` translations)

| Component | Content |
|---|---|
| **OverviewSection** | 6-section list explaining how docs are organized. All text editable. |
| **IntroSection** | Platform overview, architecture, tech stack (6 items). All editable. |
| **PlatformsOverviewSection** | Web apps (4) + Mobile apps (3) listing. All editable. |
| **PlatformSection** | Generic platform detail page (type, status, purpose, features). Editable. |
| **LinksSection** | External doc links (4) + Communication links (3). Editable. |
| **GitReposSection** | Web repos (4) + Mobile repos (3) + Shared repos (3) with clickable URLs. Editable. |

### ExtraSections.jsx (from embedded data constants)

#### Documentation — Granular Platforms (`granularData`)

7 platforms: Admin Panel, Call Center, Merchant Panel, Corporate Panel, BM-Customer-ET, BM-Driver-ET, Merchant App.

| Component | Content |
|---|---|
| **GranularDocsLanding** | Landing page. Admin "Add New Documentation" form (name, clientReqDoc, figmaLink, githubRepo, postmanCollection). Lists custom platforms. |
| **GranularPlatformSection** | Platform detail: name, client resources callout, feature list. Supports custom platforms from Redux. Key text editable. |
| **GranularFeatureSection** | Feature detail: colored bar, description, sub-tasks table. Key text editable. |

#### Feature Requests (`featureRequests`, `featureRequestData`)

6 requests across 3 platforms (Admin Panel, Merchant App, Client App).

| Component | Content |
|---|---|
| **FeatureRequestsLanding** | Static landing page. |
| **FeatureRequestSection** | Platform request listings table. |
| **FeatureRequestDetailView** | Full detail with mockup (Browser or Phone CSS mockups). Editable fields. |

#### Active Work & Bug Reporting (`bugsDetails`, `activeBugsData`, `activeWorkData`)

4 detailed bugs, 4 active work items.

| Component | Content |
|---|---|
| **ActiveWorkBugsLanding** | Static landing page. |
| **ActiveBugsSection** | Table: Platform, Bug Title, Done By, Created, Logs, Status. |
| **BugReportDetailView** | Full bug report: description, steps, error log console, suggested fix, CSS mockup of the failure. Editable fields. |
| **ActiveWorkSection** | Table: App Name, Feature Title, Done By, Deadline, Status. |

#### QA — Test Cases (`qaStoriesData`, `qaStoryDetails`)

8 user stories across 7 platforms.

| Component | Content |
|---|---|
| **QALanding** | Static landing page. |
| **QAPlatformSection** | Table: Story ID, Test Title, Tester, Last Tested, Status. |
| **QAStoryDetailView** | Full test case: description, precondition, numbered steps, expected result. Editable fields. |

#### All Other Docs

| Component | Content |
|---|---|
| **AllOtherDocsSection** | Static: Supplementary Specs (3), API References (3), External Services (3), Deployment Guides (3). |

### UserManagementSection.jsx

Admin-only section rendered inside the doc layout (not a standalone page).

- Shows all users in a styled table (avatar letter, name, ID, role badge, status badge)
- **Create User**: expandable form with username, password, role select
- **Toggle Status**: suspend/activate users
- **Delete User**: remove from Redux store

---

## Inline Editing System

### EditContext
- `EditProvider({ editing, children })` — wraps doc content in `page.jsx`
- `useEdit()` hook → `{ editing }` boolean

### EditableField
- Props: `{ value, onSave, editing, type, options }`
- When `editing=false`: renders value as plain text
- When `editing=true`: shows a pencil icon on hover → click to open input/textarea/select + Save (✓) / Cancel (✕)
- `onSave` dispatches `saveEdit({ key, value })` to Redux `editDataSlice`

### Pattern applied to all section components
```jsx
const { editing } = useEdit();
const dispatch = useDispatch();
const edits = useSelector(s => s.editData);
const ef = (key, value, type) => (
  <EditableField value={edits[key] ?? value} onSave={v => dispatch(saveEdit({ key, value: v }))} editing={editing} type={type} />
);
// Usage: {ef('section.field', defaultValue)} or {ef('section.field', defaultValue, 'textarea')}
```

Edits persist in Redux during the session (lost on hard refresh — no backend).

---

## Comments (Right Panel)

- Stored in `localStorage` under key `bm-doc-comments`
- Keyed by `activeSection` — each page has its own thread
- Shows comment count in header; each comment displays author + timestamp + text
- User types in input, presses Enter or Send button
- Hidden on screens < 1200px
- Only renders when `currentUser` is logged in

---

## Custom Platforms (Add New Documentation)

Admins can add new documentation platforms:

1. Navigate to **Documentation** section in sidebar
2. Click **"Add New Documentation"** button
3. Fill in: Platform Name (required), Client Req Doc, Figma Link, GitHub Repo, Postman Collection
4. Click **"Add Platform"** — saved to Redux `editData.customPlatforms`
5. New platform appears in sidebar under Documentation, and in the content area

---

## CSS Architecture

Single SCSS file: `globals.scss` (~1582 lines)

### Design Tokens
- **Purple** `$purple-primary: #764ABC` — primary actions, active states, links
- **Green** `$green-accent: #1A8917` — success, done status
- **Grays** `$gray-50` through `$gray-900` — UI surfaces, text
- **Fonts**: 'Inter' (body), 'Source Serif 4' (headings)

### Key Layout
- Doc layout: flexbox, min-height 100vh
- Sidebar: fixed, z-index 40, scrollable
- Content: max-width 780px, centered
- Right panel: 280px, sticky, hidden < 1200px

### Responsive
- < 768px: sidebar narrower
- < 1200px: right panel hidden, narrower content
- `prefers-reduced-motion`: disables all animations

---

## File Tree (src/)

```
src/
├── app/
│   ├── globals.scss              # All styles (~1582 lines)
│   ├── layout.jsx                # Root layout with StoreProvider
│   ├── page.jsx                  # Main doc SPA
│   ├── login/page.jsx            # Login page
│   ├── users/page.jsx            # Standalone user mgmt table
│   ├── platforms/page.jsx        # Platforms CRUD table
│   └── bugs/page.jsx             # Bug reports table
├── components/
│   ├── common/
│   │   ├── Button.jsx, Modal.jsx, StatusBadge.jsx, ...
│   │   ├── EditableField.jsx     # Inline edit component
│   │   └── EditContext.jsx       # Edit mode context provider
│   ├── content/
│   │   ├── DocSections.jsx       # Overview, Intro, Links, GitRepos, Platforms
│   │   ├── ExtraSections.jsx     # Granular docs, Feature Requests, Bugs, QA, AllOther
│   │   ├── UserManagementSection.jsx  # Admin user CRUD
│   │   └── PageComments.jsx      # Inline comments (alternative)
│   ├── data/
│   │   ├── DataTable.jsx, StatCard.jsx, Charts.jsx, ...
│   ├── forms/
│   │   ├── Input.jsx, FileUploadZone.jsx, FormField.jsx, Select.jsx
│   └── layout/
│       ├── DocSidebar.jsx        # Main sidebar nav
│       ├── RightComments.jsx     # Per-page comments panel
│       ├── CommentPanel.jsx      # Slide-out comments (alt)
│       └── Navigation.jsx, PageHeader.jsx, ...
├── store/
│   ├── store.js                  # Redux store config (6 slices)
│   ├── provider.jsx              # Redux Provider wrapper
│   └── slices/
│       ├── uiSlice.js, usersSlice.js, platformsSlice.js,
│       ├── bugsSlice.js, featuresSlice.js, editDataSlice.js
├── data/
│   └── data.js                   # Seed data: users, platforms, bugs, charts
└── locales/
    └── en.json                   # English translations (253 lines)
```
