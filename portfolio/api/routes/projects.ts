import express from "express"
import { ProjectController } from "../controllers/Projects"
import { TokenMiddleWare } from "../../middleware/verifyToken"

const ProjectRouter = express.Router()
const projectController = new ProjectController()

ProjectRouter.get("/all", projectController.getAll)
ProjectRouter.get("/:id", projectController.getById)
ProjectRouter.post("/add", TokenMiddleWare, projectController.add)
ProjectRouter.put("/update/:id", TokenMiddleWare, projectController.updateById)
ProjectRouter.delete(
	"/delete/:id",
	TokenMiddleWare,
	projectController.deleteById
)
ProjectRouter.delete("/delete", TokenMiddleWare, projectController.deleteAll)

export { ProjectRouter }
