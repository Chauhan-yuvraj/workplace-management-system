import React from "react";
import { cn } from "@/lib/utils";

interface VisitStatusBadgeProps {
  status: string;
  className?: string;
}

export const VisitStatusBadge: React.FC<VisitStatusBadgeProps> = ({ status, className }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CHECKED_IN": return "bg-green-100 text-green-800";
      case "CHECKED_OUT": return "bg-gray-100 text-gray-800";
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      case "DECLINED": return "bg-red-100 text-red-800";
      case "MISSED": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={cn(`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(status)}`, className)}>
      {status.replace("_", " ")}
    </span>
  );
};
