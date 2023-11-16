import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../repositories/user.repository";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";

export class CreateUserController{

    constructor(private userRepository: IUserRepository){}
    
    async handle(req: Request, res: Response){

        try{
            const data = req.body
    
            const useCase = new CreateUserUseCase(this.userRepository)
    
            const result = await useCase.execute(data)
    
            return res.json(result)

        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}