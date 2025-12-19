import React from "react";
import { User } from "lucide-react";
import type { Record } from "@/types/record";

interface RecordListProps {
  records: Record[];
  onRecordClick: (record: Record) => void;
}

export const RecordList: React.FC<RecordListProps> = ({ records, onRecordClick }) => {
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
                Type
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Date
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Feedback
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {records.map((record) => (
              <tr
                key={record._id}
                onClick={() => onRecordClick(record)}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
              >
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                      {record.VisitorId?.profileImgUri ? (
                        <img src={record.VisitorId.profileImgUri} alt={record.VisitorId.name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className="font-medium">{record.VisitorId?.name || "Unknown"}</span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  {record.visitType}
                </td>
                <td className="p-4 align-middle">
                  {new Date(record.timeStamp).toLocaleDateString()}
                </td>
                <td className="p-4 align-middle max-w-xs truncate">
                  {record.feedbackText || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
