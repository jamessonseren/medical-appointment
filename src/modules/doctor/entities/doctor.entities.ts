import { randomUUID } from 'crypto'
import { CustomError } from '../../../errors/custom.error'

export type DoctorProps = {
    crm: string,
    email: string,
    userId: string,
    specialtyId: string,
}

export class DoctorEntity{
    id: string
    crm: string
    email: string
    userId: string
    specialtyId: string

    private constructor(props: DoctorProps){
        if(!props.crm) throw new CustomError("CRM is required")

        if(props.crm.length !== 6) throw new CustomError("Incorrect CRM")

        if(!props.email) throw new CustomError("Email is required")
        
        if(!props.specialtyId) throw new CustomError("Specialty does not exist")

        this.id = randomUUID(),
        this.crm = props.crm,
        this.email = props.email,
        this.userId = props.userId,
        this.specialtyId = props.specialtyId
        
    }
    
    static create(props: DoctorProps){
        const doctor = new DoctorEntity(props)
        return doctor
    }
}