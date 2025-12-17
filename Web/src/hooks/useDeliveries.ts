import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDeliveries, updateDeliveryStatus, deleteDelivery } from "@/store/slices/deliverySlice";

export const useDeliveries = () => {
  const dispatch = useAppDispatch();
  const { deliveries, loading } = useAppSelector((state) => state.deliveries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    if (currentStatus === "PENDING") {
      await dispatch(updateDeliveryStatus({ id, status: "COLLECTED" }));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this delivery record?")) {
      await dispatch(deleteDelivery(id));
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
    handleDelete,
  };
};
