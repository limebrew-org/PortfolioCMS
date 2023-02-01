import express from "express"
import { AuthController } from "./controller"

const AuthRouter = express.Router()
const authController = new AuthController()

AuthRouter.post("/register", authController.register)
AuthRouter.post("/login", authController.login)
AuthRouter.post("/logout", authController.logout)
AuthRouter.post("/token", authController.generateToken)

export { AuthRouter }