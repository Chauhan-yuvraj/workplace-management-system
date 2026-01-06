import { useNavigate } from "react-router-dom"; 
import { useVisits } from "@/hooks/useVisits";
import VisitProfileModal from "@/components/Visit/VisitProfileModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageControls } from "@/components/ui/PageControls";
import { VisitGrid } from "@/components/Visit/VisitGrid";
import { VisitList } from "@/components/Visit/VisitList";
import type { Visit } from "@/types/visit";

export default function Visits() {
  const navigate = useNavigate();
  
  const {
    visits,
    isLoading,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    isProfileModalOpen,
    setIsProfileModalOpen,
    selectedVisit,
    handleVisitClick,
    handleDeleteVisit,
  } = useVisits();

  // Navigation Handlers
  const handleScheduleClick = () => {
    navigate("/dashboard/schedulevisit");
  };

  const handleEditFromProfile = (visit: Visit) => {
    setIsProfileModalOpen(false);
    navigate(`/dashboard/visits/edit/${visit._id}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Visits" 
        description="Schedule and manage visitor check-ins." 
        actionLabel="Schedule Visit" 
        onAction={handleScheduleClick} 
      />

      <VisitProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        visit={selectedVisit}
        onEdit={handleEditFromProfile}
        onDelete={handleDeleteVisit}
      />

      <PageControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="Search visits by visitor or host..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <VisitGrid visits={visits} onVisitClick={handleVisitClick} />
          ) : (
            <VisitList visits={visits} onVisitClick={handleVisitClick} />
          )}
        </>
      )}
    </div>
  );
}