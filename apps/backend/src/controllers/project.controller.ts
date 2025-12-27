import { Request, Response } from "express";
import { Project } from "../models/project.model";

export const createProject = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const newProject = await Project.create(payload);
        res.status(201).json({ success: true, data: newProject, message: "Project created" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating project", error });
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching projects", error });
    }
};

export const getProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching project", error });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: "Project not found" });
        res.status(200).json({ success: true, data: updated, message: "Project updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating project", error });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const removed = await Project.findByIdAndDelete(id);
        if (!removed) return res.status(404).json({ success: false, message: "Project not found" });
        res.status(200).json({ success: true, message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting project", error });
    }
};
