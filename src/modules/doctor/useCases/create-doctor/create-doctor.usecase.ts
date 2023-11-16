import { DoctorEntity } from "../../entities/doctor.entities"
import { User } from "../../../users/entities/user.entity"
import { IUserRepository } from "../../../users/repositories/user.repository"
import { CustomError } from "../../../../errors/custom.error"
import { IDoctorRepository } from "../../repositories/doctor.repository"
import { ISpecialtyRepository } from "../../../specialty/repositories/specialty.repository"


export type CreateDoctorRequest = {
    userName: string,
    name: string,
    password: string,
    email: string,
    crm: string,
    specialtyId: string
}
export class CreateDoctorUseCase{
    constructor(
        private userRepository: IUserRepository, 
        private doctorRepository: IDoctorRepository,
        private specialtyRepository: ISpecialtyRepository
        ){}

    async execute(data: CreateDoctorRequest){
        
        const user = await User.create({
            name: data.name,
            password: data.password,
            userName: data.userName
        })

        const specialty = await this.specialtyRepository.findById(data.specialtyId)
        if(!specialty) throw new CustomError("Specialty does not exists", 400, "ERROR")


        const userExists = await this.userRepository.findByUserName(data.userName)
        if(userExists) throw new CustomError("Username already exists", 400, "ERROR")

        const userCreated = await this.userRepository.save(user)

        const doctor = DoctorEntity.create({
            crm: data.crm,  
            email: data.email,
            specialtyId: data.specialtyId,
            userId: userCreated.id

        })

        const crmExists = await this.doctorRepository.findByCRM(data.crm)

        if(crmExists) throw new CustomError("CRM already exists", 400)

        const doctorCreated = await this.doctorRepository.save(doctor)

        return doctorCreated
    }
}