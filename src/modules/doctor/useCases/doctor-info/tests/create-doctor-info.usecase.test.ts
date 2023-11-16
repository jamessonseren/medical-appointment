import { describe, test, expect } from 'vitest'
import dayjs from 'dayjs'
import { CreateDoctorInfoUseCase, DoctorInfoRequest } from '../CreateDoctorInfoUseCase'
import { DoctorMemoryRepository } from '../../../repositories/implementations/doctor-memory.repository'

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
})