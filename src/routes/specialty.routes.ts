import { Router } from "express";
import { createSpecialtyController } from "../modules/specialty/useCases/create-specialty";

const specialtyRouter = Router()

specialtyRouter.post("/specialty", async (request, response) => {
    await createSpecialtyController.handle(request, response)
} )

export { specialtyRouter }