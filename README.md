# Hierarchy of Visionaries — Website

> Where Great Stories Find Their Stage

A crowdfunding platform built with **Next.js 14** (App Router) that lets creators launch campaigns and backers discover & donate to projects they believe in. Includes a full user dashboard with role-based views (Creator / Backer), real-time notifications, Stripe-powered donations, and rich campaign management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI Library | React 18 |
| Styling | Tailwind CSS 3 + tailwind-merge + tailwindcss-animate |
| Component Library | shadcn/ui (Radix primitives) |
| Authentication | NextAuth.js v4 (credentials provider) |
| State Management | Zustand |
| Data Fetching | TanStack React Query v5 |
| Tables | TanStack React Table v8 |
| Forms | React Hook Form + Zod validation |
| Rich Text Editor | Tiptap |
| HTTP Client | Axios |
| Charts | Recharts |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Date Utilities | date-fns |
| Carousel | Embla Carousel |
| PDF Generation | jsPDF |
| Real-time | Socket.io Client |
| Notifications/Toasts | Sonner |
| Font | Manrope (Google Fonts via next/font) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, register, forgot-password flows
│   ├── (website)/           # Public pages (home, campaigns, about, etc.)
│   ├── api/                 # NextAuth API route
│   ├── dashboard/
│   │   ├── (backer)/        # Backer-specific pages (discover, my-donations, etc.)
│   │   ├── (creator)/       # Creator-specific pages (my-campaigns, analytics)
│   │   └── (shared)/        # Shared pages (overview, settings, notifications)
│   ├── donation-success/    # Post-payment success page
│   └── donation-failed/     # Post-payment failure page
├── components/
│   ├── ui/                  # shadcn/ui components (26 components)
│   ├── shared/              # Shared components (Navbar, Footer, etc.)
│   ├── dashboard/           # Dashboard layout components (Sidebar)
│   ├── modals/              # Modal components
│   ├── providers/           # AuthProvider, AppProvider, NotificationProvider
│   └── utils/               # Utility components
└── lib/                     # Utility functions
```

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=         # Backend API base URL
NEXTAUTH_SECRET=             # NextAuth secret key
NEXTAUTH_URL=                # App URL for NextAuth
NEXT_PUBLIC_STRIPE_KEY=      # Stripe publishable key
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
