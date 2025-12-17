export const UserRole = {
    EMPLOYEE: "employee",
    HR: "hr",
    ADMIN: "admin",
    EXECUTIVE: "executive",
} as const;

export interface Employee {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    department?: string;
    jobTitle: string;
    role: UserRole | string;
    isActive: boolean;
    status?: "Active" | "On Leave" | "Inactive";
    profileImgUri?: string;
    createdAt?: string;
}

export type UserRole = typeof UserRole[keyof typeof UserRole];