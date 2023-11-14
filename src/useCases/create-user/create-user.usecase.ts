import { UserRepository } from "../../repositories/user.repository"
import { User } from "../../entities/user.entity"

type UserRequest = {
    name: string
    userName: string
    password: string
}

export class CreateUserUseCase{
    async execute(data: UserRequest){

        const userRepository = UserRepository.getInstance()

        if(!data.userName || !data.userName){
            throw new Error("Username/password is required")
        }

        const userExists = await userRepository.findByUserName(data.userName)

        if(userExists) throw new Error("Username already exists")

        const user = User.create(data)

        const userCreated = await userRepository.save(user)
        return userCreated
    }
}