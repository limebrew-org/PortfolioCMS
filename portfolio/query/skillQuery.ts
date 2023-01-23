import { ProfileModel } from "../schema/profile"
import { SkillsModel } from "../schema/skills"
import { ResponseBody } from "../utils/handleResponse"
import { RequestBodyHandler } from "../utils/handleFields"
import { SkillField } from "../models/skills"
import { Request, Response } from "express"

class SkillQuery {
	//? Get skills
	static async getSkills(request: Request, response: Response) {}

	//?  Add skills
	static async addSkills(request: Request, response: Response) {}

	//? Update skills
	static async updateSkills(rrequest: Request, response: Response) {}
}

export { SkillQuery }
