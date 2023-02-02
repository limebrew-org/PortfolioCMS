import express from "express"
import {
	getAllProjects,
	getProjectById,
	addProject,
	updateProjectById,
	deleteProjectById,
	deleteAllProjects
} from "../controllers/projects"
import { TokenMiddleWare } from "../middleware/verifyToken"

const projectRouter = express.Router()

projectRouter.get("/all", getAllProjects)
projectRouter.get("/:id", getProjectById)
projectRouter.post("/add", TokenMiddleWare, addProject)
projectRouter.put("/update/:id", TokenMiddleWare, updateProjectById)
projectRouter.delete("/delete/:id", TokenMiddleWare, deleteProjectById)
projectRouter.delete("/delete", TokenMiddleWare, deleteAllProjects)

export { projectRouter }
