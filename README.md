# PriorList — Your Tasks, Your Way

#### Video Demo: [Priorlist app video on youtube](https://youtu.be/pJ5lK6bn2y4)

#### Live Demo: [https://priorlist.vercel.app](https://priorlist.vercel.app)

> **Note on AI Assistance**
>
> This project was developed by me, but I used AI tools (including ChatGPT) as support for learning, debugging, and clarifying concepts throughout the process.  
> No part of the application was generated or implemented without my understanding; every line of code was fully written, reviewed, and adapted by me.  
> The AI assistance served only as guidance during development.

#### 📌 CS50 Final Project — 2025

---

## 📖 Overview

**Priolist** is a web application designed to help users organize their tasks in a simple, structured, and intuitive way. Created as the final project for **CS50**, it brings together good modern development practices, using technologies such as **React**, **Tailwind CSS v4.1**, **Supabase**, and solid frontend architecture concepts. It achieved scores above 90 on Google Chrome’s Lighthouse.

The application was developed as a **single-page application (SPA)**, ensuring a fluid experience with fast loading and smooth transitions. It includes full authentication, task CRUD, real-time search, sorting, archiving, and a friendly, accessible UI, being fully responsive on mobile devices.

---

- [🎯 Goal](#-goal)
- [🧱 Project Architecture](#-project-architecture)
- [⚙️ Features](#️-features)
- [🎨 Design Decisions](#-design-decisions)
- [📂 File Structure](#-file-structure)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚧 Challenges Faced](#-challenges-faced)
- [✔️ Conclusion](#️-conclusion)

---

## 🎯 Goal

The goal of Priorlist is to allow anyone to organize their daily routine in an efficient yet simple way. It was designed for people who may not be very comfortable with technology but still need practicality to manage their tasks. The interface prioritizes:

- simplicity
- instant feedback
- clear navigation
- efficiency in task operations

The application demonstrates practical mastery of the modern JavaScript ecosystem and the ability to structure a project in a clean, organized, and scalable way.

---

## 🧱 Project Architecture

The application was structured to be organized and effective, separating logic, components, contexts, and utilities.

```
src/
├── components/
├── contexts/
├── hooks/
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

### 🧩 Main Directories

| Directory       | Role                                                                          |
| --------------- | ----------------------------------------------------------------------------- |
| **components/** | Reusable components (buttons, modals, inputs, cards, page transitions, forms) |
| **contexts/**   | Global contexts, including AuthContext                                        |
| **hooks/**      | Custom hooks such as `useOutsideClick()`                                      |
| **pages/**      | All application pages                                                         |
| **utils/**      | Helper functions (sorting, validations)                                       |

---

## ⚙️ Features

### 🔐 Full Authentication

- Login
- Registration
- Logout
- Session persistence with Supabase
- Protected routes

### 📝 Task Management

- Create
- Edit
- Delete
- Archive
- Form validations
- Confirmation toasts for every action

### 🔎 Search & Sorting

- Real-time (case-insensitive) search
- Sort alphabetically
- Sort by date
- Sort by priority

### 📱 Responsive Interface

Built with **Tailwind CSS v4.1**, ensuring visual consistency across desktop and mobile.

### ✨ Extra Details

- Custom 404 page
- Dedicated page for deactivated accounts
- Smooth page transitions with animation
- Fully reusable components
- Minimalist design

---

## 🎨 Design Decisions

1. **SPA with React**

   - Instant navigation, better scalability, and simpler maintenance.

2. **Tailwind CSS v4.1**

   - Drastically reduces manual CSS
   - Works extremely well with React
   - Makes layout scaling easier

3. **Supabase**

   - Great solution for building a modern app with authentication and database without needing a custom backend.

4. **Feedback-oriented flow**

   - Every important action (create, delete, edit) triggers **toasts**, ensuring clear visual feedback.

5. **Frontend first**

   - Designing the entire interface and UX before connecting to Supabase helped validate the flow and reduce rework.

6. **Accessibility**
   - Elements with aria-labels, visible focus styles, and clear hierarchy of colors and sizes.

---

## 📂 File Structure

### `src/pages/Tasks.jsx`

Contains:

- task listing
- search bar
- sorting tools
- creation/edit modals
- toast feedback system

### `src/components/TaskList.jsx`

Displays each task with:

- title
- description
- date formatted as **MM/DD/YYYY**
- edit and delete buttons

### `src/contexts/AuthContext.jsx`

Responsible for:

- storing user session
- handling user data from Supabase
- providing login, logout, register, and deactivate functions

### `src/hooks/useTasks.jsx`

Responsible for:

- fetching tasks from Supabase
- guaranteeing persistent sorting inside the app
- creating, editing, deleting, and archiving tasks

### `src/utils/sortTasks.js`

Function that sorts tasks according to the user’s preference.

### `App.jsx`

Defines all routes:

- public
- protected
- fallback 404

---

## 🛠️ Technologies Used

- **React 18**
- **React Router**
- **Tailwind CSS v4.1**
- **Supabase**
- **Vite**
- **JavaScript (ES2023+)**
- **ESLint + Prettier**
- **Framer-motion**
- **Prop-types**

---

## 🚧 Challenges Faced

- **Managing complex form states** without generating uncontrolled inputs.
- **Sorting tasks** in a way that persisted in the UI without affecting the original order in the database (source of truth).
- **Implementing AuthContext** with Supabase listeners to update the session in real time.
- **Building a clean, responsive UI** with Tailwind v4.1 for the first time, considering how different it is from traditional CSS.
- **Achieving high Lighthouse scores**, optimizing accessibility, performance, and best practices.
- **Ensuring users had an effective way to detach from the app**, considering Supabase does not allow deleting users from the frontend.
- **Handling global loading and error states.**

---

## ✔️ Conclusion

Priorlist is not just a functional application — it represents all the learning gained by facing problems and searching for solutions. Not only dealing with code, but with architecture, design, decision-making, scalability, and organization.

Working through the entire development process made it clear how deep software building really is, no matter how simple the project may seem — and how big the difference is between something that works and something well-made.

Priorlist is more than just a piece of software: it’s a journey of mistakes and successes, questions and answers, and, above all, learning.
