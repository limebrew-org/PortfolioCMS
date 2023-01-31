import { SkillQuery } from "../query/skillQuery"
import { Request, Response } from "express"

//? Get All skills by profile_id (public endpoint)
const getAllSkills = async (request: Request, response: Response) => {
	await SkillQuery.getAllSkills(request, response)
}

const getSkillsById = async (request: Request, response: Response) => {
	await SkillQuery.getSkillById(request, response)
}

const getSkillByField = async (request: Request, response: Response) => {
	await SkillQuery.getSkillByField(request, response)
}

//? Add Skills (one or more) (authentication required)
const addSkills = async (request: Request, response: Response) => {
	await SkillQuery.addSkills(request, response)
}

//? Update Skills by field (one or more) (authentication required)
const updateSkillsById = async (request: Request, response: Response) => {
	await SkillQuery.updateSkillsById(request, response)
}

//? Delete Skill by field (one or more) (authentication required)
const deleteSkillsById = async (request: Request, response: Response) => {
	await SkillQuery.deleteSkillsById(request, response)
}

export {
	getAllSkills,
	getSkillsById,
	getSkillByField,
	addSkills,
	updateSkillsById,
	deleteSkillsById
}
