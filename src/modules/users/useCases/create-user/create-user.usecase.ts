import { IUserRepository } from "../../repositories/user.repository"
import { User } from "../../entities/user.entity"
import { ParameterRequiredError } from "../../../../errors/parameter-required.error"
import { CustomError } from "../../../../errors/custom.error"
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto"

type UserRequest = {
    name: string
    userName: string
    password: string
}

export class CreateUserUseCase{
    constructor(private userRepository: IUserRepository, private passwordCrypto: IPasswordCrypto){}

    async execute(data: UserRequest){
        const user = User.create(data)

        // const userRepository = UserRepository.getInstance()

        if(!data.userName || !data.userName){
            throw new ParameterRequiredError("Username/password is required", 412)
        }

        const userExists = await this.userRepository.findByUserName(data.userName)

        if(userExists) throw new CustomError("Username already exists", 400, "ERROR")

        const passwordHashed = await this.passwordCrypto.hash(data.password)
        user.password = passwordHashed
        
        const userCreated = await this.userRepository.save(user)
        return userCreated
    }

}