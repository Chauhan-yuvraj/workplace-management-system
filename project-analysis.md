# Project Analysis

## Overview
This is a monorepo project managed with TurboRepo, consisting of:
-   **Backend:** A Node.js/Express application using MongoDB (Mongoose).
-   **Web:** A React application built with Vite.
-   **Mobile:** A React Native/Expo application (briefly noted).
-   **Packages:** Shared packages like `@repo/types`.

## Backend (`apps/backend`)
-   **Framework:** Express.js
-   **Database:** MongoDB with Mongoose ODM.
-   **Authentication:** JWT-based auth with `bcrypt` for password hashing.
-   **Key Features (Routes):**
    -   `Auth`: Login/Register/Password management.
    -   `Employees`: CRUD for employees.
    -   `Visitors`: Visitor management.
    -   `Visits`: Tracking visitor check-ins/outs.
    -   `Records`: Historical data/logs.
    -   `Deliveries`: Package/delivery tracking.
-   **Structure:** Standard MVC-like structure (Controllers, Models, Routes, Services).

## Web Frontend (`apps/Web`)
-   **Framework:** React with Vite.
-   **State Management:** Redux Toolkit (`store/slices` matches backend features).
-   **Routing:** `react-router-dom` with a Dashboard layout structure.
-   **Styling:** Tailwind CSS.
-   **UI Components:** Radix UI primitives, Lucide icons.
-   **Key Pages:**
    -   Dashboard (Main view)
    -   Employees
    -   Visitors
    -   Visits
    -   Records
    -   Deliveries

## Shared (`packages/types`)
-   Contains shared TypeScript interfaces and enums (e.g., `UserRole`, `IEmployee`) to ensure consistency between frontend and backend.
