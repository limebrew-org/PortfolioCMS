import express from "express"
import {
	getAllSkills,
	getSkillsById,
	addSkills,
	updateSkillsById,
	deleteSkillsById,
} from "../controllers/skills"
import { middleware } from "../middleware/verifyJWT"

const skillRouter = express.Router()

skillRouter.get("/all", getAllSkills)
skillRouter.get("/:id", getSkillsById)
skillRouter.post("/add", middleware,addSkills)
skillRouter.put("/update/:id", middleware, updateSkillsById)
skillRouter.delete("/delete/:id", middleware,deleteSkillsById)

export { skillRouter }
