import { describe, test, expect } from 'vitest'
import dayjs from 'dayjs'
import { CreateDoctorInfoUseCase, DoctorInfoRequest } from '../CreateDoctorInfoUseCase'
import { DoctorMemoryRepository } from '../../../repositories/implementations/doctor-memory.repository'
import {randomUUID} from 'crypto'
describe("Create Doctor Info", () => {
    test("Should not be able to create a doctor if doctor does not exist", () => {
        const doctorRepository = new DoctorMemoryRepository()
        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository)

        const doctorInfo: DoctorInfoRequest = {
            startAt: dayjs().startOf('day').add(10, 'hour').format("HH:mm"),
            endAt: dayjs().startOf('day').add(18, 'hour').format("HH:mm"),
            price: 150,
            duration: 10
        }

        expect(async () => {
            await createDoctorInfoUseCase.execute(doctorInfo, 'INVALID_ID')
        }).rejects.toThrow("Doctor does not exist")
    })

    test("Should not be able to create a doctor if doctor endAt is before startAt", async () => {
        const doctorRepository = new DoctorMemoryRepository()

        const userId = '56a15a4a'
        
        await doctorRepository.save({
            id:randomUUID(),
            crm: '123456',
            email:'jose@jose.com.br',
            specialtyId: randomUUID(),
            userId: userId
        })

        const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository)

        const doctorInfo: DoctorInfoRequest = {
            startAt: dayjs().startOf('day').add(18, 'hour').format("HH:mm"),
            endAt: dayjs().startOf('day').add(10, 'hour').format("HH:mm"),
            price: 150,
            duration: 10
        }

        expect(async () => {
            await createDoctorInfoUseCase.execute(doctorInfo, userId)
        }).rejects.toThrow("End time cannot be earlier than start time")
    })
})