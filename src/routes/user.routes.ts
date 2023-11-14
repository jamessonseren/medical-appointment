import { Router } from "express";
import { CreateUserController } from "../useCases/create-user/create-user.controller";

const userRouter = Router()

userRouter.post("/users", new CreateUserController().handle )

export { userRouter }