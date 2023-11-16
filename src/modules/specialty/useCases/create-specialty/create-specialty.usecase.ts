import { CustomError } from "../../../../errors/custom.error"
import { SpecialtyEntity } from "../../entities/specialty.entity"
import { ISpecialtyRepository } from "../../repositories/specialty.repository"

type SpecialtyRequest = {
    name: string
    description: string
}

export class CreateSpecialtyUseCase {
    constructor(private specialtyRepository: ISpecialtyRepository){}

    async execute(data: SpecialtyRequest){

        const specialty = SpecialtyEntity.create(data)

        const specialtyExists = await this.specialtyRepository.findBySpecialtyName(data.name)
        if(specialtyExists) throw new CustomError("Specialty already registered", 400, "ERROR")

        const specialtyCreated = await this.specialtyRepository.save(specialty)

        console.log("passou pelo repositório")


        return specialtyCreated
    }
}