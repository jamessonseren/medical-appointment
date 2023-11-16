import { prismaClient } from "../../../../infra/databases/prisma.config";
import { SpecialtyEntity } from "../../entities/specialty.entity";
import { ISpecialtyRepository } from "../specialty.repository";


export class SpecialtyPrismaRepository implements ISpecialtyRepository {

    async findBySpecialtyName(name: string): Promise<SpecialtyEntity | null> {
        const specialty = await prismaClient.specialty.findUnique({
            where:{
                name
            },
        })

        return specialty || null
    }
    async save(data: SpecialtyEntity): Promise<SpecialtyEntity> {
        
        const specialty = await prismaClient.specialty.create({
            data:{
                name: data.name,
                description: data.description
            }
        })
        return specialty
    }
    
    async findById(id: string): Promise<SpecialtyEntity | null> {
        const specialty = await prismaClient.specialty.findUnique({
            where:{
                id
            },
        })

        return specialty || null
    }
}