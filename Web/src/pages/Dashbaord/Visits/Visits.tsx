import { useEffect, useState } from "react";
import { LayoutGrid, List, Search, Plus, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVisits, deleteVisit } from "@/store/slices/visitSlice";
import VisitModal from "../../../components/Visit/VisitModal";
import VisitProfileModal from "../../../components/Visit/VisitProfileModal";
import type { Visit } from "@/types/visit";

export default function Visits() {
  const dispatch = useAppDispatch();
  const { visits, isLoading: loading } = useAppSelector((state) => state.visits);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  useEffect(() => {
    if (visits.length === 0) dispatch(fetchVisits({}));
  }, [dispatch, visits.length]);

  const handleAddVisit = () => {
    setSelectedVisit(null);
    setIsModalOpen(true);
  };

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsProfileModalOpen(true);
  };

  const handleEditFromProfile = (visit: Visit) => {
    setIsProfileModalOpen(false);
    setSelectedVisit(visit);
    setIsModalOpen(true);
  };

  const handleDeleteVisit = async (visitId: string) => {
    await dispatch(deleteVisit(visitId));
    setIsProfileModalOpen(false);
  };

  const filteredVisits = visits.filter(
    (visit) =>
      visit &&
      (visit.visitor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.host.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.purpose?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visits</h1>
          <p className="text-muted-foreground">
            Schedule and manage visitor check-ins.
          </p>
        </div>
        <Button className="gap-2" onClick={handleAddVisit}>
          <Plus className="h-4 w-4" />
          Schedule Visit
        </Button>
      </div>

      <VisitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        visitToEdit={selectedVisit}
      />

      <VisitProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        visit={selectedVisit}
        onEdit={handleEditFromProfile}
        onDelete={handleDeleteVisit}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search visits..."
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
              {filteredVisits.map((visit) => (
                <div
                  key={visit._id}
                  onClick={() => handleVisitClick(visit)}
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
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(visit.status)}`}>
                      {visit.status}
                    </span>
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
                    {filteredVisits.map((visit) => (
                      <tr
                        key={visit._id}
                        onClick={() => handleVisitClick(visit)}
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
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(visit.status)}`}>
                            {visit.status.replace("_", " ")}
                          </span>
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
