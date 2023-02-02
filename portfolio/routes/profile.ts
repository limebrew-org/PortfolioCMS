import express from "express"
import { TokenMiddleWare } from "../middleware/verifyToken"
import {
	getProfile,
	updateProfile,
	deleteProfile
} from "../controllers/profile"

const profileRouter = express.Router()

profileRouter.get("/", getProfile)
profileRouter.put("/update", TokenMiddleWare, updateProfile)
profileRouter.delete("/delete", TokenMiddleWare, deleteProfile)

export { profileRouter }
