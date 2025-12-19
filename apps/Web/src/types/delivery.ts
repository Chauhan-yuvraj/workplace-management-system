import type { Employee } from "./user";

export type DeliveryStatus = "PENDING" | "COLLECTED";
export type Carrier = "DHL" | "FEDEX" | "UPS" | "AMAZON" | "FOOD" | "OTHER";

export interface Delivery {
    _id: string;
    recipientId: Employee;
    carrier: Carrier;
    trackingNumber?: string;
    labelPhotoUrl?: string;
    status: DeliveryStatus;
    collectedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDeliveryPayload {
    recipientId: string;
    carrier: Carrier | string;
    trackingNumber?: string;
    labelPhotoUrl?: string;
}

export interface UpdateDeliveryPayload {
    status?: DeliveryStatus;
}
