import { useEffect, useState } from "react";
import { LayoutGrid, List, Search, User, Calendar } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRecords, deleteRecord } from "@/store/slices/recordSlice";
import RecordDetailModal from "../../../components/Record/RecordDetailModal";
import type { Record } from "@/types/record";

export default function Records() {
  const dispatch = useAppDispatch();
  const { records, isLoading: loading } = useAppSelector((state) => state.records);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (records.length === 0) dispatch(fetchRecords());
  }, [dispatch, records.length]);

  const handleRecordClick = (record: Record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = async (recordId: string) => {
    await dispatch(deleteRecord(recordId));
    setIsModalOpen(false);
  };

  const filteredRecords = records.filter(
    (record) =>
      record &&
      (record.VisitorId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.visitType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.feedbackText?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Records</h1>
          <p className="text-muted-foreground">
            View past visit records and feedback.
          </p>
        </div>
      </div>

      <RecordDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
        onDelete={handleDeleteRecord}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center border rounded-md bg-background p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-sm transition-colors ${
              viewMode === "grid"
                ? "bg-secondary text-secondary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary/50"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-sm transition-colors ${
              viewMode === "list"
                ? "bg-secondary text-secondary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary/50"
            }`}
            title="List View"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRecords.map((record) => (
                <div
                  key={record._id}
                  onClick={() => handleRecordClick(record)}
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
          ) : (
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
                    {filteredRecords.map((record) => (
                      <tr
                        key={record._id}
                        onClick={() => handleRecordClick(record)}
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
          )}
        </>
      )}
    </div>
  );
}
