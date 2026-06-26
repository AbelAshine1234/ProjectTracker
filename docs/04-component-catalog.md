# BM Delivery — Common Components Catalog

All components observed across the 49 delivered screens. Each entry lists props, variants, and the screens it appears in.

---

## 1. `<AppShell />`

The persistent outer layout wrapping every authenticated page.

**Structure:**
```
<AppShell>
  <Sidebar />
  <main>{children}</main>
</AppShell>
```

**Sidebar slots:**
- Logo (top-left, green LOGO text)
- `<NavItem />` list (vertical stack)
- `<UserAvatar />` + name + role label + logout icon (bottom-left, pinned)

**Appears in:** Every screen.

---

## 2. `<NavItem />`

Single sidebar navigation link.

**Props:**
```ts
icon: ReactNode          // Lucide/Heroicons outline icon
label: string            // e.g. "Dashboard", "Drivers"
href: string
active?: boolean         // applies green background pill
```

**Variants:**
- Default (gray icon + text)
- Active (green background, green icon + text, font-weight 500)
- Hover (light gray background)

**Appears in:** All screens (sidebar).

---

## 3. `<UserAvatar />`

Circular initials avatar used for both sidebar user identity and table rows.

**Props:**
```ts
name: string             // e.g. "Bethlehem T."
role?: string            // e.g. "Super Admin", "Call Center"
size?: 'sm' | 'md' | 'lg'  // 28px / 36px / 44px
color?: string           // background color (auto-assigned from name hash)
showName?: boolean       // show name + role text beside avatar
showLogout?: boolean     // show logout icon button
```

**Variants seen:**
- Sidebar user (md, with name + role + logout arrow)
- Table row avatar (sm, color-coded initials)

**Appears in:** All screens (sidebar); 13 (Drivers roster), 22 (Customers), 23 (Call Center), 25 (Deliveries), 28 (Live Map).

---

## 4. `<PageHeader />`

Top area of each main content panel.

**Props:**
```ts
title: string
actions?: ReactNode      // e.g. "+ Add New Driver" button
showExport?: boolean     // shows Export button with download icon
showNotification?: boolean  // bell icon
```

**Appears in:** Every page (title varies per section).

---

## 5. `<StatCard />`

KPI summary card shown in a row at the top of most pages.

**Props:**
```ts
label: string            // e.g. "Active Deliveries"
value: string | number   // e.g. 84, "ETB 48,210"
delta?: string           // e.g. "+12 since yesterday"
deltaType?: 'positive' | 'negative' | 'neutral'
subtext?: string         // e.g. "Active On Platform", "Awaiting review"
subtextType?: 'success' | 'warning' | 'error'
icon?: ReactNode         // optional icon (stacked layers icon on Dashboard)
```

**Appears in:** 10–11 (Dashboard), 13 (Drivers), 16 (Vehicles), 25 (Deliveries), 33 (Corporate), 40–41 (Analytics).

---

## 6. `<DataTable />`

Generic sortable/filterable table.

**Props:**
```ts
columns: ColumnDef[]    // label, key, width, render fn
rows: Record[]
loading?: boolean
emptyState?: ReactNode
pagination?: PaginationProps
```

**Column cell renderers observed:**
- `<StatusBadge />` (Active, Pending, Suspended, etc.)
- `<StarRating />` (Driver ratings)
- `<ActionGroup />` (View, Edit, Approve, Reject)
- Plain text, ETB currency, date strings

**Appears in:** 1 (Merchants), 13 (Drivers), 16 (Vehicles), 22 (Customers), 23 (Call Center), 25 (Deliveries), 29 (Issues), 31 (Pricing), 33 (Corporate).

---

## 7. `<StatusBadge />`

Pill-shaped status indicator.

**Props:**
```ts
status: 'active' | 'pending' | 'suspended' | 'approved' | 'rejected'
       | 'online' | 'offline' | 'in-transit' | 'delivered' | 'cancelled'
       | 'unassigned' | 'maintenance' | 'overdue' | 'invited' | 'high' | 'medium' | 'low'
size?: 'sm' | 'md'
```

**Color mapping:** See `style.md → Status Badge Color Map`.

**Appears in:** All table screens.

---

## 8. `<SearchBar />`

Single-line text input with search icon prefix.

**Props:**
```ts
placeholder: string
value: string
onChange: (val: string) => void
```

