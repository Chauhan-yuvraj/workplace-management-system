import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/constants/dashboard/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/authSlice";
import { useEffect } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    console.log("User role in Sidebar:", role);
  }, [role]);

  return (
    <>
      {/* Desktop sidebar - always visible */}
      <div className="hidden lg:flex w-64 bg-background border-r border-border flex-col h-screen sticky top-0">
        <div className="p-6 flex flex-col items-center gap-2">
          {/* Placeholder for Logo */}
          <div className="">
            <img src="/icon.png" alt="Logo" className="w-16" />
          </div>
          <span className="font-bold text-xl">Abhyuday Bharat</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {role && sidebarItems.filter((item) => item.roles.includes(role))
            .map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/dashboard"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile sidebar - overlay */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col items-center gap-2">
          {/* Placeholder for Logo */}
          <div className="">
            <img src="/icon.png" alt="Logo" className="w-16" />
          </div>
          <span className="font-bold text-xl">Abhyuday Bharat</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {role && sidebarItems.filter((item) => item.roles.includes(role))
            .map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => {
              handleLogout();
              onClose?.();
            }}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
