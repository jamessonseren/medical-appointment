import { Request, Response, NextFunction } from "express"
import { JWTToken } from "../../token/jwt.token"

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {

    const headerAuth = req.headers.authorization

    if (!headerAuth) return res.status(401).json({
        error: 'Token is missing'
    })

    const [, token] = headerAuth.split(" ")

    if (!token) return res.status(401).json({
        error: 'Token is missing'
    })

    const verifyToken = new JWTToken().validate(token)

    if (verifyToken) {
        req.userId = verifyToken.sub
        return next()
    }

    return res.status(401).json({
        error: "Invalid Token"
    })
}