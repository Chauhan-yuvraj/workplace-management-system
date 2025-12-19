import API from "./api";
import type { Record } from "@/types/record";

interface RecordApiResponse {
  success: boolean;
  count: number;
  data: Record[];
}

export const getRecords = async (): Promise<Record[]> => {
  try {
    const response = await API.get<RecordApiResponse>("/records");    
    if (Array.isArray(response.data)) {
        return response.data;
    }
    
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Failed to fetch records:", error);
    throw error;
  }
};

export const deleteRecord = async (id: string): Promise<void> => {
  await API.delete(`/records/${id}`);
};
