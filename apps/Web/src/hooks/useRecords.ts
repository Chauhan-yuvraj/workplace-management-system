import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRecords, deleteRecord } from "@/store/slices/recordSlice";
import type { Record } from "@/types/record";

export const useRecords = () => {
  const dispatch = useAppDispatch();
  const { records, isLoading } = useAppSelector((state) => state.records);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (records.length === 0) {
      dispatch(fetchRecords());
    }
  }, [dispatch, records.length]);

  const handleRecordClick = (record: Record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = async (recordId: string) => {
    await dispatch(deleteRecord(recordId));
    setIsModalOpen(false);
  };

  const filteredRecords = useMemo(() => {
    return records.filter(
      (record) =>
        record &&
        (record.VisitorId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.visitType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.feedbackText?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [records, searchQuery]);

  return {
    records: filteredRecords,
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
  };
};
