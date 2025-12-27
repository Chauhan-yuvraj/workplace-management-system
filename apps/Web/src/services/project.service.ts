import type { IProject } from "@repo/types";
import API from "./api";

interface ProjectsApiResponse {
  success: boolean;
  data: IProject[];
}

interface SingleProjectResponse {
  success: boolean;
  data: IProject;
}

export const getProjects = async (): Promise<IProject[]> => {
  try {
    const response = await API.get<ProjectsApiResponse>("/projects");
    return response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};

export const createProject = async (projectData: Partial<IProject>): Promise<IProject> => {
  try {
    const response = await API.post<SingleProjectResponse>("/projects", projectData);
    return response.data.data;
  } catch (error) {
    console.error("Failed to create project:", error);
    throw error;
  }
};

export const updateProject = async (id: string, projectData: Partial<IProject>): Promise<IProject> => {
  try {
    const response = await API.put<SingleProjectResponse>(`/projects/${id}`, projectData);
    return response.data.data;
  } catch (error) {
    console.error("Failed to update project:", error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await API.delete(`/projects/${id}`);
  } catch (error) {
    console.error("Failed to delete project:", error);
    throw error;
  }
};
