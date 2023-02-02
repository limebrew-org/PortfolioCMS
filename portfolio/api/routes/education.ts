import express from "express"
import { EducationController } from "../controllers/Education"
import { TokenMiddleWare } from "../../middleware/verifyToken"

const EducationRouter = express.Router()
const educationController = new EducationController()

EducationRouter.get("/all", educationController.getAllEducationInfo)
EducationRouter.get("/:id", educationController.getEducationById)
EducationRouter.post("/add", TokenMiddleWare, educationController.addEducation)
EducationRouter.put("/update/:id", TokenMiddleWare, educationController.updateEducationById)
EducationRouter.delete("/delete/:id", TokenMiddleWare,educationController.deleteEducationById)
EducationRouter.delete("/delete", TokenMiddleWare, educationController.deleteAllEducationDetails)

export { EducationRouter }