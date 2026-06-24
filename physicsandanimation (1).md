# BM Delivery — Physics & Animation Spec

Inferred from the delivered screens. These are the motion behaviors that should be implemented to match the design intent. Screens are static PNGs so timings are recommendations based on the UI complexity, not pixel-extracted values.

---

## Guiding Principles

- **Functional, not decorative.** Every animation communicates state change, hierarchy, or directional context.
- **Fast and confident.** Operations feel instant at ≤150ms; confirmations feel satisfying at ≤300ms.
- **Consistent easing.** Default to `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for transitions.
- **No looping ambient animations** — this is an operational dashboard, not a marketing page.

---

## Easing Tokens

```css
--ease-enter:     cubic-bezier(0.0, 0.0, 0.2, 1);   /* decelerate-in: elements coming to rest */
--ease-exit:      cubic-bezier(0.4, 0.0, 1.0, 1);   /* accelerate-out: elements leaving */
--ease-standard:  cubic-bezier(0.4, 0.0, 0.2, 1);   /* general transitions */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* slight overshoot for confirmations */
```

---

## Duration Tokens

```css
--dur-instant:    80ms;   /* hover states, checkbox ticks */
--dur-fast:       150ms;  /* button press feedback, badge color swap */
--dur-normal:     220ms;  /* modal open/close, dropdown reveal */
--dur-slow:       320ms;  /* page transitions, slide-in panels */
--dur-confirm:    280ms;  /* success toast entrance */
```

---

## Component-Level Specs

### 1. Sidebar Navigation

**Nav item hover**
```
Property:  background-color, color
Duration:  --dur-instant (80ms)
Easing:    ease
```

**Active item selection** (clicking a nav item)
```
Property:  background-color slide + left border accent
Duration:  --dur-fast (150ms)
Easing:    --ease-standard
```
The green background fills in from left to right (or use opacity fade-in).

---

### 2. Modals

**Open (enter)**
```
Initial:   opacity: 0, transform: scale(0.95) translateY(-8px)
Final:     opacity: 1, transform: scale(1) translateY(0)
Duration:  --dur-normal (220ms)
Easing:    --ease-enter
```

**Overlay backdrop**
```
Property:  opacity 0 → 0.4
Duration:  --dur-normal (220ms)
Easing:    ease
```

**Close (exit)**
```
Property:  opacity 1 → 0, scale(1) → scale(0.95)
Duration:  --dur-fast (150ms)
Easing:    --ease-exit
```

**Multi-step modal (Create New Order — Step 1 → Step 2)**
```
Step content transition: slide left
Transform: translateX(0) → translateX(-100%) (step 1 exits left)
           translateX(100%) → translateX(0)  (step 2 enters from right)
