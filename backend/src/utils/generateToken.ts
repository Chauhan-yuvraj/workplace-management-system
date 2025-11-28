import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb";

const generateToken = (id: string | ObjectId) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    })
}

export default generateToken;