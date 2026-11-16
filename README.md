# Bellmont — Restaurant Admin Panel

A staff console for a restaurant: reservations, a live floor plan and menu management in one place.

> 🚧 **Work in progress.** The app currently runs on mock data; a Node.js backend is being developed separately.

**Live demo:** [bellmont.vercel.app](https://restaurant-admin-five-tau.vercel.app/)

---

## Features

### Reservations

- 7-day day picker with booking counts per day
- Filter by status: pending, confirmed, seated, cancelled
- Create and edit reservations in a modal form with validation (a date or time in the past is rejected)
- Cancel with a confirmation dialog: cancelled bookings stay in history, just dimmed (soft delete)
- One-click "Seat" action and toast notifications for every change

### Floor plan

- Tables grouped by zone (Main hall / Terrace) with a zone switcher
- Color-coded table statuses with a live legend and counts
- Table shape reflects capacity: round 2-seaters, square 4-seaters, wide 6–8-seaters
- Each table shows its context: upcoming reservation, number of guests, and how long they have been seated (updates every minute)

### Menu

- Dishes filtered by category
- Availability toggle for each dish

---

## Tech stack

- **React 19** + **TypeScript** (strict mode)
- **Vite**
- **Tailwind CSS v4** with design tokens defined in `@theme`
- **React Router 7**
- **React Hook Form** + **Zod**: forms and schema validation
- **date-fns**: all date and time logic
- **react-hot-toast**, **lucide-react**
- ESLint + Prettier

---

## Technical highlights

- **Type-safe UI state with discriminated unions.** The reservation modal is one state value (`closed | create | edit | cancel`), so impossible combinations such as "closed but editing" can't be expressed. Tables use the same pattern: `guests` and `seatedAt` exist only on occupied tables, and TypeScript enforces it.
- **One form for create and edit.** The form maps the model to form values and back (`startsAt` ⇄ `date` + `time`) and keeps the original `id` when editing.
- **Schema validation with Zod.** Includes a cross-field `refine` that rejects reservations in the past and attaches the error to the time field.
- **Derived state over duplicated state.** Counters, filtered lists, a table's upcoming reservation and the time since seating are computed during render, not stored.
- **Custom hook `useNow`.** A shared ticking clock with proper interval cleanup, so "seated for N min" stays accurate without a timer in every card.
- **Reusable UI kit.** `Button`, `Badge`, `Card`, `FilterChip`, `Switch`, `FormField`, `ConfirmDialog`, a portal-based `Modal`, and a compound `Table` component with a generic `Table.Body<T>`.
- **Accessibility.** `aria-pressed` toggles, `aria-invalid` with `aria-describedby` on form errors, labelled dialogs via `useId`, Esc and overlay-click to close, focus on the safe action in destructive dialogs, and status shown as text, not color alone.

---

## Project structure

```
src/
├── components/      # Shared components (Modal, PageHeader)
│   └── ui/          # Reusable UI kit
├── features/        # Feature modules: constants, mock data, feature components
│   ├── floor/
│   ├── menu/
│   └── reservations/
├── hooks/           # Custom hooks (useNow)
├── layouts/         # App layout and sidebar
├── pages/           # Route-level pages
└── types/           # Shared domain types
```

## Roadmap

- [x] UI kit and design tokens
- [x] Menu: category filter, availability toggle
- [x] Reservations: create, edit, cancel, filters
- [x] Floor plan: zones, statuses, live table details
- [ ] Floor plan: table details panel and seating actions
- [ ] Table orders and bill
- [ ] Kitchen display
- [ ] Dashboard
- [ ] Login and role-based access (admin / waiter / kitchen)
- [ ] Connect the Node.js API with TanStack Query

---

## Author

**Olha**

- GitHub: [@Liv-O](https://github.com/Liv-O)
- LinkedIn: [https://www.linkedin.com/in/olha-shapoval-olha/]
