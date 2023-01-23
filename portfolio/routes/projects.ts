import express from "express"
import {
	getAllProjects,
	getProjectById,
	addProject,
	updateProjectById,
	deleteProjectById,
	deleteAllProjects
} from "../controllers/projects"
import { middleware } from "../middleware/verifyJWT"

const projectRouter = express.Router()

projectRouter.get("/all", getAllProjects)
projectRouter.get("/:id", getProjectById)
projectRouter.post("/add", middleware,addProject)
projectRouter.put("/update/:id", updateProjectById)
projectRouter.delete("/delete/:id", deleteProjectById)
projectRouter.delete("/delete/all", deleteAllProjects)

export { projectRouter }
