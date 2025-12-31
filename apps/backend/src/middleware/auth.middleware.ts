import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { Employee } from "../models/employees.model";
import { ROLE_PERMISSIONS, UserRole } from "@repo/types";

interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

export const protect = async (req: Request, res: Response, next: Function) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET!
        ) as DecodedToken;

        const user = await Employee.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

export const checkPermission = (...requiredPermission: string[]) => {
    return (req: Request, res: Response, next: Function) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const userRole = user.role as UserRole;
        const userPermissions = ROLE_PERMISSIONS[userRole] || [];

        // Check if user has 'all' permission or if any of the required permissions are in user's permissions
        const hasAccess = userPermissions.includes('all') || requiredPermission.some(permission => userPermissions.includes(permission));

        if (!hasAccess) {
            return res.status(403).json({ 
                success: false,
                message: "Forbidden: You do not have the required permission",
                required: requiredPermission,
                userRole: userRole,
                userPermissions: userPermissions
            });
        }

        next();
    }
}