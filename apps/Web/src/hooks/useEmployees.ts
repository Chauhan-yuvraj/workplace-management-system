import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEmployees, deleteEmployee, toggleEmployeeStatus } from "@/store/slices/employeeSlice";
import type { Employee } from "@/types/user";

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const { employees, isLoading } = useAppSelector((state) => state.employees);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "all">("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsProfileModalOpen(true);
  };

  const handleEditFromProfile = (employee: Employee) => {
    setIsProfileModalOpen(false);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    await dispatch(deleteEmployee(employeeId));
    setIsProfileModalOpen(false);
  };

  const handleToggleStatus = async (employeeId: string) => {
    await dispatch(toggleEmployeeStatus(employeeId));
    // Update selected employee if it's the one being toggled
    if (selectedEmployee && selectedEmployee._id === employeeId) {
      setSelectedEmployee(prev => prev ? { ...prev, isActive: !prev.isActive } : null);
    }
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      if (!employee) return false;

      // Status Filter
      if (statusFilter === "active" && !employee.isActive) return false;
      if (statusFilter === "inactive" && employee.isActive) return false;

      // Search Filter
      const matchesSearch =
        employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (employee.departments?.[0] as { departmentName?: string })?.departmentName?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [employees, searchQuery, statusFilter]);

  return {
    employees: filteredEmployees,
    isLoading,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,
    selectedEmployee,
    handleAddEmployee,
    handleEmployeeClick,
    handleEditFromProfile,
    handleDeleteEmployee,
    handleToggleStatus,
  };
};