**Appears in:** 1 (Merchants), 13 (Drivers), 16 (Vehicles), 22 (Customers), 23 (Call Center), 25 (Deliveries), 29 (Issues), 33 (Corporate), 42 (Dispatches).

---

## 9. `<FilterSelect />`

Dropdown filter for table column values.

**Props:**
```ts
label: string        // "ALL STATUS", "ALL TYPES", "ALL COLORS", "ASSIGNED"
options: { label: string; value: string }[]
value: string
onChange: (val: string) => void
```

Displayed as: `ALL STATUS ∨` (label + chevron button).

**Appears in:** 1, 13, 16, 22, 25, 29.

---

## 10. `<Pagination />`

**Props:**
```ts
currentPage: number
totalPages: number
onPageChange: (page: number) => void
```

**Layout:** `← Previous  [1]  [2]  [...]  [13]  Next →`

- Active page: green filled pill
- Collapsed middle pages with `...`

**Appears in:** All table screens.

---

## 11. `<Modal />`

Centered dialog overlay.

**Props:**
```ts
isOpen: boolean
onClose: () => void
title: string
children: ReactNode
footer?: ReactNode     // usually <Button> pair
size?: 'sm' | 'md' | 'lg'  // ~480 / 640 / 800px
```

**Standard footer pattern:**
```tsx
<Button variant="outlined" onClick={onClose}>Cancel</Button>
<Button variant="primary" onClick={onSubmit}>Save Changes</Button>
```

**Appears in:** 14 (Add Rider), 15 (Edit Rider), 17 (Add Vehicle), 18–21 (View/Edit Vehicle), 24 (Edit Agent), 26 (Delivery detail), 27 (Assign Rider), 30 (Issue detail), 32 (Add Zone), 34 (Add Corporate), 35–38 (Corporate detail), 43 (Create Order), 44 (Order detail), 45 (Assign Driver), 46 (Driver Info).

---

## 12. `<FormField />`

Labeled input wrapper.

**Props:**
```ts
label: string
required?: boolean     // shows red asterisk
hint?: string
error?: string
children: ReactNode    // <Input />, <Select />, <FileUpload />, <Textarea />
```

**Appears in:** All form modals.

---

## 13. `<Input />`

Single-line text input.

**Props:**
```ts
type?: 'text' | 'email' | 'tel' | 'number' | 'date'
placeholder?: string
value: string
onChange: (val: string) => void
prefix?: ReactNode    // e.g. phone flag icon
disabled?: boolean
```

**Appears in:** All form modals.

---

## 14. `<Select />`

Styled native or custom dropdown.

**Props:**
```ts
options: { label: string; value: string }[]
value: string
onChange: (val: string) => void
placeholder?: string
```

Displays with chevron-down icon on the right.

**Appears in:** 15 (Edit Rider — Vehicle type, Approval status), 21 (Edit Vehicle), 43 (Create Order — Order type, Vehicle type, Priority, Payment method, Rider).

---

## 15. `<FileUploadZone />`

Drag-and-drop file upload area.

**Props:**
```ts
label: string           // e.g. "National ID (photo)", "Vehicle registration"
acceptedFormats: string // e.g. "JPG, PNG or PDF · Max 5 MB"
onUpload: (file: File) => void
```

**Appears in:** 14 (Add Rider — National ID, Driver photo), 17 (Add Vehicle — Registration, Insurance, Photo), Container.png, Container-1.png.

---

## 16. `<Toggle />`

On/off switch.

**Props:**
```ts
label: string
description?: string
checked: boolean
onChange: (val: boolean) => void
```

**Appears in:** 7 (Platform Settings — Accept orders, Driver registration, Corporate registration, Maintenance mode), 9 (Notification preferences — 5 toggles), 15 (Edit Rider — Account active), 24 (Edit Agent — Account active).

---

## 17. `<TabBar />`

Horizontal tab navigation. Two variants observed:

**Variant A — Pill tabs (filled active state)**
- Ecommerce sub-tabs: Dashboard / Merchants / Orders / Products / Categories / Commission / Wallets
- Issues sub-tabs: Opened / In Progress / Resolved
- Pricing sub-tabs: City Pricing / Services Fees / Promotions / Vehicle Rules

