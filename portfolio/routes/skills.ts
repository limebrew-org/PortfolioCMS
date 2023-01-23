import express from "express"
import {
	getAllSkills,
	getSkillsByField,
	addSkillsByField,
	updateSkillsByField,
	deleteSkillsByField,
	deleteAllSkillsByField,
	deleteAllSkills
} from "../controllers/skills"

const skillRouter = express.Router()

skillRouter.get("/all", getAllSkills)
skillRouter.get("/:field", getSkillsByField)
skillRouter.post("/add/:field", addSkillsByField)
skillRouter.put("/update/:field", updateSkillsByField)
skillRouter.delete("/delete/:field", deleteSkillsByField)
skillRouter.delete("/delete/:field/all", deleteAllSkillsByField)
skillRouter.delete("/delete/all", deleteAllSkills)

export { skillRouter }
