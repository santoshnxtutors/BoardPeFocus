# BoardPeFocus Admin Command Center

This is the central management interface for the BoardPeFocus platform, built with Next.js, Tailwind CSS, and Shadcn/UI primitives.

## 🚀 Key Features

### 1. Educators (Tutor Management)
- **Comprehensive Profiles**: Manage bio, tagline, experience, and verification status.
*   **Curriculum Mapping**: Link tutors to multiple boards (IB, IGCSE, CBSE) and subjects.
*   **Location Coverage**: Assign tutors to specific sectors and societies in Gurugram.
*   **Proof & Stats**: Manage achievement proofs and completeness scores.

### 2. CMS & Page Intelligence
- **Dynamic Page Control**: Preview and edit generated pages.
*   **SEO Metadata**: Full control over OG tags, canonical URLs, and indexability.
*   **Redirects**: Manage 301/302 redirects for SEO consistency.
*   **Internal Link Rules**: Automated internal linking based on keywords.

### 3. Operations & CRM
- **Leads Inbox**: Real-time tracking of parent inquiries with status pipelines.
*   **Media Library**: Centralized asset management with alt-text and linking.
*   **Audit Logs**: Full audibility of admin actions for security.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Shadcn/UI (Button, Card, Table, etc.)
- **Icons**: Lucide React
- **API**: Custom typed client linking to `@boardpefocus/types`

## 📂 File Structure
```
apps/admin/src/
├── app/
│   ├── (auth)/             # Login and authentication pages
│   └── (dashboard)/        # Main dashboard routes
│       ├── tutors/         # Tutor management (List, Create, Edit)
│       ├── leads/          # Inquiry inbox
│       ├── pages/          # CMS page management
│       ├── schools/        # Premium school profiles
│       └── media/          # Asset library
├── components/
│   ├── shared/             # Reusable domain components (DataTable, StatsCard)
│   └── ui/                 # Atomic UI primitives
└── lib/
    ├── api.ts              # Typed backend communication
    └── auth-context.tsx    # Session management
```

## ⚙️ Development

### Installation
```bash
pnpm install
```

### Run Locally
```bash
pnpm dev
```
The admin panel will be available at `http://localhost:3002`.

### Linking with Backend
Ensure `NEXT_PUBLIC_API_URL` in `.env` points to your running NestJS backend (default: `http://localhost:3001/api`).
