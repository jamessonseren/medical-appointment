import { Router } from "express";
import { createSpecialtyController } from "../modules/specialty/useCases/create-specialty";
import { ensureAuth } from "../infra/shared/http/middleware/ensure.auth.middleware";
import { ensureAdmin } from "../infra/shared/http/middleware/ensure-admin.middlware";

const specialtyRouter = Router()

specialtyRouter.post("/specialties", 
ensureAuth,
ensureAdmin,
async (request, response) => {
    await createSpecialtyController.handle(request, response)
} )

export { specialtyRouter }