import { useVisitors } from "@/hooks/useVisitors";
import VisitorModal from "@/components/Visitor/VisitorModal";
import VisitorProfileModal from "@/components/Visitor/VisitorProfileModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageControls } from "@/components/ui/PageControls";
import { VisitorGrid } from "@/components/Visitor/VisitorGrid";
import { VisitorList } from "@/components/Visitor/VisitorList";

export default function Visitors() {
  const {
    visitors,
    isLoading,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,
    selectedVisitor,
    handleAddVisitor,
    handleVisitorClick,
    handleEditFromProfile,
    handleDeleteVisitor,
  } = useVisitors();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Visitors" 
        description="Manage visitors, VIPs, and blocked guests." 
        actionLabel="Add Visitor" 
        onAction={handleAddVisitor} 
      />

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

      <PageControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="Search visitors..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <VisitorGrid visitors={visitors} onVisitorClick={handleVisitorClick} />
          ) : (
            <VisitorList visitors={visitors} onVisitorClick={handleVisitorClick} />
          )}
        </>
      )}
    </div>
  );
}
