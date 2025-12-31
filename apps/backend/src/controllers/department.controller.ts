import { Request, Response } from "express";
import mongoose from "mongoose";
import { Department } from "../models/department.model";

export const createDepartment = async (req: Request, res: Response) => {
    try {
        const { departmentName, departmentCode, departmentDescription, departmentHod, isActive } = req.body;

        // Validate required fields
        if (!departmentName || !departmentCode) {
            return res.status(400).json({
                success: false,
                message: "Department name and code are required"
            });
        }

        const existingDepartment = await Department.findOne({
            $or: [{ departmentName }, { departmentCode }]
        });

        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department with this name or code already exists"
            });
        }

        // Prepare department data
        const departmentData: any = {
            departmentName: departmentName.trim(),
            departmentCode: departmentCode.trim().toUpperCase(),
            isActive: typeof isActive === 'boolean' ? isActive : true,
        };

        if (departmentDescription) {
            departmentData.departmentDescription = departmentDescription.trim();
        }

        // Only include departmentHod if it's a valid non-empty string
        if (departmentHod && typeof departmentHod === 'string' && departmentHod.trim() !== '') {
            // Validate it's a valid MongoDB ObjectId format
            if (mongoose.Types.ObjectId.isValid(departmentHod)) {
                departmentData.departmentHod = departmentHod;
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Head of Department ID format"
                });
            }
        }

        const newDepartment = await Department.create(departmentData);

        res.status(201).json({
            success: true,
            data: newDepartment,
            message: "Department created successfully"
        });
    } catch (error: any) {
        console.error("Error creating department:", error);
        
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err: any) => err.message).join(', ');
            return res.status(400).json({
                success: false,
                message: `Validation error: ${messages}`
            });
        }

        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Department with this name or code already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || "Error creating department"
        });
    }
};

export const getAllDepartments = async (req: Request, res: Response) => {
    try {
        const departments = await Department.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error: any) {
        console.error("Error fetching departments:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error fetching departments"
        });
    }
};

export const updateDepartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { departmentName, departmentCode, departmentDescription, departmentHod, isActive } = req.body;

        // check for conflicts with other departments
        const conflict = await Department.findOne({
            $or: [{ departmentName }, { departmentCode }],
            _id: { $ne: id }
        });
        if (conflict) {
            return res.status(400).json({ success: false, message: 'Another department with same name or code exists' });
        }

        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { departmentName, departmentCode, departmentDescription, departmentHod, isActive },
            { new: true, runValidators: true }
        );

        if (!updatedDepartment) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedDepartment,
            message: "Department updated successfully"
        });
    } catch (error: any) {
        console.error("Error updating department:", error);
        
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err: any) => err.message).join(', ');
            return res.status(400).json({
                success: false,
                message: `Validation error: ${messages}`
            });
        }

        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Department with this name or code already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || "Error updating department"
        });
    }
};

export const deleteDepartment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedDepartment = await Department.findByIdAndDelete(id);

        if (!deletedDepartment) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Department deleted successfully"
        });
    } catch (error: any) {
        console.error("Error deleting department:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error deleting department"
        });
    }
};
