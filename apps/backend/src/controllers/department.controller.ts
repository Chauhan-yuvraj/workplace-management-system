import { Request, Response } from "express";
import { Department } from "../models/department.model";

export const createDepartment = async (req: Request, res: Response) => {
    try {
        const { departmentName, departmentCode, departmentDescription, departmentHod, isActive } = req.body;

        const existingDepartment = await Department.findOne({
            $or: [{ departmentName }, { departmentCode }]
        });

        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department with this name or code already exists"
            });
        }

        const newDepartment = await Department.create({
            departmentName,
            departmentCode,
            departmentDescription,
            departmentHod,
            isActive: typeof isActive === 'boolean' ? isActive : true,
        });

        res.status(201).json({
            success: true,
            data: newDepartment,
            message: "Department created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating department",
            error
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching departments",
            error
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating department",
            error
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting department",
            error
        });
    }
};
