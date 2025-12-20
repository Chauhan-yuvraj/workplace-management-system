import { useEmployees } from "@/hooks/useEmployees";
import EmployeeModal from "@/components/Employee/EmployeeModal";
import EmployeeProfileModal from "@/components/Employee/EmployeeProfileModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageControls } from "@/components/ui/PageControls";
import { EmployeeGrid } from "@/components/Employee/EmployeeGrid";
import { EmployeeList } from "@/components/Employee/EmployeeList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { usePermission } from "@/hooks/auth/usePermission";

export default function Employees() {
  const { hasPermission } = usePermission();
  const {
    employees,
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
  } = useEmployees();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employees" 
        description="Manage your team members and their roles." 
        actionLabel={hasPermission('manage_employees') ? "Add Employee" : undefined} 
        onAction={hasPermission('manage_employees') ? handleAddEmployee : undefined} 
      />

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeToEdit={selectedEmployee}
      />

      <EmployeeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        employee={selectedEmployee}
        onEdit={handleEditFromProfile}
        onDelete={handleDeleteEmployee}
      />

      <PageControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="Search employees..."
      >
        <PermissionGuard permission="manage_employees">
          <Select
            value={statusFilter}
            onValueChange={(value: "active" | "inactive" | "all") =>
              setStatusFilter(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active Employees</SelectItem>
              <SelectItem value="inactive">Inactive Employees</SelectItem>
              <SelectItem value="all">All Employees</SelectItem>
            </SelectContent>
          </Select>
        </PermissionGuard>
      </PageControls>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <EmployeeGrid employees={employees} onEmployeeClick={handleEmployeeClick} />
          ) : (
            <EmployeeList employees={employees} onEmployeeClick={handleEmployeeClick} />
          )}
        </>
      )}
    </div>
  );
}
