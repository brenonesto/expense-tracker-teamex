# Expense Tracker

A minimal, modern expense tracking dashboard built with React, TypeScript and Vite. It lets you quickly log income and expenses, filter by category and date, and see a concise financial summary.

## Features

- **Dashboard summary**: See total income, total expenses and current balance at a glance.
- **Add & edit transactions**: Create or update transactions using a clean modal dialog.
- **Filtering**: Filter transactions by **category** and **date range**.
- **Paginated table**: Browse your transactions with a paginated table and colored rows for income vs. expenses.
- **Client‑side data**: Uses in-memory seeded data; no backend or database required.
- **Modern UI**: Built with Tailwind CSS, Radix UI primitives and Lucide icons.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build tool**: Vite
- **Styling**: Tailwind CSS
- **UI primitives**: Radix UI-based components
- **Icons**: `lucide-react`

## Getting Started

### Prerequisites

- Node.js **18+** (recommended)
- A package manager: **pnpm** (preferred), **npm** or **yarn**

### Install dependencies

Using **pnpm** (recommended):

```bash
pnpm install
```

Using **npm**:

```bash
npm install
```

### Run the app in development

```bash
pnpm dev
```

Then open `http://localhost:5173` in your browser (Vite’s default dev server port).

### Build for production

```bash
pnpm build
```

### Preview the production build

```bash
pnpm preview
```

This will serve the built app locally so you can test the production build.

---
