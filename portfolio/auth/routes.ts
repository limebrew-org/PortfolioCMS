import express from "express"
import { AuthController } from "./controller"
import { TokenMiddleWare } from "../middleware/verifyToken"

const AuthRouter = express.Router()
const authController = new AuthController()

AuthRouter.post("/register", authController.register)
AuthRouter.post("/login", authController.login)
AuthRouter.post("/logout", TokenMiddleWare, authController.logout)
AuthRouter.post("/token", authController.generateToken)

export { AuthRouter }
