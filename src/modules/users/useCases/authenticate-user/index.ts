import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { JWTToken } from "../../../../infra/shared/token/jwt.token";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { AuthenticaUserController } from "./authenticate-user.controller";

const userPrismaRepository = new UserPrismaRepository()
const passwordCrypto = new PasswordBcrypt()
const tokenGenerated = new JWTToken()

const authenticateUserController = new AuthenticaUserController(userPrismaRepository, passwordCrypto, tokenGenerated)

export {authenticateUserController}