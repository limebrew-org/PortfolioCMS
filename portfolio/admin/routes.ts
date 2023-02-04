import express from "express"
import { AdminController } from "./controller"

const AdminRouter = express.Router()
const adminController = new AdminController()

//? Profiles
AdminRouter.get("/profile", adminController.getProfileByQuery)

//? Education
AdminRouter.get("/education", adminController.getEducationByQuery)

//? Experience
AdminRouter.get(
	"/experience/internships",
	adminController.getInternshipsByQuery
)
AdminRouter.get("/experience/jobs", adminController.getJobsByQuery)

//? Projects
AdminRouter.get("/projects", adminController.getProjectByQuery)

//? Skills
AdminRouter.get("/skills", adminController.getSkillsByQuery)

//? Token
AdminRouter.get("/token", adminController.getTokensByQuery)

export { AdminRouter }
