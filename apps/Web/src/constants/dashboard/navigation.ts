// src/constants/navigation.ts
import {
  LayoutGrid,
  Users,
  Send,
  PieChart,
  UserRoundPen,
  Package,
  FileText,
} from "lucide-react";

export const sidebarItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: UserRoundPen, label: "Employees", href: "/dashboard/employees" },
  { icon: Users, label: "Visitors", href: "/dashboard/visitors" },
  { icon: Send, label: "Visits", href: "/dashboard/visits" },
  { icon: FileText, label: "Records", href: "/dashboard/records" },
  { icon: Package, label: "Deliveries", href: "/dashboard/deliveries" },
  { icon: PieChart, label: "Analytics", href: "/dashboard/analytics" },
] as const;
