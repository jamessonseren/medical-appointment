import { Request, Response  } from "express";
import { CreateDoctorUseCase } from "./create-doctor.usecase";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { ISpecialtyRepository } from "../../../specialty/repositories/specialty.repository";
import { logger } from "../../../../utils/logger";

export class CreateDoctorController{
    
    constructor(
        private userRepository: IUserRepository,
        private doctorRepository: IDoctorRepository,
        private specialtyRepository: ISpecialtyRepository
        
    ){}
    async handle(req: Request, res: Response){

        try{
            const { body } = req
    
            const createDoctorUseCase = new CreateDoctorUseCase(this.userRepository, this.doctorRepository, this.specialtyRepository)
    
            const doctorCreated = await createDoctorUseCase.execute(body)
    
            return res.json(doctorCreated)

        }catch(err: any){
            logger.error(err.stack)
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}