export interface SerializablePathData {
    svg: string;
    color?: string;
    strokeWidth?: number;
}

export interface SerializableCanvasPage {
    id: string;
    paths: SerializablePathData[];
}

export interface RecordVisitor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    profileImgUri?: string;
}

export interface Record {
    _id: string;
    VisitorId: RecordVisitor;
    pages: SerializableCanvasPage[];
    signature: SerializablePathData[];
    visitType: string;
    timeStamp: string;
    feedbackText?: string;
    audio?: string;
    images?: string[];
}
