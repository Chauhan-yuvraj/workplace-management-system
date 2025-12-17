import type { Employee } from "@/types/user";
import API from "./api";

interface EmployeeApiResponse {
  success: boolean;
  count: number;
  data: Employee[];
}

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
