import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { Employee } from "../models/employees.model";

interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

export const protect = async (req: Request, res: Response, next: Function) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken

            const user = await Employee.findById(decoded.id).select('-password')

            if (!user) {
                res.status(401).json({ message: "Not authorized, user not found" });
                return
            }
            req.user = user
            next()
        } catch (error) {
              console.error("JWT Error:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
        if (!token) {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    }else{
        res.status(401).json({ message: "Not authorized, no token" });
    }
}

export const authorize = (...roles:string[]) => {
    return (req: Request, res: Response, next: Function) => {

        if (!req.user) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }

        if(!roles.includes(req.user.role)) {
            res.status(403).json({ message: `Forbidden: User role ${req.user.role} does not have the required role`});
            return;
        }

        next();
    }

}