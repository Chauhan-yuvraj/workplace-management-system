import { useRecords } from "@/hooks/useRecords";
import RecordDetailModal from "@/components/Record/RecordDetailModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageControls } from "@/components/ui/PageControls";
import { RecordGrid } from "@/components/Record/RecordGrid";
import { RecordList } from "@/components/Record/RecordList";

export default function Records() {
  const {
    records,
    isLoading,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    selectedRecord,
    isModalOpen,
    setIsModalOpen,
    handleRecordClick,
    handleDeleteRecord,
  } = useRecords();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Records" 
        description="View past visit records and feedback." 
      />

      <RecordDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
        onDelete={handleDeleteRecord}
      />

      <PageControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="Search records..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <RecordGrid records={records} onRecordClick={handleRecordClick} />
          ) : (
            <RecordList records={records} onRecordClick={handleRecordClick} />
          )}
        </>
      )}
    </div>
  );
}
