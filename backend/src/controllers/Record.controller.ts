import { Request, Response } from "express"
import { Visitor } from "../models/visitor.model";
import { FeedbackRecord } from "../models/FeedbackRecord.model";


export const getRecords = async (req: Request, res: Response) => {
    try {

        const records = await FeedbackRecord.find().populate('VisitorId');
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

export const postRecord = async (req: Request, res: Response) => {
    const { id, guest, signature, visitType, pages, feedbackText } = req.body;
    try {

        const visitor = await Visitor.findOne({ email: guest.guestEmail });

        if (!visitor) {

            const newVisitor = new Visitor({
                name: guest.guestName,
                email: guest.guestEmail,
                phone: guest.guestPhone,
                company: guest.guestCompany,
                profileImgUri: guest.guestImgUri || '',

                featured: guest.featured || false,
            });
            await newVisitor.save();

            const newRecord = new FeedbackRecord({
                VisitorId: newVisitor._id,
                timeStamp: new Date().toISOString(),
                visitType,
                signature,
                pages,
                feedbackText
            });
            await newRecord.save();
            res.status(201).json({ message: "Record created successfully" });


        } else {

            const newRecord = new FeedbackRecord({
                VisitorId: visitor._id,
                timeStamp: new Date().toISOString(),
                visitType,
                signature,
                pages,
                feedbackText
            });
            await newRecord.save();
            res.status(201).json({ message: "Record created successfully" });

        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}


export const deleteRecord = async (req: Request, res: Response) => {
    console.log("deleting started",)
    const { id } = req.params;
    try {
        const deletedRecord = await FeedbackRecord.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }
        res.json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}