import { ExperienceQuery } from "../query/experienceQuery"
import { Request, Response } from "express"

//? Get All Experience info by user_id (public endpoint)
const getAllExperienceInfo = async (request: Request, response: Response) => {}

//? Get Internship details (one or more) by user_id (public endpoint)
const getInternshipInfo = async (request: Request, response: Response) => {}

//? Get Job details (one or more) by user_id (public endpoint)
const getJobInfo = async (request: Request, response: Response) => {}

//? Add Internship details (one or more) (authentication required)
const addInternshipInfo = async (request: Request, response: Response) => {}

//? Add Job details (one or more) (authentication required)
const addJobInfo = async (request: Request, response: Response) => {}

//? Update Internship details (one or more) (authentication required)
const updateInternshipInfo = async (request: Request, response: Response) => {}

//? Update Job details (one or more) (authentication required)
const updateJobInfo = async (request: Request, response: Response) => {}

//? Delete Internship by Id (authentication required)
const deleteInternshipById = (request: Request, response: Response) => {}

//? Delete Job by Id (authentication required)
const deleteJobById = async (request: Request, response: Response) => {}

//? Delete All Internship details (authentication required)
const deleteAllInternshipInfo = async (
	request: Request,
	response: Response
) => {}

//? Delete All Job details (authentication required)
const deleteAllJobInfo = async (request: Request, response: Response) => {}

//? Delete All Experience details (authentication required)
const deleteAllExperienceInfo = async (
	request: Request,
	response: Response
) => {}

export {
	getAllExperienceInfo,
	getInternshipInfo,
	getJobInfo,
	addInternshipInfo,
	addJobInfo,
	updateInternshipInfo,
	updateJobInfo,
	deleteInternshipById,
	deleteJobById,
	deleteAllExperienceInfo,
	deleteAllInternshipInfo,
	deleteAllJobInfo
}
