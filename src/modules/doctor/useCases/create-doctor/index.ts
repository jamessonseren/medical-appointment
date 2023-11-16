import { SpecialtyPrismaRepository } from "../../../specialty/repositories/implementations/specialty.prisma.repository";
import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/doctor-prisma.repository";
import { CreateDoctorController } from "./crate-doctor.controller";

const userRepository = new UserPrismaRepository()
const doctorRepository = new DoctorPrismaRepository()
const specialtyRepository = new SpecialtyPrismaRepository()

const createDoctorController = new CreateDoctorController(userRepository, doctorRepository, specialtyRepository)

export {createDoctorController}