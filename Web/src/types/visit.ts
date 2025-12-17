export interface VisitSnapshot {
    id: string;
    name: string;
    email?: string;
    profileImgUri?: string;
    company?: string;
    isVip?: boolean;
    department?: string;
}

export interface VisitFeedback {
    rating?: number;
    comment?: string;
}

export type VisitStatus = 'PENDING' | 'CHECKED_IN' | 'CHECKED_OUT' | 'DECLINED' | 'MISSED';

export interface Visit {
    _id: string;
    visitor: VisitSnapshot;
    host: VisitSnapshot;
    scheduledCheckIn: string;
    actualCheckIn?: string;
    actualCheckOut?: string;
    status: VisitStatus;
    isWalkIn: boolean;
    purpose?: string;
    meetingMinutes?: string;
    feedback?: VisitFeedback;
    createdAt: string;
    updatedAt: string;
}

export interface CreateVisitPayload {
    visitorId: string;
    hostId: string;
    scheduledCheckIn: string;
    isWalkIn?: boolean;
    purpose?: string;
}

export interface UpdateVisitPayload {
    scheduledCheckIn?: string;
    status?: VisitStatus;
    meetingMinutes?: string;
    actualCheckIn?: string;
    actualCheckOut?: string;
    isWalkIn?: boolean;
    purpose?: string;
    feedback?: VisitFeedback;
}
