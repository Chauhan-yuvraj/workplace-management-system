import type { Employee } from './user';

export type DeliveryStatus = "PENDING" | "COLLECTED" | "RETURNED" | "REJECTED";
export type Carrier = "DHL" | "FEDEX" | "UPS" | "AMAZON" | "FOOD" | "OTHER";

export interface Delivery {
    _id: string;
    recipientId: Employee; // Changed to Employee
    carrier: Carrier;
    trackingNumber?: string;
    labelPhotoUrl?: string;
    status: DeliveryStatus;
    collectedAt?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateDeliveryPayload {
    recipientId: string; // ID string for creation
    carrier: Carrier | string;
    trackingNumber?: string;
    labelPhotoUrl?: string;
}

export interface UpdateDeliveryPayload {
    status?: DeliveryStatus;
}