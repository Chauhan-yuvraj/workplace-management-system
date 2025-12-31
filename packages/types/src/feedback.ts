export interface SerializablePathData {
    svg: string;
    color?: string;
    strokeWidth?: number;
}

export interface SerializableCanvasPage {
    id: string;
    paths: SerializablePathData[];
}

export interface VisitorRecord {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    profileImgUri?: string;
}

export interface FeedbackRecord {
    _id?: string;
    id?: string;
    VisitorId?: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        company: string;
        profileImgUri?: string;
    };
    visitor?: VisitorRecord;
    
    pages: SerializableCanvasPage[];
    signature: SerializablePathData[];
    
    // Mobile specific
    visitType?: string;
    timeStamp?: string;
    feedbackText?: string;
    audio?: string;
    images?: string[];
}
