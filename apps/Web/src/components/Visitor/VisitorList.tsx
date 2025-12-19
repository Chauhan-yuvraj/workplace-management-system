import React from "react";
import { User, Star } from "lucide-react";
import type { Visitor } from "@/types/visitor";
import { cn } from "@/lib/utils";

interface VisitorListProps {
  visitors: Visitor[];
  onVisitorClick: (visitor: Visitor) => void;
}

export const VisitorList: React.FC<VisitorListProps> = ({ visitors, onVisitorClick }) => {
  return (
    <div className="rounded-md border bg-card">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Name
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Company
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Phone
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {visitors.map((visitor) => (
              <tr
                key={visitor._id}
                onClick={() => onVisitorClick(visitor)}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
              >
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                      {visitor.profileImgUri ? (
                        <img
                          src={visitor.profileImgUri}
                          alt={visitor.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium flex items-center gap-1">
                        {visitor.name}
                        {visitor.isVip && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                      </span>
                      <span className="text-xs text-muted-foreground">{visitor.email}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  {visitor.companyNameFallback || "-"}
                </td>
                <td className="p-4 align-middle">
                  {visitor.phone || "-"}
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                      visitor.isBlocked
                        ? "bg-red-50 text-red-700 ring-red-600/20"
                        : "bg-green-50 text-green-700 ring-green-600/20"
                    )}
                  >
                    {visitor.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
