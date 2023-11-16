import { DoctorEntity } from "../entities/doctor.entities";

export interface IDoctorRepository{
    save(data: DoctorEntity): Promise<DoctorEntity>
    findByCRM(crm: string): Promise<DoctorEntity | null>
    findByUserId(userId: string): Promise<DoctorEntity | null>
}