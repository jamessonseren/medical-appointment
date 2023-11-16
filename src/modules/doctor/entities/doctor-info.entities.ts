import { randomUUID } from 'crypto'

export type DoctorInfoProps = {
    duration: number
    price: number
    startAt: string
    endAt: string
    doctorId: string
}

export class DoctorInfoEntity{
    id: string
    duration: number
    price: number
    startAt: string
    endAt: string
    doctorId: string

    private constructor(data: DoctorInfoProps){
        this.id = randomUUID()
        this.duration = data.duration
        this.price = data.price
        this.startAt = data.startAt
        this.endAt = data.endAt
        this.doctorId = data.doctorId
    }

    static create(data: DoctorInfoProps){
        const doctorInfo = new DoctorInfoEntity(data)
        return doctorInfo
    }

}