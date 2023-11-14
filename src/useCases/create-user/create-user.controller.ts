import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController{

    async handle(req: Request, res: Response){

        try{
            const data = req.body
    
            const useCase = new CreateUserUseCase()
    
            const result = await useCase.execute(data)
    
            return res.json(result)

        }catch(err: any){
            return res.status(400).json(err.message)
        }
    }
}