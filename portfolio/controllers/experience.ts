import { ExperienceQuery } from "../query/experienceQuery"
import { Request, Response } from "express"

//? Get All Experience info by user_id (public endpoint)
const getAllInternships = async (request: Request, response: Response) => {
	await ExperienceQuery.getAllInternships(request, response)
}

//? Get Internship details (one or more) by user_id (public endpoint)
const getInternshipById = async (request: Request, response: Response) => {
	await ExperienceQuery.getInternshipById(request, response)
}

//? Add Internship details (one or more) (authentication required)
const addInternship = async (request: Request, response: Response) => {
	await ExperienceQuery.addInternship(request, response)
}

//? Update Internship details (one or more) (authentication required)
const updateInternshipById = async (request: Request, response: Response) => {
	await ExperienceQuery.updateInternshipById(request, response)
}

//? Delete Internship by Id (authentication required)
const deleteInternshipById = async (request: Request, response: Response) => {
	await ExperienceQuery.deleteInternshipById(request, response)
}

//? Delete All Internship details (authentication required)
const deleteAllInternships = async (request: Request, response: Response) => {
	await ExperienceQuery.deleteAllInternships(request, response)
}

//? Get Job details (one or more) by user_id (public endpoint)
const getAllJobs = async (request: Request, response: Response) => {
	await ExperienceQuery.getAllJobs(request, response)
}

//? Get Job details (one or more) by user_id (public endpoint)
const getJobById = async (request: Request, response: Response) => {
	await ExperienceQuery.getJobById(request, response)
}

//? Add Job details (one or more) (authentication required)
const addJob = async (request: Request, response: Response) => {
	await ExperienceQuery.addJob(request, response)
}

//? Update Job details (one or more) (authentication required)
const updateJobById = async (request: Request, response: Response) => {
	await ExperienceQuery.updateJobById(request, response)
}

//? Delete Job by Id (authentication required)
const deleteJobById = async (request: Request, response: Response) => {
	await ExperienceQuery.deleteJobById(request, response)
}

//? Delete All Job details (authentication required)
const deleteAllJobs = async (request: Request, response: Response) => {
	await ExperienceQuery.deleteAllJobs(request, response)
}

export {
	getAllInternships,
	getInternshipById,
	addInternship,
	updateInternshipById,
	deleteInternshipById,
	deleteAllInternships,
	getAllJobs,
	getJobById,
	addJob,
	updateJobById,
	deleteJobById,
	deleteAllJobs
}
