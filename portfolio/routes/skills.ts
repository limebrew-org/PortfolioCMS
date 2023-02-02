import express from "express"
import {
	getAllSkills,
	getSkillsById,
	getSkillByField,
	addSkills,
	updateSkillsById,
	deleteSkillsById,
} from "../controllers/skills"
import { TokenMiddleWare } from "../middleware/verifyToken"

const skillRouter = express.Router()

skillRouter.get("/all", getAllSkills)
skillRouter.get("/field", getSkillByField)
skillRouter.get("/:id", getSkillsById)
skillRouter.post("/add", TokenMiddleWare,addSkills)
skillRouter.put("/update/:id", TokenMiddleWare, updateSkillsById)
skillRouter.delete("/delete/:id", TokenMiddleWare,deleteSkillsById)


export { skillRouter }
