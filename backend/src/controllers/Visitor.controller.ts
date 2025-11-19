import { Request, Response } from "express"
import { Visitor } from "../models/visitor.model";
import { FeedbackRecord } from "../types/FeedbackRecord";


export const postVisitor = async (req: Request, res: Response) => {
    
    // The incoming body now perfectly matches the FeedbackRecord interface
    const incomingData: FeedbackRecord = req.body;
    
    console.log("Attempting to create visitor...");
    
    try {
        // --- Data Mapping ---
        
        const preparedVisitorData = {
            // FIX: Mapping the required 'name' from the nested guest object
            name: incomingData.guest.guestName,        
            
            // Structured arrays (handled by sub-schemas)
            signature: incomingData.signature,         
            pages: incomingData.pages,                 

            // Optional/Other User Details
            email: incomingData.guest.guestEmail,
            phone: incomingData.guest.guestPhone,
            company: incomingData.guest.guestCompany,
            timeStamp: incomingData.guest.timestamp,
            imgUrl: incomingData.guest.guestImgUri,
            featured: incomingData.guest.featured,
        };
        
        // Basic validation for name
        if (!preparedVisitorData.name) {
            return res.status(400).json({ message: "Validation Error: Guest name is required." });
        }
        

        const visitor = await Visitor.create(preparedVisitorData);
        
        console.log("Visitor created:", visitor);
        res.status(201).json(visitor);

    } catch (error) {
        console.error("Mongoose Error:", error);
        
        // General error handling
        res.status(500).json({ message: "Server Error", error });
    }
}