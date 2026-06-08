# Boardly

A project and task management application built with React and Supabase that helps users organize projects, manage tasks, track progress, and collaborate through a clean and responsive interface.

## 🚀 Live Demo

**Live Site:** https://boardly-project-management.vercel.app/

**GitHub Repository:** https://github.com/buildwithavinash/boardly-project-management

---

## 📖 About The Project

Boardly is a project management platform that allows users to create projects, manage tasks, update project information, and track work progress in one place.

The application implements authentication, protected routes, role-based access control, global state management using Context API, and a service-layer architecture for handling data operations.

---

## ✨ Features

### Authentication

* User Signup
* User Login
* Secure Logout
* Session Persistence
* Protected Routes

### Authorization

* Role-Based Access Control
* Admin Route Protection
* User Access Management

### Project Management

* Create Projects
* View Projects
* Edit Projects
* Delete Projects
* Project Filtering
* Project Details View

### Task Management

* Create Tasks
* Edit Tasks
* View Task Details
* Task Filtering
* Task Status Management

### User Profile

* Profile Page
* Profile Data Management

### User Experience

* Loading Skeletons
* Loading Indicators
* Toast Notifications
* Confirmation Modals
* Responsive Navigation
* Mobile-Friendly Interface

---

## 🛠 Tech Stack

### Frontend

* React
* React Router DOM
* Context API
* JavaScript (ES6+)
* CSS

### Backend & Database

* Supabase
* PostgreSQL

### Authentication

* Supabase Auth

---

## 🏗 Project Structure

```text
src/
│
├── components/
│   ├── AdminRoute
│   ├── ProtectedRoute
│   ├── Navbar
│   ├── BottomNav
│   ├── TaskCard
│   ├── TaskDetailModal
│   ├── ConfirmModal
│   ├── Toast
│   └── loaders/
│
├── context/
│   ├── AuthContext
│   ├── ProjectsContext
│   ├── TasksContext
│   ├── ToastContext
│   └── custom context hooks
│
├── pages/
│   ├── auth/
│   ├── projects/
│   ├── tasks/
│   ├── Dashboard
│   └── Profile
│
├── services/
│   ├── projectService
│   ├── taskService
│   └── profileService
│
├── lib/
│   └── Supabase Configuration
│
├── utils/
│   └── Formatting Utilities
│
└── App.jsx
```

---

## 🎯 Architecture & Design Patterns

### Context API State Management

The application uses dedicated contexts for:

* Authentication State
* Project State
* Task State
* Toast Notifications

This helps avoid prop drilling and keeps shared state centralized.

### Service Layer Pattern

All database interactions are separated into service files:

* projectService.js
* taskService.js
* profileService.js

This keeps UI components focused on presentation and user interactions.

### Route Protection Pattern

Protected routes ensure only authenticated users can access restricted pages.

Admin routes provide an additional authorization layer for privileged actions.

### Reusable Component Pattern

Reusable UI components are used across the application for consistency and maintainability.

---

## 📚 What I Learned

Through building Boardly, I gained practical experience with:

* React Application Architecture
* Context API State Management
* Authentication & Authorization
* Protected Routes
* CRUD Operations
* Supabase Integration
* Service Layer Architecture
* Component Reusability
* Form Handling
* Responsive UI Development

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/buildwithavinash/boardly-project-management
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Development Server

```bash
npm run dev
```

### Build For Production

```bash
npm run build
```

---

## 🔮 Future Improvements

* Custom React Hooks
* React Query Integration
* Dashboard Analytics
* Advanced Search & Filters
* Unit Testing
* Real-Time Updates
* Activity Tracking

---

## 👨‍💻 Author

**Avinash Prasad**

Frontend Developer focused on building scalable, maintainable, and user-friendly web applications using React and modern frontend technologies.
