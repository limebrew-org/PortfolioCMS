import express from "express"
import { EducationController } from "../controllers/Education"
import { TokenMiddleWare } from "../../middleware/verifyToken"

const EducationRouter = express.Router()
const educationController = new EducationController()

EducationRouter.get("/all", educationController.getAll)
EducationRouter.get("/:id", educationController.getById)
EducationRouter.post("/add", TokenMiddleWare, educationController.add)
EducationRouter.put("/update/:id", TokenMiddleWare, educationController.updateById)
EducationRouter.delete("/delete/:id", TokenMiddleWare,educationController.deleteById)
EducationRouter.delete("/delete", TokenMiddleWare, educationController.deleteAll)

export { EducationRouter }