**Variant B — Underline tabs (bottom border active state)**
- Vehicle modal: Details / Documents / History
- Corporate modal: Overview / Users / Orders / Deliverables
- Dispatcher card filter: All / Pending / Assigned / In Transit / Delivered / Cancelled

**Props:**
```ts
tabs: { label: string; value: string }[]
activeTab: string
onTabChange: (val: string) => void
variant?: 'pill' | 'underline'
```

**Appears in:** 0–6 (Ecommerce), 7–9 (Settings), 18–21 (Vehicle modal), 29–30 (Issues), 31–32 (Pricing), 35–38 (Corporate modal), 42–45 (Dispatches).

---

## 18. `<QuickActionCard />`

Small square card in the Dashboard Quick Actions panel.

**Props:**
```ts
label: string        // e.g. "Create order"
description: string  // e.g. "Dispatch a new delivery"
href: string
icon?: ReactNode     // arrow icon top-right
```

**Appears in:** 10–11 (Dashboard — 6 quick action cards).

---

## 19. `<ActivityFeedItem />`

Single row in the "Recent Activity" feed on the Dashboard.

**Props:**
```ts
icon: ReactNode       // colored dot icon (green=delivery, red=issue, etc.)
title: string         // e.g. "Order #BM-09831 dispatched"
description: string   // e.g. "Assigned to Dawit Tesfaye · Bole → Piassa"
timestamp: string     // e.g. "2 min ago"
```

**Appears in:** 10–12 (Dashboard).

---

## 20. `<LineChart />`

**Props:**
```ts
data: { label: string; value: number }[]
title: string
toggleOptions?: string[]   // e.g. ["Week", "Month"]
yAxisUnit?: string         // e.g. "ETB"
```

**Appears in:** 10–11 (Orders Over Time), 40–41 (Revenue Trend, Orders Over Time).

---

## 21. `<BarChart />`

**Props:**
```ts
data: { label: string; value: number }[]
title: string
color?: string         // defaults to --green-primary
```

**Appears in:** 10–11 (Revenue by Day), 40–41 (Daily deliveries, Revenue by Day).

---

## 22. `<DonutChart />`

**Props:**
```ts
segments: { label: string; value: number; color: string }[]
title: string
legend?: boolean
```

**Appears in:** 41 (Orders by vehicle — Motorbike 68%, Car 14%, Bicycle 12%, Van 6%).

---

## 23. `<LeaderboardItem />`

Ranked list item for "Top Riders" on Analytics.

**Props:**
```ts
rank: number
name: string
subtitle: string      // e.g. "312 trips · 98.1% completion"
value: string         // e.g. "ETB 48,200"
```

**Appears in:** 41 (Analytics — Top Riders).

---

## 24. `<LiveMap />`

Full-page map with overlaid rider pins and sidebar panel.

**Props:**
```ts
riders: RiderPin[]         // { id, name, lat, lng, status, zone }
orders: ActiveDelivery[]   // { id, route, eta, rider }
filter?: 'all' | 'on-delivery' | 'available' | 'orders'
zone?: string
```

**Pin color legend:**
- 🟢 Green dot = Available rider
- 🔵 Teal dot = On delivery rider
- 🟠 Orange dot = Pickup point
- 🔴 Red dot = Dropoff point

Right panel shows: Online riders count / In transit count / Pending count, active deliveries list, online riders list with status.

**Appears in:** 28 (Live Map).

---

## 25. `<DeliveryCard />`

Card in the Dispatcher Control Center kanban-style view.

**Props:**
```ts
orderId: string           // e.g. "BM-09831"
status: OrderStatus
pickup: string
dropoff: string
amount: number
customer: string
rider?: string
progress: number          // 0–100, drives progress bar fill
```

**Actions per status:**
- Pending: `View` + `Assign` (green)
- Assigned / In Transit: `View`
- Delivered: `View`
- Cancelled: `View`

**Appears in:** 42 (Dispatcher Control Center).

---

## 26. `<DeliveryTimeline />`

Vertical ordered timeline showing delivery lifecycle steps.

**Steps:** Order placed → Rider assigned → Package picked up → In transit → Delivered

**Props:**
```ts
steps: { label: string; timestamp?: string; completed: boolean; current?: boolean }[]
```

- Completed steps: green filled dot
- Current step: green dot with pulse ring animation
- Future steps: gray empty dot

