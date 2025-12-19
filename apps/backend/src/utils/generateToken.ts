import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb";

const generateAccessToken = (id: string | ObjectId) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "15m"
    })
}
 const generateRefreshToken = (id: string | ObjectId) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: "30d"
    })
}

export { generateAccessToken, generateRefreshToken };