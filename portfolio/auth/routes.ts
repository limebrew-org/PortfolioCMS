import express from "express"
import { AuthController } from "./controller"
import { TokenMiddleWare } from "../middleware/verifyToken"
import { generateAPIKey } from "../utils/handleToken"

const AuthRouter = express.Router()
const authController = new AuthController()

AuthRouter.post("/register", authController.register)
AuthRouter.post("/login", authController.login)
AuthRouter.post("/logout", TokenMiddleWare, authController.logout)
AuthRouter.post("/token", authController.generateToken)
AuthRouter.post("/api-key", TokenMiddleWare,authController.generateKey)

export { AuthRouter }
