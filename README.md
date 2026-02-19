# Himalaya Agro Project

A comprehensive platform for Himalaya Agro, featuring a customer-facing frontend, a robust backend API, and a powerful admin dashboard.

## 📁 Project Structure

```text
himalaya/
├── admin/            # Admin Panel (React + Vite + Tailwind)
├── backend/          # REST API (Node.js + Express + MongoDB)
├── frontend/         # Main Website (React + Vite + Tailwind)
├── package.json      # Root configuration for npm workspaces
└── .gitignore        # Global git ignore rules
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB

### Installation

From the root directory, run:

```bash
npm install
```

This will install dependencies for all workspaces (frontend, backend, admin).

### Development

To run all services concurrently:

```bash
npm run dev
```

Or run them individually:

```bash
npm run dev:frontend
npm run dev:backend
npm run dev:admin
```

## 🛠 Tech Stack

- **Frontend/Admin**: React, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts.
- **Backend**: Node.js, Express, Mongoose, JWT, Cloudinary, Multer.
- **Database**: MongoDB.
