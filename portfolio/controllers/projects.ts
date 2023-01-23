import { ProjectQuery } from "../query/projectQuery"
import { Request, Response } from "express"

//? Get All projects by user_id (public endpoint)
const getAllProjects = async (request: Request, response: Response) => {}

//? Get project by id and user_id  (public endpoint)
const getProjectById = async (request: Request, response: Response) => {}

//? Add project (authentication required)
const addProject = async (request: Request, response: Response) => {}

//? Update project by project_id (authentication required)
const updateProjectById = async (request: Request, response: Response) => {}

//? Delete project by id (authentication required)
const deleteProjectById = async (request: Request, response: Response) => {}

//? Delete project by id (authentication required)
const deleteAllProjects = async (request: Request, response: Response) => {}

export {
	getAllProjects,
	getProjectById,
	addProject,
	updateProjectById,
	deleteProjectById,
	deleteAllProjects
}
