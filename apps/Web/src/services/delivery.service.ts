import API from "./api";
import type { Delivery, CreateDeliveryPayload } from "@/types/delivery";

export const getDeliveries = async (): Promise<Delivery[]> => {
  const response = await API.get<Delivery[]>("/deliveries");
  return response.data;
};

export const createDelivery = async (payload: CreateDeliveryPayload): Promise<Delivery> => {
  const response = await API.post<Delivery>("/deliveries", payload);
  return response.data;
};

export const updateDeliveryStatus = async (id: string, status: string): Promise<Delivery> => {
  const response = await API.patch<Delivery>(`/deliveries/${id}/status`, { status });
  return response.data;
};

export const deleteDelivery = async (id: string): Promise<void> => {
  await API.delete(`/deliveries/${id}`);
};
