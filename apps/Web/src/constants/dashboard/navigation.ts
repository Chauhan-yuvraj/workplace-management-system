// src/constants/navigation.ts
import {
  LayoutGrid,
  Users,
  Send,
  UserRoundPen,
  Package,
  FileText,
} from "lucide-react";

export const sidebarItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard", roles: ['admin', 'hr', 'executive'] },
  { icon: UserRoundPen, label: "Employees", href: "/dashboard/employees", roles: ['admin', 'hr', 'executive'] },
  { icon: Users, label: "Visitors", href: "/dashboard/visitors", roles: ['admin', 'hr', 'executive'] },
  { icon: Send, label: "Visits", href: "/dashboard/visits", roles: ['admin', 'hr', 'executive'] },
  { icon: FileText, label: "Records", href: "/dashboard/records", roles: ['admin', 'hr', 'executive'] },
  { icon: Package, label: "Deliveries", href: "/dashboard/deliveries", roles: ['admin', 'hr', 'executive'] },
] as const;
