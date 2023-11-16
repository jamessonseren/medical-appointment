import { test, expect, describe } from 'vitest'
import { DoctorEntity } from '../doctor.entities'

describe("Doctor Entity", () => {
    test("Should be able to create a new doctor", () => {
        const doctor = DoctorEntity.create({
            crm: "123456",
            email: 'email@email.com',
            specialtyId: 'SPEC_ID',
            userId: 'USER_ID',
        })

        console.log({ doctor })

        expect(doctor).toBeInstanceOf(DoctorEntity)
        expect(doctor).toHaveProperty("id")
    })

    test("Should not be able to create a new doctor with invalid CRM", () => {

        expect(() => {
            const doctor = DoctorEntity.create({
                crm: "",
                email: 'email@email.com',
                specialtyId: 'SPEC_ID',
                userId: 'USER_ID',
            })
        }).toThrow("CRM is required")
    })

    test("Should not be able to create a new doctor with invalid CRM LENGTH", () => {

        expect(() => {
            const doctor = DoctorEntity.create({
                crm: "123",
                email: 'email@email.com',
                specialtyId: 'SPEC_ID',
                userId: 'USER_ID',
            })
        }).toThrow("Incorrect CRM")
    })

    test("Should not be able to create a new doctor with invalid CRM LENGTH", () => {

        expect(() => {
            const doctor = DoctorEntity.create({
                crm: "123456",
                email: '',
                specialtyId: 'SPEC_ID',
                userId: 'USER_ID',
            })
        }).toThrow("Email is required")
    })
})

//npm i @vitest/coverage-istanbul -D