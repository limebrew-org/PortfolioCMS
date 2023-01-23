import { SkillQuery } from "../query/skillQuery"
import { Request, Response } from "express"

//? Get All skills by profile_id (public endpoint)
const getAllSkills = async (request: Request, response: Response) => {}

const getSkillsByField = async (request: Request, response: Response) => {}

//? Add Skills (one or more) (authentication required)
const addSkillsByField = async (request: Request, response: Response) => {}

//? Update Skills by field (one or more) (authentication required)
const updateSkillsByField = async (request: Request, response: Response) => {}

//? Delete Skill by field (one or more) (authentication required)
const deleteSkillsByField = async (request: Request, response: Response) => {}

//? Delete All Skills by field (authentication required)
const deleteAllSkillsByField = async (
	request: Request,
	response: Response
) => {}

//? Delete All Skills (authentication required)
const deleteAllSkills = async (request: Request, response: Response) => {}

export {
	getAllSkills,
	getSkillsByField,
	addSkillsByField,
	updateSkillsByField,
	deleteSkillsByField,
	deleteAllSkillsByField,
	deleteAllSkills
}
