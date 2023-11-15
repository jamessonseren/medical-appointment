import { Specialty } from "../../entities/specialty.entity"
import { ISpecialtyRepository } from "../../repositories/specialty.repository"

type SpecialityRequety = {
    name: string
    description: string
}

export class CreateSpecialtyUseCase {
    constructor(private specialtyRepository: ISpecialtyRepository){}

    async execute(data: SpecialityRequety){

        const specialty = new Specialty(data)

        const specialtyCreated = await this.specialtyRepository.save(specialty)

        return specialtyCreated
    }
}