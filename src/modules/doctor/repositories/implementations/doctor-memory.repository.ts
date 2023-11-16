import { DoctorEntity } from "../../entities/doctor.entities";
import { IDoctorRepository } from "../doctor.repository";

export class DoctorMemoryRepository implements IDoctorRepository{

    items: DoctorEntity[] = []

   async save(data: DoctorEntity): Promise<DoctorEntity>{
        this.items.push(data)
        return data
    }

    async findByCRM(crm: string): Promise<DoctorEntity | null> {
        return this.items.find(  item => item.crm === crm) || null
    }
    async findByUserId(userId: string): Promise<DoctorEntity | null> {
        return this.items.find(  item => item.id === userId) || null
    }
}