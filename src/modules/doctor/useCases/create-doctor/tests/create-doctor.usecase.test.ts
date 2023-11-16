import { test, describe, expect, beforeAll } from "vitest"
import { randomUUID } from 'crypto'
import { CreateDoctorUseCase, CreateDoctorRequest } from "../create-doctor.usecase"
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository"
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor-memory.repository"
import { SpecialtyMemoryRepository } from "../../../../specialty/repositories/implementations/specialty.memory.repository"
import { SpecialtyEntity } from "../../../../specialty/entities/specialty.entity"
import { ISpecialtyRepository } from "../../../../specialty/repositories/specialty.repository"

let specialtyRepository: ISpecialtyRepository
let specialty: SpecialtyEntity

beforeAll(async () => {
    specialtyRepository = new SpecialtyMemoryRepository()

    specialty = SpecialtyEntity.create({
        description: "DESC_TEST",
        name: "NAME_TEST"
    })

    await specialtyRepository.save(specialty)
})
describe("Create Doctor Use Case", () => {
    
    test("Should be able to create a new Doctor", async () => {

        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()
        
        
        const doctorMock: CreateDoctorRequest = {
            userName: 'username_test',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com',
            crm: '123456',
            specialtyId: specialty.id

        }

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialtyRepository)
        const doctorCreated = await createDoctorUseCase.execute(doctorMock)

        expect(doctorCreated).toHaveProperty('id')
    })
    test("Should not be able to create a new Doctor with existing CRM", async () => {
        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()
        
        const doctorMock: CreateDoctorRequest = {
            userName: 'username_test',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com',
            crm: '123456',
            specialtyId: specialty.id

        }
        const doctorMockDuplicated: CreateDoctorRequest = {
            userName: 'username_duplicated',
            name: 'name_test',
            password: 'password_test',
            email: 'emailDuplicated@email.com',
            crm: '123456',
            specialtyId: specialty.id

        }

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialtyRepository)
        
        
        await createDoctorUseCase.execute(doctorMock)

        expect(async () => {
            await createDoctorUseCase.execute(doctorMockDuplicated)
        }).rejects.toThrow("CRM already exists")

    })
    test("Should not be able to create a new Doctor with incorrect CRM", async () => {
        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()
        

        const doctorMock: CreateDoctorRequest = {
            userName: 'username_test',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com',
            crm: '12346',
            specialtyId: specialty.id

        }
        

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialtyRepository)
        
        
        expect(async () => {
            await createDoctorUseCase.execute(doctorMock)
        }).rejects.toThrow("Incorrect CRM")

    })

    test("Should not be able to create a new Doctor if specialty does not exist", async () => {
        const userRepository = new UserMemoryRepository()
        const doctorRepository = new DoctorMemoryRepository()
        

        const doctorMock: CreateDoctorRequest = {
            userName: 'username_test',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com',
            crm: '12346',
            specialtyId: ''

        }
        

        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialtyRepository)
        
        
        expect(async () => {
            await createDoctorUseCase.execute(doctorMock)
        }).rejects.toThrow("Specialty does not exists")

    })
})