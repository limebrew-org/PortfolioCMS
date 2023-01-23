import { ProjectModel } from "../schema/projects"
import { ProfileModel } from "../schema/profile"
import { ResponseBody } from "../utils/handleResponse"
import { RequestBodyHandler } from "../utils/handleFields"
import { ProjectField } from "../models/projects"
import { SkillQuery } from "./skillQuery"
import { Request, Response } from "express"

class ProjectQuery {
	//? get project
	static async getProject(request: Request, response: Response) {}

	//? Add project
	static async addProject(request: Request, response: Response) {}

	//? Update Project
	static async updateProject(request: Request, response: Response) {}
}

export { ProjectQuery }
