import { randomUUID } from 'crypto'
import { CustomError } from '../../../errors/custom.error'
import { compareEndTimeIsAfter, validationTime } from '../../../utils/date'

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

        if(!data.doctorId) throw new CustomError("Doctor does not exist.")

        if(data.duration <= 0) throw new CustomError("Invalid duration")

        if(!validationTime(data.startAt) || !validationTime(data.endAt)) throw new CustomError("Invalid StartAt/EndAt")
        
        if(!compareEndTimeIsAfter(data.startAt, data.endAt)) throw new CustomError("End time cannot be earlir than start time")
        
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