import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import HomeScreen from "./pages/HomeScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
    children: [
        // Add other routes here
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
