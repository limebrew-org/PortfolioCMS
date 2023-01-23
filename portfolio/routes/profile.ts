import express from "express"
import { middleware } from "../middleware/verifyJWT"
import {
	getProfile,
	updateProfile,
	deleteProfile
} from "../controllers/profile"

const profileRouter = express.Router()

profileRouter.get("/", getProfile)
profileRouter.put("/update", middleware, updateProfile)
profileRouter.delete("/delete", middleware, deleteProfile)

export { profileRouter }
