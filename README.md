
# 🧪 LabTrack EDU

**LabTrack EDU** is a free, open-source laboratory management platform for schools, training labs, and education-focused biomedical environments.  
It helps students, trainees, and teachers organize reagents, equipment, protocols, and lab activities in a clean and efficient interface.

---

## 🚀 Tech Stack

- **Next.js 14** with App Router (TypeScript)
- **TailwindCSS** for styling
- **shadcn/ui** for accessible and modern UI components
- **PostgreSQL** for relational data
- **Prisma ORM** with Prisma Studio for database management
- **Optional Auth:** Role-based access (Admin, Teacher, Student)

---

## 🔧 Features

- **Reagent Management** – Inventory tracking, expiry warnings, batch numbers
- **Device Booking & Maintenance** – Schedule and monitor lab equipment usage
- **Protocol Manager** – Create, assign, and submit lab experiment templates
- **Sample Tracking** – Manage biological or chemical samples with location history
- **Dashboard Overview** – See what’s expiring, active, or pending at a glance
- **Dark Mode Support** – Clean layout optimized for lab environments

---

## 🛠 Local Development

### Prerequisites
- Node.js (v18+)
- PostgreSQL database
- pnpm (recommended) or npm

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/labtrack-edu.git
cd labtrack-edu
cp .env.example .env
pnpm install
npx prisma db push
npx prisma studio # Optional: open DB dashboard
pnpm dev
```

---

## 🧪 Sample Prisma Schema (Excerpt)

```prisma
model Reagent {
  id          String   @id @default(uuid())
  name        String
  quantity    Int
  unit        String
  expiryDate  DateTime
  location    String
  createdAt   DateTime @default(now())
}
```

---

## 📄 License

This project is [MIT licensed](LICENSE).

---

## ✨ Contributing

Pull requests are welcome! If you find a bug or have a feature request, feel free to open an issue.

---

> Built with ❤️ for science education.
