import mongoose, { Schema } from "mongoose";

// --- Main Visitor Schema ---
const visitorSchema = new Schema({
    // User Details (Mapped from FeedbackRecord.guest)
    name: { type: String, required: true, trim: true }, // Required, mapped from guestName
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true }, // Mapped from guestEmail 
    phone: { type: String },
    company: { type: String },

    profileImgUri: { type: String }, // guestImgUri
    featured: { type: Boolean, default: false },

    firstVisit: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
});

export const Visitor = mongoose.model("Visitor", visitorSchema, 'visitors');