import { Specialty } from "../entities/specialty.entity"

export interface ISpecialtyRepository{
    save(data: Specialty): Promise<Specialty>
}