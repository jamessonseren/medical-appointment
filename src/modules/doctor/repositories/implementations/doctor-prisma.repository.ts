import { prismaClient } from "../../../../infra/databases/prisma.config";
import { DoctorEntity } from "../../entities/doctor.entities";
import { DoctorMapper } from "../../mapper/doctor.map";
import { IDoctorRepository } from "../doctor.repository";

export class DoctorPrismaRepository implements IDoctorRepository {
    async save(data: DoctorEntity): Promise<DoctorEntity> {
        const doctor = await prismaClient.doctor.create({
            data:{
                crm: data.crm,
                email: data.crm,
                specialty_id: data.specialtyId,
                user_id: data.userId
            }
        })

        return DoctorMapper.DoctorMapper(doctor)
    }
    async findByCRM(crm: string): Promise<DoctorEntity | null> {
        const doctor  = await prismaClient.doctor.findUnique({
            where:{
                crm
            }
        })

       if(doctor) return DoctorMapper.DoctorMapper(doctor)
       return null
    }

    async findByUserId(userId: string): Promise<DoctorEntity | null> {
        const doctor = await prismaClient.doctor.findFirst({
            where:{
                user_id: userId
            }
        })

        if(doctor) return DoctorMapper.DoctorMapper(doctor)
        return null
     }

}