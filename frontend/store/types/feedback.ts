export interface UserRecord {
    guestName: string;
    guestImgUri?: string;
    guestPhone?: string;
    guestEmail?: string;
    guestCompany?: string;
    featured?: boolean;
}
export interface FeedbackRecord {
    id?: string;
    guest: UserRecord;
    pages: SerializableCanvasPage[];
    signature: SerializablePathData[];
    visitType? : string;      
}


// --- TYPES FOR STORAGE ---
export interface SerializablePathData {
    svg: string; // Storing SkPath as SVG string
    color?: string;
    strokeWidth?: number;
}

export interface SerializableCanvasPage {
    id: string;
    paths: SerializablePathData[];
}