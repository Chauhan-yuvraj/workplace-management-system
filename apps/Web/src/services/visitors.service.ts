import type { Visitor } from "@/types/visitor";
import API from "./api";

interface VisitorApiResponse {
  success: boolean;
  count: number;
  data: Visitor[];
}

interface SingleVisitorResponse {
  success: boolean;
  data: Visitor;
}

export const getVisitors = async (): Promise<Visitor[]> => {
  try {
    const response = await API.get<VisitorApiResponse>("/visitors");
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch visitors:", error);
    throw error;
  }
};

export const createVisitor = async (visitorData: Partial<Visitor> | FormData): Promise<Visitor> => {
  const isFormData = visitorData instanceof FormData;
  const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};

  const response = await API.post<SingleVisitorResponse | Visitor>("/visitors", visitorData, config);
  // Handle both { data: Visitor } and direct Visitor response
  if ('data' in response.data && response.data.data) {
    return response.data.data;
  }
  return response.data as Visitor;
};

export const updateVisitor = async (id: string, visitorData: Partial<Visitor> | FormData): Promise<Visitor> => {
  const isFormData = visitorData instanceof FormData;
  const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};

  const response = await API.patch<SingleVisitorResponse>(`/visitors/${id}`, visitorData, config);
  return response.data.data;
};

export const deleteVisitor = async (id: string): Promise<void> => {
  await API.delete(`/visitors/${id}`);
};
