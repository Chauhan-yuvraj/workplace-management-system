import { FeedbackRecord } from "@/store/types/feedback";
import API from "./api";

export async function getRecordsFromAPI(): Promise<FeedbackRecord[]> {
    console.log("Making an APi call to get all records")
    try {
        const response = await API.get("/visitors", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data)
        return response.data;
    }
    catch (e) {
        console.error("Failed to fetch records from API:", e);
        throw e;
    }

}