export interface IProject {
    _id?: string;
    name: string;
    description?: string;
    departmentId: string;
    projectManagerId?: string;
    teamLeadId?: string;
    teamMemberIds?: string[];
    startDate: string | Date;
    endDate?: string | Date;
    isActive?: boolean;
    status?: "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
    statusHistory?: Array<{
        status: string;
        remarks?: string;
        updatedBy?: string;
        updatedAt?: string | Date;
    }>;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
