import { ExperienceModel } from "../schema/experience"
import { ResponseBody } from "../utils/handleResponse"
import { ProfileModel } from "../schema/profile"
import { RequestBodyHandler } from "../utils/handleFields"
import { ExperienceField } from "../models/experience"
import { Request, Response } from "express"

class ExperienceQuery {
	//? get experience
	static async getExperience(request: Request, response: Response) {}

	//?Add experience
	static async addExperience(request: Request, response: Response) {}

	//? Update experience
	static async updateExperience(request: Request, response: Response) {}
}

export { ExperienceQuery }
