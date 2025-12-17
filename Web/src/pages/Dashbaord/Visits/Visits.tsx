import { useVisits } from "@/hooks/useVisits";
import VisitModal from "@/components/Visit/VisitModal";
import VisitProfileModal from "@/components/Visit/VisitProfileModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageControls } from "@/components/ui/PageControls";
import { VisitGrid } from "@/components/Visit/VisitGrid";
import { VisitList } from "@/components/Visit/VisitList";

export default function Visits() {
  const {
    visits,
    isLoading,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,
    selectedVisit,
    handleAddVisit,
    handleVisitClick,
    handleEditFromProfile,
    handleDeleteVisit,
  } = useVisits();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Visits" 
        description="Schedule and manage visitor check-ins." 
        actionLabel="Schedule Visit" 
        onAction={handleAddVisit} 
      />

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

      <PageControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="Search visits..."
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