**Appears in:** 26 (Delivery Monitor detail), 44 (Dispatcher order detail).

---

## 27. `<EmptyState />`

Shown when a tab/section has no data yet.

**Props:**
```ts
icon?: ReactNode      // bag/shopping icon
title: string         // e.g. "Ecommerce Orders"
description: string   // e.g. "This section is ready to populate with data."
```

**Appears in:** 2–6 (Ecommerce tabs: Orders, Products, Categories, Commission, Wallets), 36–38 (Corporate Users, Orders, Deliverables tabs).

---

## 28. `<PendingApprovalRow />`

Row item in the "Riders Pending Approval" section on the Dashboard.

**Props:**
```ts
name: string
phone: string
submittedAgo: string     // e.g. "2 hr ago"
onApprove: () => void
onView: () => void
```

**Appears in:** 10–11 (Dashboard — bottom of page).

---

## 29. `<SuccessToast />`

Center-screen confirmation after a successful mutation.

**Props:**
```ts
message: string      // e.g. "Successfully Driver Approved", "Successfully Corporate Added"
```

Auto-dismisses after ~2 seconds. Uses spring animation.

**Appears in:** 12 (Driver Approved), 39 (Corporate Added).

---

## 30. `<SectionLabel />`

All-caps divider label inside form modals separating field groups.

**Props:**
```ts
label: string       // e.g. "PERSONAL INFORMATION", "VEHICLE & LICENSE", "BILLING", "OPERATIONS"
```

```css
font-size: 11px;
font-weight: 600;
letter-spacing: 0.08em;
color: #9CA3AF;
text-transform: uppercase;
```

**Appears in:** 14 (Add Rider), 17 (Add Vehicle), 34 (Add Corporate), 7 (Platform Settings).

---

## 31. `<InfoGrid />`

2-column key-value grid used inside view modals.

**Props:**
```ts
fields: { label: string; value: string }[]
columns?: 1 | 2
```

**Appears in:** 18 (Vehicle Details), 26 (Delivery detail), 35 (Corporate Overview), 46 (Driver Info modal).

---

## 32. `<DocumentRow />`

Single document item with name, status/expiry, and View link.

**Props:**
```ts
label: string          // e.g. "Vehicle Registration"
subtext: string        // e.g. "Valid · Expires Dec 2025"
onView: () => void
```

**Appears in:** 19 (Vehicle Documents — 3 rows: Registration, Insurance, Photo).

---

## 33. `<HistoryTimeline />`

Vertical chronological list of events on a record.

**Props:**
```ts
events: { label: string; date: string }[]
```

**Appears in:** 20 (Vehicle History — Assigned, Inspection, Insurance renewed, Routine service).

---

## 34. `<InlineAlert />`

Info banner inside a form.

**Props:**
```ts
type: 'info' | 'warning' | 'success'
message: string
```

**Appears in:** Container.png (Add Rider — "The rider will receive an SMS with their login credentials after registration.").

---

## 35. `<ResetPasswordLink />`

Inline text link action inside edit modals.

**Label:** `🔑 Reset password (send link)`

**Appears in:** 24 (Edit Agent modal).

---

## 36. `<MerchantApprovalRow />`

Row in the "Pending merchant approvals" section on Ecommerce Dashboard.

**Props:**
```ts
merchantName: string
ownerName: string
email: string
status: 'Pending review'
onReject: () => void
onApprove: () => void
onReview: () => void
```

**Appears in:** 0 (Ecommerce Dashboard).

---

## 37. `<AssignRiderModal />`

Modal for assigning a rider to an unassigned order.

**Props:**
```ts
orderId: string
route: string              // e.g. "Gerji → CMC Road"
availableRiders: Rider[]
vehicleTypeFilter?: string
onAssign: (riderId: string) => void
onCancel: () => void
```

Two versions seen: simplified (Deliveries Monitor — 27) and expanded with Vehicle type dropdown (Dispatcher Center — 45).

**Appears in:** 27 (Deliveries Monitor assign), 45 (Dispatcher assign).

---

## 38. `<StepIndicator />`

Multi-step form progress bar at top of Create New Order modal.

**Props:**
```ts
steps: { label: string }[]   // e.g. [{label:"Order Details"}, {label:"Price Confirmation"}]
currentStep: number
```

**Appears in:** 43 (Create New Order modal — Step 1 of 2).
