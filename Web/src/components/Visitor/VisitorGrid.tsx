import React from "react";
import { User, Star, ShieldAlert } from "lucide-react";
import type { Visitor } from "@/types/visitor";
import { cn } from "@/lib/utils";

interface VisitorGridProps {
  visitors: Visitor[];
  onVisitorClick: (visitor: Visitor) => void;
}

export const VisitorGrid: React.FC<VisitorGridProps> = ({ visitors, onVisitorClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {visitors.map((visitor) => (
        <div
          key={visitor._id}
          onClick={() => onVisitorClick(visitor)}
          className={cn(
            "group relative flex flex-col items-center p-6 bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer",
            visitor.isBlocked && "border-red-200 bg-red-50/30"
          )}
        >
          {visitor.isVip && (
            <div className="absolute top-3 right-3">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </div>
          )}
          {visitor.isBlocked && (
            <div className="absolute top-3 left-3">
              <ShieldAlert className="h-5 w-5 text-red-500" />
            </div>
          )}
          <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4 overflow-hidden">
            {visitor.profileImgUri ? (
              <img
                src={visitor.profileImgUri}
                alt={visitor.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <h3 className="font-semibold text-lg text-center">
            {visitor.name}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-1">
            {visitor.companyNameFallback || "No Company"}
          </p>
          <span className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
            visitor.isBlocked 
              ? "border-transparent bg-red-100 text-red-700"
              : "border-transparent bg-secondary text-secondary-foreground"
          )}>
            {visitor.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
      ))}
    </div>
  );
};
