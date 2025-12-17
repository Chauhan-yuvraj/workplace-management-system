import { useDeliveries } from "@/hooks/useDeliveries";
import DeliveryModal from "@/components/Delivery/DeliveryModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageControls } from "@/components/ui/PageControls";
import { DeliveryGrid } from "@/components/Delivery/DeliveryGrid";

export default function Deliveries() {
  const {
    deliveries,
    loading,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    handleStatusUpdate,
    handleDelete,
  } = useDeliveries();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Deliveries" 
        description="Track and manage incoming deliveries." 
        actionLabel="Add Delivery" 
        onAction={() => setIsModalOpen(true)} 
      />

      <DeliveryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <PageControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search deliveries..."
      />

      {loading ? (
        <div className="flex justify-center p-8">Loading...</div>
      ) : (
        <DeliveryGrid
          deliveries={deliveries}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
