import jwt from 'jsonwebtoken'
import { getRequiredEnv } from './env'

const JWT_SECRET = getRequiredEnv('JWT_SECRET')

export const signToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d'
    })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}
