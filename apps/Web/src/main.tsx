import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { setupInterceptors } from "./services/api";
import { logout, refreshSuccess } from "./store/slices/authSlice";

setupInterceptors(store, { logout, refreshSuccess });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
