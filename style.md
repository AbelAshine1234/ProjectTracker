# BM Delivery — Design System & Style Guide

Extracted from the delivered Figma screens (Super Admin + Call Center Agent role views).

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--green-primary` | `#1A5C32` | Logo, active nav item background, primary buttons (Approve, Save, Assign), active tab pill |
| `--green-dark` | `#163F24` | Button hover state, pressed state |
| `--green-light` | `#E8F5EC` | Active nav item text tint, success badge background |
| `--red-action` | `#DC2626` | Reject button, Remove button, Suspended badge |
| `--orange-pending` | `#F59E0B` | Pending badge, surge multiplier highlight (1.4×) |
| `--blue-transit` | `#3B82F6` | "In Transit" status badge |
| `--gray-50` | `#F9FAFB` | Page background |
| `--gray-100` | `#F3F4F6` | Sidebar background, card backgrounds |
| `--gray-200` | `#E5E7EB` | Table row dividers, modal borders |
| `--gray-400` | `#9CA3AF` | Placeholder text, secondary icon color |
| `--gray-600` | `#4B5563` | Subtext, table column headers |
| `--gray-900` | `#111827` | Primary body text, headings |
| `--white` | `#FFFFFF` | Modal backgrounds, card surfaces |

### Status Badge Color Map

| Status | Background | Text |
|---|---|---|
| Active / Approved / Online / Delivered | `--green-light` | `--green-primary` |
| Pending / Invited / Unassigned | amber-100 | amber-700 |
| Suspended / Rejected / Overdue / Cancelled | red-100 | `--red-action` |
| In Transit / Assigned | blue-100 | blue-700 |
| Maintenance | gray-100 | gray-600 |

---

## Typography

All text is rendered in **Inter** (system fallback: `-apple-system, BlinkMacSystemFont, sans-serif`).

| Role | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| Page Title | 24px | 600 | 32px | `Dashboard`, `Driver management`, `Settings` |
| Section Title | 18px | 600 | 28px | `Recent Activity`, `Drivers Roster`, `Platform Settings` |
| Table Header | 11px | 600 | 16px | `DRIVER`, `STATUS`, `ACTIONS` — uppercase, letter-spacing 0.05em |
| Body / Table Cell | 14px | 400 | 20px | Data rows, descriptions |
| Label / Sub-caption | 12px | 400 | 16px | Avatar subtitles, timestamps, stat card labels |
| Stat Number (large) | 32px | 700 | 40px | KPI numbers on dashboard cards |
| Stat Number (medium) | 24px | 700 | 32px | KPI numbers on inner pages |
| Button | 14px | 500 | 20px | All buttons |
| Form Label | 12px | 500 | 16px | Form field labels (uppercase on some) |
| Empty State | 14px | 500 | 20px | "This section is ready to populate with data." |

---

## Spacing Scale

Based on a 4px base unit:

```
4px  → xs   (icon gaps, badge padding vertical)
8px  → sm   (between label and input, table cell padding vertical)
12px → md   (sidebar item vertical padding, button padding vertical)
16px → lg   (card padding, form section gap)
20px → xl   (section gap within page)
24px → 2xl  (page content padding, between page title and content)
32px → 3xl  (between major page sections)
```

---

## Border Radius

| Component | Radius |
|---|---|
| Cards / Panels | `12px` |
| Buttons (primary) | `8px` |
| Buttons (outlined) | `8px` |
| Badges / Pills (status) | `999px` (fully rounded) |
| Input fields | `8px` |
| Modal | `16px` |
| Avatar circles | `50%` |
| Tab pills (active) | `8px` |

---

## Elevation / Shadow

| Level | CSS | Usage |
|---|---|---|
| 0 | `none` | Flat table rows, sidebar |
| 1 | `0 1px 3px rgba(0,0,0,0.08)` | Cards, stat boxes |
| 2 | `0 4px 16px rgba(0,0,0,0.12)` | Modals, dropdowns |
| 3 | `0 8px 32px rgba(0,0,0,0.16)` | Toast notifications, overlays |

---

## Layout

### Shell Structure

