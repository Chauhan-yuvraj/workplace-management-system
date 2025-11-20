// src/services/feedback.service.ts
import { UserRecord, SerializableCanvasPage, SerializablePathData, FeedbackRecord } from '@/store/types/feedback';
import API from './api';

export async function saveUserRecord(
    guestData: UserRecord,
    canvasPages: SerializableCanvasPage[],
    signaturePaths: SerializablePathData[],
    visitType: string = 'general'
): Promise<FeedbackRecord> {
    console.log('Starting API call to save user record...');

    try {
        console.log('Successfully received serialized pages and signature.');
        console.log(`Canvas Pages Count: ${canvasPages.length}`);
        console.log(`Signature Paths Count: ${signaturePaths.length}`);

        const newRecord: FeedbackRecord = {
            guest: guestData,
            pages: canvasPages,
            signature: signaturePaths,
            visitType: visitType
        }

        const response = await API.post("/records", newRecord, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;

    } catch (e) {
        console.error("Failed to process user record serialization:", e);
        throw e;
    }
}