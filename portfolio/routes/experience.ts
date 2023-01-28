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
	deleteAllJobs,
	
} from "../controllers/experience"
import { middleware } from "../middleware/verifyJWT"

const experienceRouter = express.Router()

//? Internship routes
experienceRouter.get("/internship/all", getAllInternships)
experienceRouter.get("/internship/:id", getInternshipById)
experienceRouter.post("/internship/add", middleware, addInternship)
experienceRouter.put("/internship/update/:id", middleware, updateInternshipById)
experienceRouter.delete(
	"/internship/delete/:id",
	middleware,
	deleteInternshipById
)
experienceRouter.delete(
	"/internship/delete",
	middleware,
	deleteAllInternships
)

//? Job routes
experienceRouter.get("/job/all", getAllJobs)
experienceRouter.get("/job/:id", getJobById)
experienceRouter.post("/job/add", middleware, addJob)
experienceRouter.put("/job/update/:id", middleware, updateJobById)
experienceRouter.delete("/job/delete/:id", middleware, deleteJobById)
experienceRouter.delete("/job/delete", middleware, deleteAllJobs)

export { experienceRouter }
