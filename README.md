# 💰 Personal Expense Tracker

A modern full-stack web app to manage your personal finances with ease. Track income, monitor expenses, analyze spending trends, and stay on budget.

---

## 🚀 Tech Stack

- **Frontend Framework**: [Next.js 15+](https://nextjs.org/) (App Router, `/src` directory structure)
- **Backend**: Next.js API Routes (oRPC for typed API calls)
- **Language**: TypeScript
- **Package Manager**: Bun 
- **Database**: PostgreSQL via [NeonDB](https://neon.tech/) (recommended)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://github.com/hunghg255/better-auth)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: Tailwind CSS
- **Charts**: [Recharts](https://recharts.org/)
- **Hosting**: [Vercel](https://vercel.com/)

---

## ✅ Features

### Core
- User authentication (email/password)
- Add, edit, and delete transactions
- Transaction types: **Income** / **Expense**
- Categorization (e.g., Food, Transport, Entertainment)
- Dashboard with charts:
  - Expenses by category
  - Monthly trends

### Bonus
- Set monthly budgets and track usage
- Budget limit alerts
- Savings goals tracking
- CSV export for transactions
- Search and filter transactions
- Interactive data visualizations

---

## 🧑‍💻 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Florien2208/personal-expense-tracker.git.git
cd personal-expense-tracker

bun install
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
CORS_ORIGIN=http://localhost:3000


run by : bun dev
