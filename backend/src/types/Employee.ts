export interface IEmployee {
    name: string;
    email: string;
    phone?: string;
    profileImgUri?: string;
    department?: string;
  jobTitle?: string;
  role: UserRole;
  requiresPasswordChange: boolean;
  password?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
}

export enum UserRole {
  EMPLOYEE = 'employee',
  HR = 'hr',
  ADMIN = 'admin',
  EXECUTIVE = 'executive' // Your "Top Management"
}