```
┌────────────────────────────────────────────────────┐
│  Sidebar (220px fixed)  │  Main Content Area       │
│  ─────────────────────  │  ──────────────────────  │
│  Logo (top-left)        │  Page Title + Actions    │
│  Nav Items (vertical)   │  Stat Cards (row)        │
│  ─────────────────────  │  Data Table / Content    │
│  User Avatar + Name     │                          │
│  Role Label + Logout    │                          │
└────────────────────────────────────────────────────┘
```

- Outer container: `background: #F9FAFB`
- Sidebar: `background: white`, `border-right: 1px solid #E5E7EB`
- Main content: left-padding `24px`, top-padding `24px`

### Sidebar Nav Item States

```css
/* Default */
.nav-item { color: #4B5563; background: transparent; }

/* Active */
.nav-item.active {
  background: #E8F5EC;
  color: #1A5C32;
  font-weight: 500;
  border-radius: 8px;
}

/* Hover */
.nav-item:hover { background: #F3F4F6; }
```

---

## Buttons

### Primary (Green)
```css
background: #1A5C32;
color: white;
border-radius: 8px;
padding: 8px 16px;
font-size: 14px;
font-weight: 500;
```

### Destructive (Red)
```css
background: #DC2626;
color: white;
border-radius: 8px;
padding: 8px 16px;
```

### Outlined / Ghost
```css
background: transparent;
border: 1px solid #E5E7EB;
color: #111827;
border-radius: 8px;
padding: 8px 16px;
```

### Text / Link
```css
background: transparent;
color: #1A5C32;
font-weight: 500;
```
Used for: `View`, `Track`, inline table actions.

---

## Form Fields

```css
input, select, textarea {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #111827;
  background: white;
}

input::placeholder { color: #9CA3AF; }

input:focus {
  border-color: #1A5C32;
  outline: none;
  box-shadow: 0 0 0 3px rgba(26, 92, 50, 0.15);
}
```

### File Upload Zone
```css
border: 1.5px dashed #D1D5DB;
border-radius: 8px;
padding: 24px;
text-align: center;
background: #FAFAFA;
```

---

## Table

```css
table { width: 100%; border-collapse: collapse; }
th    { font-size: 11px; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.05em; padding: 8px 16px; border-bottom: 1px solid #E5E7EB; }
td    { font-size: 14px; color: #111827; padding: 12px 16px; border-bottom: 1px solid #F3F4F6; }
tr:hover td { background: #F9FAFB; }
```

---

## Modals

- Center-screen overlay with `rgba(0,0,0,0.4)` backdrop
- White panel, `border-radius: 16px`, max-width ~480px (forms) or 640px (view details)
- Close button: `×` top-right, `color: #9CA3AF`
- Footer: right-aligned button group (Cancel outlined + Confirm primary)
- Title: 18px 600 weight

---

## Toast / Success Notification

Center-screen floating card (not bottom-right):
```
┌──────────────────────┐
│   🎁  (gift icon)    │
│  Successfully Added  │
└──────────────────────┘
```
- White card, `border-radius: 16px`, subtle shadow
- Icon: green gift-box icon
- Text: 14px, centered

---

## Stat Cards (KPIs)

```
┌─────────────────────────┐
│  Label (12px gray)      │
│  Number (32px bold)     │
│  Δ Change label (12px)  │
└─────────────────────────┘
border-radius: 12px;
padding: 20px 24px;
background: white;
box-shadow: 0 1px 3px rgba(0,0,0,0.08);
```

---

## Pagination

```
← Previous   [1]  [2]  [...]  [13]  Next →
```
- Active page: green filled pill
- Others: outlined or text
- Ellipsis for long ranges

---

## Charts (Analytics Page)

- Bar chart: single green (`#1A5C32`) bars
- Line chart: dark green line with filled circular data points, light gray grid lines, no axes borders
- Donut chart (Orders by vehicle): green + cyan + amber + teal segments
- Font for axis labels: 11px gray
- No chart borders; white background card

---

## Iconography

- Style: Outline strokes, 20×20px, `stroke-width: 1.5px`
- Color: Matches nav text color (gray default, green when active)
- Source: Consistent with Heroicons / Lucide outline style
- Used for: all sidebar nav items, action buttons, form field prefixes