Duration:  --dur-normal (220ms)
Easing:    --ease-standard
```

---

### 3. Success Toast Notification

"Successfully Driver Approved" / "Successfully Corporate Added"

**Enter**
```
Initial:   opacity: 0, transform: scale(0.85)
Final:     opacity: 1, transform: scale(1)
Duration:  --dur-confirm (280ms)
Easing:    --ease-spring   ← slight bounce reinforces success feeling
```

**Auto-dismiss (hold + exit)**
```
Hold:      1800ms
Exit:      opacity 1 → 0, transform: scale(0.95)
Duration:  200ms
Easing:    ease-in
```

---

### 4. Toggle Switches (Settings page)

```
Knob translate:  0px → 20px (off → on)
Track color:     gray → green (#1A5C32)
Duration:        --dur-fast (150ms)
Easing:          --ease-standard
```

---

### 5. Status Badges

When a status changes (e.g. Pending → Approved after clicking Approve button):

```
Property:  background-color, color, text content
Approach:  crossfade (opacity 0→1 on new badge over 150ms)
Duration:  --dur-fast (150ms)
```

---

### 6. Buttons

**Hover**
```
Property:  background-color (darken 8%)
Duration:  --dur-instant (80ms)
```

**Active / Press**
```
Property:  transform: scale(0.97)
Duration:  80ms
Easing:    ease
```

**Disabled state transition**
```
Property:  opacity 1 → 0.5
Duration:  --dur-instant
```

---

### 7. Table Row Hover

```
Property:  background-color transparent → #F9FAFB
Duration:  --dur-instant (80ms)
Easing:    ease
```

---

### 8. Dropdown Menus (Status filter, Vehicle type, etc.)

**Open**
```
Initial:   opacity: 0, transform: translateY(-4px) scaleY(0.96)
Final:     opacity: 1, transform: translateY(0) scaleY(1)
Duration:  --dur-fast (150ms)
Easing:    --ease-enter
Transform-origin: top center
```

**Close**
```
Duration:  100ms
Easing:    ease-in
```

---

### 9. Tab Switching (Ecommerce sub-tabs, Vehicle modal tabs, Corporate modal tabs)

```
Active tab pill slide:
  Underline / background slides from previous tab to new tab.
  Duration: --dur-fast (150ms)
  Easing: --ease-standard

Content transition:
  Outgoing: opacity 1 → 0, 80ms ease-in
  Incoming: opacity 0 → 1, 150ms ease-out (delayed 80ms)
```

---

### 10. Delivery Live Timeline (Deliveries Monitor detail modal)

The live timeline dots show order progression steps (Order placed → Rider assigned → Package picked up → In transit → Delivered).

**Completed step dot pulse** (for the current "In transit" step)
```css
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(26, 92, 50, 0.4); }
  70%  { box-shadow: 0 0 0 8px rgba(26, 92, 50, 0); }
  100% { box-shadow: 0 0 0 0 rgba(26, 92, 50, 0); }
}
animation: pulse-ring 1.8s ease-out infinite;
```

---

### 11. Live Map (Live Map page)

**Rider dot position updates**
```
Property:  top, left (CSS absolute position)
Duration:  800ms
Easing:    linear  ← simulates constant movement
```

**Rider dot tooltip on hover**
```
Enter: opacity 0 → 1, translateY(-4px) → translateY(0)
Duration: 120ms ease-out
```

**Rider status dot color swap** (Available → On delivery)
```
Property:  background-color
Duration:  300ms ease
```

---

### 12. Analytics Charts

**Initial render (bar chart bars)**
```css
@keyframes bar-grow {
  from { transform: scaleY(0); transform-origin: bottom; }
  to   { transform: scaleY(1); }
}
/* Staggered: each bar delays by 40ms × index */
animation: bar-grow 400ms --ease-enter forwards;
animation-delay: calc(var(--bar-index) * 40ms);
```

**Line chart line draw**
```css
@keyframes draw-line {
  from { stroke-dashoffset: var(--path-length); }
  to   { stroke-dashoffset: 0; }
}
animation: draw-line 600ms --ease-enter forwards;
```

---

### 13. Page / Route Transitions

When navigating between sidebar sections:

```
Exit page:   opacity 1 → 0, translateX(0) → translateX(-8px)
Enter page:  opacity 0 → 1, translateX(8px) → translateX(0)
Duration:    --dur-slow (320ms)
Easing:      --ease-standard
Overlap:     exit and enter animate simultaneously (cross-fade)
```

---

### 14. Pagination

**Page number click**
```
Active pill:  background slides / crossfades from old to new
Duration:     --dur-fast (150ms)
```

---

### 15. Progress Bar (Dispatch Cards)

The delivery progress bar in Dispatcher Control Center cards shows route progress as a horizontal fill.

```
Property:  width (0% → actual%)
Duration:  500ms on mount
Easing:    --ease-enter
```

When status updates (Pending → Assigned → In Transit → Delivered), the fill advances:
```
Width increment: animate to new value
Duration: 600ms ease-in-out
```

---

## Reduced Motion

All animations must respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

For the live map, reduce to instant position jumps with no interpolation.
