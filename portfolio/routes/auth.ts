import express from "express"
import { register, login, logout, regenerateToken } from "../controllers/auth"

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/token", regenerateToken)

export { authRouter }
