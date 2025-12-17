import { useEmployees } from "@/hooks/useEmployees";
import EmployeeModal from "@/components/Employee/EmployeeModal";
import EmployeeProfileModal from "@/components/Employee/EmployeeProfileModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageControls } from "@/components/ui/PageControls";
import { EmployeeGrid } from "@/components/Employee/EmployeeGrid";
import { EmployeeList } from "@/components/Employee/EmployeeList";

export default function Employees() {
  const {
    employees,
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
  } = useEmployees();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employees" 
        description="Manage your team members and their roles." 
        actionLabel="Add Employee" 
        onAction={handleAddEmployee} 
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
      />

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
