import { SpecialtyEntity } from "../../entities/specialty.entity";
import { ISpecialtyRepository } from "../specialty.repository";

export class SpecialtyMemoryRepository implements ISpecialtyRepository{
    items: SpecialtyEntity [] = []

    async findBySpecialtyName(name: string): Promise<SpecialtyEntity | null> {
        return this.items.find(specialty => specialty.name === name ) || null
        
    }
    async save(data: SpecialtyEntity): Promise<SpecialtyEntity> {
        this.items.push(data)
        return data
    }
    async findById(id: string): Promise<SpecialtyEntity | null> {
        return this.items.find(specialty => specialty.id === id ) || null
    }


}