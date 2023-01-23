import { EducationQuery } from "../query/educationQuery"
import { Request, Response } from "express"

//? Get all education info by profile_id (public endpoint)
const getAllEducationInfo = async (request: Request, response: Response) => {
	await EducationQuery.getAll(request, response)
}

//? Get education by education_id and profile_id (public endpoint)
const getEducationById = async (request: Request, response: Response) => {
	await EducationQuery.getById(request, response)
}

//? Add education (authentication required)
const addEducation = async (request: Request, response: Response) => {
	await EducationQuery.add(request, response)
}

//? Update education (authentication required)
const updateEducationByID = async (request: Request, response: Response) => {
	await EducationQuery.update(request, response)
}

//? Delete education by education_id (authentication required)
const deleteEducationByID = async (request: Request, response: Response) => {
	await EducationQuery.deleteById(request, response)
}

//? Delete all education details (authentication required)
const deleteAllEducationInfo = async (request: Request, response: Response) => {
	await EducationQuery.deleteAll(request, response)
}

export {
	getAllEducationInfo,
	getEducationById,
	addEducation,
	updateEducationByID,
	deleteEducationByID,
	deleteAllEducationInfo
}
