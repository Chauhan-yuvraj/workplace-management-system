import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchEmployees, deleteEmployee } from "@/store/slices/employeeSlice";
import type { Employee } from "@/types/user";

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const { employees, isLoading } = useAppSelector((state) => state.employees);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee &&
        (employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.department?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [employees, searchQuery]);

  return {
    employees: filteredEmployees,
    isLoading,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,
    selectedEmployee,
    handleAddEmployee,
    handleEmployeeClick,
    handleEditFromProfile,
    handleDeleteEmployee,
  };
};
