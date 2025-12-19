import API from "./api";
import type { Visit, CreateVisitPayload, UpdateVisitPayload } from "@/types/visit";

interface VisitApiResponse {
  success: boolean;
  count: number;
  data: Visit[];
}

interface SingleVisitResponse {
  success: boolean;
  data: Visit;
}

export const getVisits = async (status?: string, hostId?: string): Promise<Visit[]> => {
  try {
    const params: { status?: string; hostId?: string } = {};
    if (status) params.status = status;
    if (hostId) params.hostId = hostId;

    const response = await API.get<VisitApiResponse>("/visits", { params });
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch visits:", error);
    throw error;
  }
};

export const getVisitById = async (id: string): Promise<Visit> => {
  try {
    const response = await API.get<SingleVisitResponse>(`/visits/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch visit details:", error);
    throw error;
  }
};

export const scheduleVisit = async (payload: CreateVisitPayload): Promise<Visit> => {
  const response = await API.post<SingleVisitResponse>("/visits", payload);
  return response.data.data;
};

export const updateVisit = async (id: string, payload: UpdateVisitPayload): Promise<Visit> => {
  const response = await API.patch<SingleVisitResponse>(`/visits/${id}`, payload);
  return response.data.data;
};

export const deleteVisit = async (id: string): Promise<void> => {
  await API.delete(`/visits/${id}`);
};
