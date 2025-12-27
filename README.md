

# 🛠️ GearGuard – The Ultimate Maintenance Tracker

**GearGuard** is a full-stack **maintenance management system** inspired by Odoo-like workflows.
It helps organizations track **equipment**, manage **maintenance teams**, and handle **maintenance requests** efficiently through a modern, role-based system.

Built for a **hackathon**, GearGuard demonstrates clean architecture, real-world business logic, and scalable design.

---

## 🚀 Problem Statement

Organizations often struggle to:

* Track equipment across departments and employees
* Assign the right maintenance teams and technicians
* Manage breakdowns vs preventive maintenance
* Monitor request status and technician workload

**GearGuard solves this by seamlessly connecting:**

> **Equipment → Teams → Maintenance Requests**

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* Secure **JWT authentication** using HTTP-only cookies
* Role-based access control:

  * **ADMIN**
  * **MANAGER**
  * **TECHNICIAN**
   * **USER**

---

### 🧑‍🤝‍🧑 Teams Management

* Create and manage specialized maintenance teams
* Assign technicians to teams
* Restrict request handling to relevant teams

---

### 🏭 Equipment Management

* Centralized registry of company assets
* Track equipment by:

  * Department
  * Employee
* Assign default maintenance team and technician
* Equipment categories for structured reporting

---

### 🧾 Maintenance Requests (Core Module)

Supports **two maintenance workflows**:

#### 🔧 Corrective Maintenance (Breakdown)

1. User creates a request
2. Equipment auto-fills:

   * Category
   * Maintenance team
3. Request starts in **NEW**
4. Assigned technician picks it up
5. Progress moves to **IN_PROGRESS**
6. Completion moves to **REPAIRED**

#### 📅 Preventive Maintenance (Routine Check)

* Scheduled in advance by managers
* Appears in calendar view
* Helps technicians plan upcoming work

---

### 📊 Request Lifecycle (Kanban)

* **NEW → IN_PROGRESS → REPAIRED → SCRAP**
* Drag-and-drop friendly structure (frontend ready)
* Priority levels:

  * LOW
  * MEDIUM
  * HIGH

---

### 🧠 Smart Business Logic

* Auto-assignment based on equipment
* Team-based request visibility
* Scrap stage logically marks equipment unusable
* Tracks duration, scheduling, and assignment

---

## 🧩 Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **PostgreSQL**
* **JWT Authentication**
* **Cookie-based sessions**

### Frontend

* **Next.js (App Router)**
* **TypeScript**
* **Role-based routing**
* **Protected dashboard views**

---

## 📁 Project Structure

```
ODOO/
├── backend/
│   ├── src/
│   │   ├── lib/            # Shared utilities (Prisma client)
│   │   ├── middleware/     # Auth & role guards
│   │   ├── models/         # Prisma setup
│   │   ├── routes/         # API routes
│   │   ├── app.js          # Express app
│   │   └── server.js       # Server entry point
│   ├── prisma/schema.prisma
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/      # Role-based dashboards
│   │   ├── login/
│   │   ├── signup/
│   │   └── forget-password/
│   ├── components/
│   ├── lib/
│   └── package.json
```

---

## 🧠 Database Design (Prisma)

### Core Models

* **User**
* **Team**
* **Equipment**
* **EquipmentCategory**
* **MaintenanceRequest**

### Enums

* `Role` → ADMIN | MANAGER | TECHNICIAN | USER
* `MaintenanceType` → CORRECTIVE | PREVENTIVE
* `RequestStage` → NEW | IN_PROGRESS | REPAIRED | SCRAP
* `Priority` → LOW | MEDIUM | HIGH

Designed for **scalability and reporting**.

---

## 🔗 API Overview

### Auth

```
POST   /auth/signup
POST   /auth/login
POST   /auth/logout
```

### Teams

```
POST   /teams
GET    /teams
PATCH  /teams/:id
DELETE /teams/:id
```

### Users

```
GET    /users
GET    /users/:id
```

### Equipment

```
POST   /api/equipments
GET    /api/equipments
PUT    /api/equipments/:id
DELETE /api/equipments/:id
```

### Maintenance Requests

```
POST   /maintenance-requests
GET    /maintenance-requests
PATCH  /maintenance-requests/:id/stage
```

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/gearguard
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

---

## ▶️ Running the Project

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🏆 Hackathon Highlights

* Clean **Odoo-inspired architecture**
* Real-world maintenance workflows
* Role-based security
* Scalable Prisma data model
* Clear separation of concerns
* Ready for analytics, calendar, and reporting extensions

---

## 🔮 Future Enhancements

* Analytics & pivot reports
* Notifications (email / in-app)
* Equipment usage history
* SLA & overdue indicators
* AI Integration & Automation

---

## 👨‍💻 Team

Built with ❤️ during a hackathon to demonstrate **enterprise-grade maintenance management**.

> **GearGuard – Keep your assets running. Always.**

---



