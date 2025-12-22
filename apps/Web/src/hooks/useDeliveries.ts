import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDeliveries, updateDeliveryStatus, deleteDelivery } from "@/store/slices/deliverySlice";

export const useDeliveries = () => {
  const dispatch = useAppDispatch();
  const { deliveries, loading } = useAppSelector((state) => state.deliveries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    if (currentStatus === "PENDING") {
      await dispatch(updateDeliveryStatus({ id, status: "COLLECTED" }));
    }
  };

  const openDeleteAlert = (id: string) => {
    setDeleteId(id);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await dispatch(deleteDelivery(deleteId));
      setIsDeleteAlertOpen(false);
      setDeleteId(null);
    }
  };

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((d) =>
      d.recipientId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.carrier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [deliveries, searchQuery]);

  return {
    deliveries: filteredDeliveries,
    loading,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    handleStatusUpdate,
    openDeleteAlert,
    confirmDelete,
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
  };
};
