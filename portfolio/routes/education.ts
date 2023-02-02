import express from "express"
import {
	getAllEducationInfo,
	getEducationById,
	addEducation,
	updateEducationByID,
	deleteEducationByID,
	deleteAllEducationInfo
} from "../controllers/education"
import { TokenMiddleWare } from "../middleware/verifyToken"

const educationRouter = express.Router()

educationRouter.get("/all", getAllEducationInfo)
educationRouter.get("/:id", getEducationById)
educationRouter.post("/add", TokenMiddleWare, addEducation)
educationRouter.put("/update/:id", TokenMiddleWare, updateEducationByID)
educationRouter.delete("/delete/:id", TokenMiddleWare, deleteEducationByID)
educationRouter.delete("/delete", TokenMiddleWare, deleteAllEducationInfo)

export { educationRouter }
