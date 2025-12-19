import React from "react";
import { User, Calendar } from "lucide-react";
import type { Record } from "@/types/record";

interface RecordGridProps {
  records: Record[];
  onRecordClick: (record: Record) => void;
}

export const RecordGrid: React.FC<RecordGridProps> = ({ records, onRecordClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {records.map((record) => (
        <div
          key={record._id}
          onClick={() => onRecordClick(record)}
          className="group relative flex flex-col p-6 bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              {record.VisitorId?.profileImgUri ? (
                <img src={record.VisitorId.profileImgUri} alt={record.VisitorId.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg truncate">
                {record.VisitorId?.name || "Unknown"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {record.visitType}
              </p>
            </div>
          </div>

          <div className="mt-auto space-y-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-2 h-3 w-3" />
              {new Date(record.timeStamp).toLocaleDateString()}
            </div>
            {record.feedbackText && (
              <p className="text-sm text-muted-foreground line-clamp-2 italic">
                "{record.feedbackText}"
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
