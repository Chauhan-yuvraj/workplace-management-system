import type { Employee } from "@/types/user";
import API from "./api";
import type { ActiveEmployeeOption } from "@repo/types";

interface EmployeeApiResponse {
  success: boolean;
  count: number;
  data: Employee[];
}

interface ActiveEmployeeApiResponse {
  success: boolean;
  data: ActiveEmployeeOption[];
}

interface SingleEmployeeResponse {
  success: boolean;
  data: Employee;
}

export const fetchActiveEmployees = async (): Promise<ActiveEmployeeOption[]> => {
  try {
    const response = await API.get<ActiveEmployeeApiResponse>("/employees/active-list");
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch active employees:", error);
    throw error;
  }
};

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await API.get<EmployeeApiResponse>("/employees");
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};

export const createEmployee = async (employeeData: Partial<Employee> | FormData): Promise<Employee> => {
  const isFormData = employeeData instanceof FormData;
  const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};

  const response = await API.post<SingleEmployeeResponse | Employee>("/employees", employeeData, config);
  // Handle both { data: Employee } and direct Employee response
  if ('data' in response.data && response.data.data) {
    return response.data.data;
  }
  return response.data as Employee;
};

export const updateEmployee = async (id: string, employeeData: Partial<Employee> | FormData): Promise<Employee> => {
  const isFormData = employeeData instanceof FormData;
  const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};

  const response = await API.patch<SingleEmployeeResponse>(`/employees/${id}`, employeeData, config);
  return response.data.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  console.log("Employee the employee")
  await API.delete(`/employees/${id}`);
};

export const toggleEmployeeStatus = async (id: string): Promise<Employee> => {
  const response = await API.patch<SingleEmployeeResponse>(`/employees/${id}/toggle-status`);
  return response.data.data;
};

