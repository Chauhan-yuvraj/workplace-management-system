import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
