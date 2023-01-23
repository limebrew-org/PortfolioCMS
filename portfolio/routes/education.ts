import express from "express"
import {
	getAllEducationInfo,
	getEducationById,
	addEducation,
	updateEducationByID,
	deleteEducationByID,
	deleteAllEducationInfo
} from "../controllers/education"
import { middleware } from "../middleware/verifyJWT"

const educationRouter = express.Router()

educationRouter.get("/all", getAllEducationInfo)
educationRouter.get("/:id", getEducationById)
educationRouter.post("/add", middleware, addEducation)
educationRouter.put("/update/:id", middleware, updateEducationByID)
educationRouter.delete("/delete/:id", middleware, deleteEducationByID)
educationRouter.delete("/delete", middleware, deleteAllEducationInfo)

export { educationRouter }
