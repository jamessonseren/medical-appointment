import { Doctor } from "@prisma/client";
import { DoctorEntity } from "../entities/doctor.entities";

export class DoctorMapper{
    static DoctorMapper = (data: Doctor): DoctorEntity => {
        return{
            crm: data.crm,
            email: data.email,
            specialtyId: data.specialty_id,
            userId: data.user_id,
            id: data.id
        }
    
    }
    
}