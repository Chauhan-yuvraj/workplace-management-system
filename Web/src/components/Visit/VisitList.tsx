import React from "react";
import { User } from "lucide-react";
import type { Visit } from "@/types/visit";
import { VisitStatusBadge } from "./VisitStatusBadge";

interface VisitListProps {
  visits: Visit[];
  onVisitClick: (visit: Visit) => void;
}

export const VisitList: React.FC<VisitListProps> = ({ visits, onVisitClick }) => {
  return (
    <div className="rounded-md border bg-card">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Visitor
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Host
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Date & Time
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {visits.map((visit) => (
              <tr
                key={visit._id}
                onClick={() => onVisitClick(visit)}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
              >
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                      {visit.visitor.profileImgUri ? (
                        <img src={visit.visitor.profileImgUri} alt={visit.visitor.name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className="font-medium">{visit.visitor.name}</span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                      {visit.host.profileImgUri ? (
                        <img src={visit.host.profileImgUri} alt={visit.host.name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className="font-medium">{visit.host.name}</span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex flex-col">
                    <span>{new Date(visit.scheduledCheckIn).toLocaleDateString()}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(visit.scheduledCheckIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <VisitStatusBadge status={visit.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
