import mongoose, { Schema } from "mongoose";

// --- Sub-Schema 1: SerializablePathData ---
const pathDataSchema = new Schema({
    svg: { type: String, required: true },
    color: { type: String },
    strokeWidth: { type: Number },
}, { _id: false });

// --- Sub-Schema 2: SerializableCanvasPage ---
const canvasPageSchema = new Schema({
    id: { type: String, required: true },
    paths: { type: [pathDataSchema], default: [] },
}, { _id: false });


// --- Main Visitor Schema ---
const visitorSchema = new Schema({
    // User Details (Mapped from FeedbackRecord.guest)
    name: { type: String, required: true }, // Required, mapped from guestName
    email: { type: String },
    phone: { type: String },
    company: { type: String },
    timeStamp: { type: String },
    imgUrl: { type: String }, // guestImgUri
    featured: { type: Boolean, default: false },

    signature: {
        type: [pathDataSchema],
        required: true
    },

    pages: {
        type: [canvasPageSchema],
        default: [],
        required: true
    }
});

export const Visitor = mongoose.model("Visitor", visitorSchema);