import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Specialty } from "../../entities/specialty.entity";
import { ISpecialtyRepository } from "../specialty.repository";


export class SpecialtyPrismaRepository implements ISpecialtyRepository {
    async save(data: Specialty): Promise<Specialty> {
        
        const specialty = await prismaClient.specialty.create({
            data:{
                id: data.id,
                name: data.name,
                description: data.description
                
            }
        })

        return specialty
    }
    
}