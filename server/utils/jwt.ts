import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "~/constants/api";

export const signToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: '7d'
    })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET as string)
}
