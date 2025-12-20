import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description?: string;
  trend?: string;
  trendUp?: boolean;
  alert?: boolean;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendUp,
  alert,
}: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl border shadow-sm p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon
          className={`h-4 w-4 ${
            alert ? "text-red-500" : "text-muted-foreground"
          }`}
        />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {trend && (
          <span
            className={`text-xs font-medium flex items-center ${
              trendUp ? "text-green-600" : "text-red-600"
            }`}
          >
            {trendUp ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {trend}
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}
