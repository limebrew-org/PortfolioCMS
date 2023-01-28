import { ProjectQuery } from "../query/projectQuery"
import { Request, Response } from "express"

//? Get All projects by user_id (public endpoint)
const getAllProjects = async (request: Request, response: Response) => {
	await ProjectQuery.getAll(request, response)
}

//? Get project by id and user_id  (public endpoint)
const getProjectById = async (request: Request, response: Response) => {
	await ProjectQuery.getById(request, response)
}

//? Add project (authentication required)
const addProject = async (request: Request, response: Response) => {
	await ProjectQuery.add(request, response)
}

//? Update project by project_id (authentication required)
const updateProjectById = async (request: Request, response: Response) => {
	await ProjectQuery.update(request, response)
}

//? Delete project by id (authentication required)
const deleteProjectById = async (request: Request, response: Response) => {
	await ProjectQuery.deleteById(request, response)
}

//? Delete all projects (authentication required)
const deleteAllProjects = async (request: Request, response: Response) => {
	await ProjectQuery.deleteAll(request, response)
}

export {
	getAllProjects,
	getProjectById,
	addProject,
	updateProjectById,
	deleteProjectById,
	deleteAllProjects
}
