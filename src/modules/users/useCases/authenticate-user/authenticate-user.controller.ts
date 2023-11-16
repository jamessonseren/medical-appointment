import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto"
import { IToken } from "../../../../infra/shared/token/token"
import { IUserRepository } from "../../repositories/user.repository"
import { AuthenticateUserUseCase } from "./authenticate-user.usecase"
import { Request, Response } from "express"

export class AuthenticaUserController {
    constructor(
        private userRepository: IUserRepository,
        private passwrodCrypt: IPasswordCrypto,
        private token: IToken
    ){}

    async handle(req: Request, res: Response){

        try{
            const data = req.body

            const authenticateUserUseCase = new AuthenticateUserUseCase(this.userRepository, this.passwrodCrypt, this.token)

            const result = await authenticateUserUseCase.execute(data)

            return res.json(result)
        }catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}