import express from "express"
import { ExperienceController } from "../controllers/Experience"
import { TokenMiddleWare } from "../../middleware/verifyToken"

const ExperienceRouter = express.Router()
const experienceController = new ExperienceController()

//? Internship routes
ExperienceRouter.get("/internship/all", experienceController.getAllInternships)
ExperienceRouter.get("/internship/:id", experienceController.getInternshipById)
ExperienceRouter.post("/internship/add", TokenMiddleWare, experienceController.addInternship)
ExperienceRouter.put("/internship/update/:id", TokenMiddleWare, experienceController.updateInternshipById)
ExperienceRouter.delete(
	"/internship/delete/:id",
	TokenMiddleWare,
	experienceController.deleteInternshipById
)
ExperienceRouter.delete("/internship/delete", TokenMiddleWare, experienceController.deleteAllInternships)

//? Job routes
ExperienceRouter.get("/job/all", experienceController.getAllJobs)
ExperienceRouter.get("/job/:id", experienceController.getJobById)
ExperienceRouter.post("/job/add", TokenMiddleWare, experienceController.addJob)
ExperienceRouter.put("/job/update/:id", TokenMiddleWare, experienceController.updateJobById)
ExperienceRouter.delete("/job/delete/:id", TokenMiddleWare, experienceController.deleteJobById)
ExperienceRouter.delete("/job/delete", TokenMiddleWare, experienceController.deleteAllJobs)

export {ExperienceRouter}
