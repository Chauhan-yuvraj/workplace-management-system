import API from "./api";
import type { IDepartment } from "@repo/types";

interface DepartmentApiResponse {
  success: boolean;
  data: IDepartment[];
}

export const getDepartments = async (): Promise<IDepartment[]> => {
  try {
    const response = await API.get<DepartmentApiResponse>("/departments");
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    throw error;
  }
};