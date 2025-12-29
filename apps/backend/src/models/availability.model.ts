import mongoose, { Schema } from "mongoose";

const availabilitySchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["UNAVAILABLE", "OUT_OF_OFFICE", "EMERGENCY"],
      default: "UNAVAILABLE",
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

availabilitySchema.index({ employeeId: 1, startTime: 1, endTime: 1 });

export const Availability =
  mongoose.models.Availability ||
  mongoose.model("Availability", availabilitySchema);
