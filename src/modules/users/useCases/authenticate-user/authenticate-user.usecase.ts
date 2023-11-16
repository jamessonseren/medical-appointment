import { CustomError } from "../../../../errors/custom.error"
import { IUserRepository } from "../../repositories/user.repository"
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto"
import { IToken } from "../../../../infra/shared/token/token"

type AuthenticateRequest = {
    userName: string,
    password: string
}

export class AuthenticateUserUseCase{

    constructor(
        private userRepository: IUserRepository, 
        private passwordCrypto: IPasswordCrypto, 
        private token: IToken
        ){}

    async execute( { userName, password }: AuthenticateRequest){
        if(!userName || !password) throw new CustomError("Username/password incorrect", 401)
    
        const user = await this.userRepository.findByUserName(userName)

        if(!user) throw new CustomError("Username/password incorrect", 401)

        const comparePasswordHash = await this.passwordCrypto.compare(password, user.password)

        if(!comparePasswordHash) throw new CustomError("Username/password incorrect", 401)

        const tokenGenerated = this.token.create(user)
       
        return tokenGenerated
    }
}