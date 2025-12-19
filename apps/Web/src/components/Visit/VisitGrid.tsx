import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import type { Visit } from "@/types/visit";
import { VisitStatusBadge } from "./VisitStatusBadge";

interface VisitGridProps {
  visits: Visit[];
  onVisitClick: (visit: Visit) => void;
}

export const VisitGrid: React.FC<VisitGridProps> = ({ visits, onVisitClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {visits.map((visit) => (
        <div
          key={visit._id}
          onClick={() => onVisitClick(visit)}
          className="group relative flex flex-col p-6 bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="h-10 w-10 rounded-full ring-2 ring-background bg-secondary flex items-center justify-center overflow-hidden">
                {visit.visitor.profileImgUri ? (
                  <img src={visit.visitor.profileImgUri} alt={visit.visitor.name} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="h-10 w-10 rounded-full ring-2 ring-background bg-secondary flex items-center justify-center overflow-hidden">
                {visit.host.profileImgUri ? (
                  <img src={visit.host.profileImgUri} alt={visit.host.name} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
            <VisitStatusBadge status={visit.status} />
          </div>
          
          <h3 className="font-semibold text-lg mb-1 truncate">
            {visit.visitor.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Meeting with {visit.host.name}
          </p>

          <div className="mt-auto space-y-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-2 h-3 w-3" />
              {new Date(visit.scheduledCheckIn).toLocaleDateString()}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-2 h-3 w-3" />
              {new Date(visit.scheduledCheckIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
