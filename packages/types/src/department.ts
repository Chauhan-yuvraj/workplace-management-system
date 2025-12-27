export interface IDepartment {
    _id?: string;
    departmentName: string;
    departmentCode: string;
    departmentDescription?: string;
    // Can be either an Employee _id or a populated object with an `_id`
    departmentHod?: string | { _id: string; name?: string };
    isActive?: boolean;
    employeesCount?: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
