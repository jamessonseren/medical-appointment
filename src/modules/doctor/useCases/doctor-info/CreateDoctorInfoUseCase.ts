import { CustomError } from "../../../../errors/custom.error"
import { IDoctorRepository } from "../../repositories/doctor.repository"

export type DoctorInfoRequest = {
    startAt: string
    endAt: string
    price: number
    duration: number
}
export class CreateDoctorInfoUseCase{

    constructor(private doctorRepository: IDoctorRepository){}

    async execute(data: DoctorInfoRequest, userId: string){

       const doctorByUserID = await this.doctorRepository.findByUserId(userId)

       if(!doctorByUserID) throw new CustomError("Doctor does not exist")
    }
}