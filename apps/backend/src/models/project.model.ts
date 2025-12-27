import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        projectManagerId: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
        },
        teamLeadId: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
        },
        teamMemberIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Employee",
            }
        ],
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        status: {
            type: String,
            enum: ["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"],
            default: "PLANNING",
            index: true,
        },
        statusHistory: [
            {
                status: String,
                remarks: String,
                updatedBy: {
                    type: Schema.Types.ObjectId,
                    ref: "Employee",
                },

                updatedAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],

    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);