// router.ts
import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // Import your App layout
import Login from "./pages/Login";
import HomeScreen from "./pages/HomeScreen";
import Dashboard from "./pages/Dashbaord/Dashboard";
import Employees from "./pages/Dashbaord/Employees/Employees";
import DashboardLayout from "./components/layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App contains the <Outlet />
    children: [
      {
        path: "/", // Index route (Home)
        element: <HomeScreen />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "employees",
            element: <Employees />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
