import { Schema } from "mongoose";

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

export { pathDataSchema, canvasPageSchema };