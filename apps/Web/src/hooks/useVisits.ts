import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVisits, deleteVisit } from "@/store/slices/visitSlice";
import type { Visit } from "@/types/visit";

export const useVisits = () => {
  const dispatch = useAppDispatch();
  const { visits, isLoading } = useAppSelector((state) => state.visits);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  useEffect(() => {
    if (visits.length === 0) {
      dispatch(fetchVisits({}));
    }
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

  const filteredVisits = useMemo(() => {
    return visits.filter(
      (visit) =>
        visit &&
        (visit.visitor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visit.host.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          visit.purpose?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [visits, searchQuery]);

  return {
    visits: filteredVisits,
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
  };
};
