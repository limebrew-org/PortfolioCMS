import express from "express"
import {
	getAllInternships,
	getInternshipById,
	addInternship,
	updateInternshipById,
	deleteInternshipById,
	deleteAllInternships,
	getAllJobs,
	getJobById,
	addJob,
	updateJobById,
	deleteJobById,
	deleteAllJobs
} from "../controllers/experience"
import { TokenMiddleWare } from "../middleware/verifyToken"

const experienceRouter = express.Router()

//? Internship routes
experienceRouter.get("/internship/all", getAllInternships)
experienceRouter.get("/internship/:id", getInternshipById)
experienceRouter.post("/internship/add", TokenMiddleWare, addInternship)
experienceRouter.put("/internship/update/:id", TokenMiddleWare, updateInternshipById)
experienceRouter.delete(
	"/internship/delete/:id",
	TokenMiddleWare,
	deleteInternshipById
)
experienceRouter.delete("/internship/delete", TokenMiddleWare, deleteAllInternships)

//? Job routes
experienceRouter.get("/job/all", getAllJobs)
experienceRouter.get("/job/:id", getJobById)
experienceRouter.post("/job/add", TokenMiddleWare, addJob)
experienceRouter.put("/job/update/:id", TokenMiddleWare, updateJobById)
experienceRouter.delete("/job/delete/:id", TokenMiddleWare, deleteJobById)
experienceRouter.delete("/job/delete", TokenMiddleWare, deleteAllJobs)

export { experienceRouter }
