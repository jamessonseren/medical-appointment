import { Request, Response, response } from "express";
import { ISpecialtyRepository } from "../../repositories/specialty.repository";
import { CreateSpecialtyUseCase } from "./create-specialty.usecase";
import { logger } from "../../../../utils/logger";

export class CreateSpecialtyController {

    constructor(private specialtyRepository: ISpecialtyRepository) { }

    async handle(req: Request, res: Response) {

        try {
            const useCase = new CreateSpecialtyUseCase(this.specialtyRepository)

            const result = await useCase.execute(req.body)

            return res.json(result)

        } catch (err: any) {

            logger.error(err.stack)

            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}