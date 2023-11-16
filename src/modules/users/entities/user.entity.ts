import { randomUUID } from 'crypto'
import { ParameterRequiredError } from '../../../errors/parameter-required.error'
import { PasswordBcrypt } from '../../../infra/shared/crypto/password.bcrypt'

type IUser = {
    name: string,
    password: string,
    userName: string
}

export class User {
    name: string
    password: string
    userName: string
    id: string
    isAdmin: boolean

    private constructor(props: IUser){
        if(!props.userName || !props.userName){
            throw new ParameterRequiredError("Username/password is required", 412)
        }

        this.name = props.name
        this.userName = props.userName
        this.password = props.password
        this.id = randomUUID()
        this.isAdmin = false
    }

    static async create(props: IUser){
        if(!props.userName){
            throw new ParameterRequiredError("Username/password is required", 412)
        }

        const bcrypt = new PasswordBcrypt()
        const passwordHashed = await bcrypt.hash(props.password)

        props.password = passwordHashed
        
        const user = new User(props)
        return user
    }
}