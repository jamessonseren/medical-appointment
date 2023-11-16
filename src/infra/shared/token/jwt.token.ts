import { sign } from 'jsonwebtoken'
import { verify } from 'jsonwebtoken';

import { createHmac } from 'crypto'


import { User } from "../../../modules/users/entities/user.entity";
import { IToken, TokenUser } from "./token";

export class JWTToken implements IToken {
    private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN || ''

    private TOKEN_SECRET_CRYPTO = createHmac('sha256', this.TOKEN_SECRET).digest('base64')

    create({ userName, isAdmin, id }: User): string {
        const token = sign({
            user: {
                userName,
                isAdmin,
                id
            }
        }, this.TOKEN_SECRET_CRYPTO, {
            subject: id,
            expiresIn: '1m'
        })

        return token
    }

    validate(token: string): TokenUser | null{

        try {
            const tokenUser = verify(token, this.TOKEN_SECRET_CRYPTO) as TokenUser
            return tokenUser

        } catch (err) {
            return null
        }
    }

}