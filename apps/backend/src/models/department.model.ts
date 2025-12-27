import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
  {
    departmentName: {
      type: String,
      required: true,
      trim: true,
    },
    departmentCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    departmentDescription: {
      type: String,
      trim: true,
    },
    departmentHod: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

departmentSchema.index({ departmentName: 1, departmentCode: 1 }, { unique: true });

departmentSchema.virtual("employeesCount", {
  ref: "Employee",
  localField: "_id",
  foreignField: "departmentId",
  count: true,
});

export const Department =
  mongoose.models.Department ||
  mongoose.model("Department", departmentSchema);
