# Nickwal Studios — Premium Creative Studio Website

Full-stack website built with Next.js 16, Prisma 7 (SQLite), and Tailwind CSS 4.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: SQLite via Prisma 7 + better-sqlite3 adapter
- **Auth**: NextAuth.js (Credentials)
- **Animations**: Framer Motion
- **Fonts**: Space Grotesk (headings), Inter (body)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run database migration
npx prisma migrate dev --name init

# 3. Generate Prisma client
npx prisma generate

# 4. Seed the database
npx prisma db seed

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

- URL: `/admin/login`
- Email: `admin@nickwalstudios.com`
- Password: `Admin@123456`

## Project Structure

```
app/
├── page.tsx                    # Home page (all sections)
├── (public)/                   # Public pages with header/footer
│   ├── services/
│   ├── work/
│   ├── contact/
│   ├── about/
│   ├── privacy-policy/
│   ├── terms/
│   ├── disclaimer/
│   └── refund-policy/
├── admin/
│   ├── login/
│   └── (dashboard)/           # Protected admin pages
│       ├── settings/
│       ├── design/
│       ├── branding/
│       ├── hero/
│       ├── services/
│       ├── portfolio/
│       ├── case-studies/
│       ├── leads/
│       ├── pages/
│       ├── media/
│       └── backup/
├── api/
│   ├── auth/[...nextauth]/
│   ├── leads/
│   ├── upload/
│   └── admin/                 # Protected API routes
│       ├── settings/
│       ├── design/
│       ├── branding/
│       ├── hero/
│       ├── services/
│       ├── portfolio/
│       ├── case-studies/
│       ├── leads/
│       ├── media/
│       ├── pages/
│       └── backup/
components/
├── layout/Header.tsx
├── layout/Footer.tsx
├── admin/Sidebar.tsx
├── admin/AdminGuard.tsx
├── Providers.tsx
└── ui/Toast.tsx
lib/
├── prisma.ts
├── auth.ts
└── utils.ts
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@nickwalstudios.com"
ADMIN_PASSWORD="Admin@123456"
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database |
| `npm run db:reset` | Reset database |
| `npm run db:studio` | Open Prisma Studio |

## Design System

- Background: `#050505`
- Accent (Gold): `#c9a84c`
- Red (Logo): `#d42b2b`
- Text: `#ffffff`
- Muted: `#999999`

## Deployment

For production, change the database from SQLite to PostgreSQL:
1. Update `prisma/schema.prisma` provider to `postgresql`
2. Update `prisma.config.ts` datasource URL
3. Swap adapter to `@prisma/adapter-pg` or compatible
4. Run migrations on production database
