# Workplace Management System

A comprehensive full-stack solution for managing workplace operations, including visitor management, employee administration, and digital feedback collection. This monorepo contains the backend API, a mobile application for kiosks, and a web-based admin dashboard.

## 🚀 Project Structure

This project is a monorepo managed by [TurboRepo](https://turbo.build/) and [pnpm](https://pnpm.io/).

```text
.
├── apps/
│   ├── backend/    # Express.js API server with MongoDB
│   ├── Mobile/     # React Native (Expo) app for tablets/kiosks
│   └── Web/        # React (Vite) admin dashboard
└── packages/
    ├── types/      # Shared TypeScript interfaces and types
    ├── ui/         # Shared UI components
    └── ...         # Shared configurations (eslint, typescript)
```

## 🛠 Tech Stack

### Backend (`apps/backend`)
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB (Mongoose)
-   **Language:** TypeScript
-   **Authentication:** JWT, bcrypt
-   **Storage:** Cloudinary (for images)

### Mobile (`apps/Mobile`)
-   **Framework:** React Native (Expo)
-   **Styling:** NativeWind (Tailwind CSS)
-   **State Management:** Redux Toolkit
-   **Graphics:** React Native Skia (for signatures & drawing)
-   **Navigation:** Expo Router

### Web (`apps/Web`)
-   **Framework:** React (Vite)
-   **Styling:** Tailwind CSS
-   **State Management:** Redux Toolkit
-   **Routing:** React Router DOM
-   **Charts:** Recharts

## 📋 Prerequisites

-   Node.js (>= 18)
-   pnpm (`npm install -g pnpm`)
-   MongoDB (Local or Atlas)
-   Cloudinary Account

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd workplace-management-system
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Configuration:**
    Create `.env` files in the respective app directories based on their requirements.

    *   **Backend (`apps/backend/.env`):**
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        CLOUDINARY_CLOUD_NAME=...
        CLOUDINARY_API_KEY=...
        CLOUDINARY_API_SECRET=...
        ```

    *   **Mobile (`apps/Mobile/.env`):**
        ```env
        EXPO_PUBLIC_API_URL=http://<your-ip>:5000/api
        ```

    *   **Web (`apps/Web/.env`):**
        ```env
        VITE_API_URL=http://localhost:5000/api
        ```

## 🚀 Running the Project

You can run the entire monorepo or individual applications.

### Run All Apps (Development Mode)
```bash
pnpm dev
```
This command uses TurboRepo to start the backend, web, and mobile apps concurrently.

### Run Individual Apps

*   **Backend:**
    ```bash
    cd apps/backend
    pnpm dev
    ```

*   **Mobile:**
    ```bash
    cd apps/Mobile
    pnpm start
    ```
    *Press `a` for Android, `i` for iOS, or `w` for Web.*

*   **Web:**
    ```bash
    cd apps/Web
    pnpm dev
    ```

## ✨ Key Features

*   **Visitor Management:** Digital check-in/out for guests.
*   **Employee Directory:** Manage employee records and roles.
*   **Digital Feedback:** Collect feedback with signatures and drawings using the mobile kiosk.
*   **Role-Based Access:** Secure access for Employees, HR, Admins, and Executives.
*   **Real-time Updates:** Instant data synchronization across platforms.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
