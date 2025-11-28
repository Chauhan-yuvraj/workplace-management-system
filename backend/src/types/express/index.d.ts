import { IEmployee } from "../Employee"; // Adjust path

declare global {
    namespace Express {
        interface Request {
            user?: IEmployee; 
        }
    }
}