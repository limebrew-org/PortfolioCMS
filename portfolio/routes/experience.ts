import express from "express"
import {
	getAllExperienceInfo,
	getInternshipInfo,
	getJobInfo,
	addInternshipInfo,
	addJobInfo,
	updateInternshipInfo,
	updateJobInfo,
	deleteInternshipById,
	deleteJobById,
	deleteAllExperienceInfo,
	deleteAllInternshipInfo,
	deleteAllJobInfo
} from "../controllers/experience"
import { middleware } from "../middleware/verifyJWT"

const experienceRouter = express.Router()

experienceRouter.get("/all", getAllExperienceInfo)
experienceRouter.get("/internship", getInternshipInfo)
experienceRouter.get("/job", getJobInfo)
experienceRouter.post("/add/internship", middleware, addInternshipInfo)
experienceRouter.post("/add/job", middleware, addJobInfo)
experienceRouter.put("/update/internship", middleware, updateInternshipInfo)
experienceRouter.put("/update/job", middleware, updateJobInfo)
experienceRouter.delete(
	"/delete/internship/:id",
	middleware,
	deleteInternshipById
)
experienceRouter.delete("/delete/job/:id", middleware, deleteJobById)
experienceRouter.delete("/delete/all", middleware, deleteAllExperienceInfo)
experienceRouter.delete(
	"/delete/internship/all",
	middleware,
	deleteAllInternshipInfo
)
experienceRouter.delete("/delete/job/all", middleware, deleteAllJobInfo)

export { experienceRouter }
