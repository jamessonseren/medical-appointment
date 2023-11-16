import { SpecialtyEntity } from "../entities/specialty.entity"

export interface ISpecialtyRepository{
    findBySpecialtyName(name: string): Promise<SpecialtyEntity | null>
    save(data: SpecialtyEntity): Promise<SpecialtyEntity>
    findById(id: string): Promise<SpecialtyEntity | null>
}