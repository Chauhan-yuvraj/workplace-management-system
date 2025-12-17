import { useEffect, useState } from "react";
import { LayoutGrid, List, Search, Plus, User, Star, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVisitors, deleteVisitor } from "@/store/slices/visitorSlice";
import VisitorModal from "../../../components/Visitor/VisitorModal";
import VisitorProfileModal from "../../../components/Visitor/VisitorProfileModal";
import type { Visitor } from "@/types/visitor";

export default function Visitors() {
  const dispatch = useAppDispatch();
  const { visitors, isLoading: loading } = useAppSelector(
    (state) => state.visitors
  );

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  useEffect(() => {
    if (visitors.length === 0) dispatch(fetchVisitors());
  }, [dispatch, visitors.length]);

  const handleAddVisitor = () => {
    setSelectedVisitor(null);
    setIsModalOpen(true);
  };

  const handleVisitorClick = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setIsProfileModalOpen(true);
  };

  const handleEditFromProfile = (visitor: Visitor) => {
    setIsProfileModalOpen(false);
    setSelectedVisitor(visitor);
    setIsModalOpen(true);
  };

  const handleDeleteVisitor = async (visitorId: string) => {
    await dispatch(deleteVisitor(visitorId));
    setIsProfileModalOpen(false);
  };

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor &&
      (visitor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.companyNameFallback?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visitors</h1>
          <p className="text-muted-foreground">
            Manage visitors, VIPs, and blocked guests.
          </p>
        </div>
        <Button className="gap-2" onClick={handleAddVisitor}>
          <Plus className="h-4 w-4" />
          Add Visitor
        </Button>
      </div>

      <VisitorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        visitorToEdit={selectedVisitor}
      />

      <VisitorProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        visitor={selectedVisitor}
        onEdit={handleEditFromProfile}
        onDelete={handleDeleteVisitor}
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search visitors..."
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
              {filteredVisitors.map((visitor) => (
                <div
                  key={visitor._id}
                  onClick={() => handleVisitorClick(visitor)}
                  className={`group relative flex flex-col items-center p-6 bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    visitor.isBlocked ? "border-red-200 bg-red-50/30" : ""
                  }`}
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
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                    visitor.isBlocked 
                      ? "border-transparent bg-red-100 text-red-700"
                      : "border-transparent bg-secondary text-secondary-foreground"
                  }`}>
                    {visitor.isBlocked ? "Blocked" : "Active"}
                  </span>
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
                    {filteredVisitors.map((visitor) => (
                      <tr
                        key={visitor._id}
                        onClick={() => handleVisitorClick(visitor)}
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
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              visitor.isBlocked
                                ? "bg-red-50 text-red-700 ring-red-600/20"
                                : "bg-green-50 text-green-700 ring-green-600/20"
                            }`}
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
          )}
        </>
      )}
    </div>
  );
}
