import express from "express"
import { TokenMiddleWare } from "../../middleware/verifyToken"
import { ProfileController } from "../controllers/Profile"

const ProfileRouter = express.Router()
const profileController = new ProfileController()

ProfileRouter.get("/:id", profileController.getById)
ProfileRouter.put("/update", TokenMiddleWare, profileController.update)
ProfileRouter.delete("/delete", TokenMiddleWare, profileController.delete)

export { ProfileRouter }
