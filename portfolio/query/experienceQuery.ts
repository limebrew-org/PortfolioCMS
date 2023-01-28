import { ResponseBody } from "../utils/handleResponse"
import { ProfileModel } from "../schema/profile"
import { RequestBodyHandler } from "../utils/handleFields"
import { InternshipModel, JobModel } from "../schema/experience"
import { Request, Response } from "express"
import { ProfileMiddlewareType } from "../utils/types"

class ExperienceQuery {
	//? Static variables
	static schemaName = "experience"

	//TODO: Get all internship details for a profile
	static async getAllInternships(request: Request, response: Response) {
		//? Handle bad request
		if(!RequestBodyHandler.isValidKeys(request.query, ["profile_id"]))
			return ResponseBody.handleBadRequest(response)

		//* Get the profile id from the query
		const profileId: string = request.query["profile_id"].toString()

		//? Query experience details by profile id
		const experienceEntityList = await InternshipModel.find({
			profile_id: profileId
		})

		//* Return response
		return ResponseBody.handleEntityListResponse(
			experienceEntityList,
			response,
			ExperienceQuery.schemaName
		)
	}

	//TODO: Get Internship details by internship id
	static async getInternshipById(request: Request, response: Response) {

	}

	//TODO: Add Internship details 
	static async addInternship(request: Request, response: Response) {

	}

	//TODO: Update Internship details
	static async updateInternshipById(request: Request, response: Response) {

	}

	//TODO: Delete Internship details by internship id
	static async deleteInternshipById(request: Request, response: Response) {

	}

	//TODO: Delete all Internship details for a profile
	static async deleteAllInternships(request: Request, response: Response) {

	}

	//TODO: Get all job details for a profile
	static async getAllJobs(request: Request, response: Response) {
		//? Handle bad request
		if(!RequestBodyHandler.isValidKeys(request.query, ["profile_id"]))
			return ResponseBody.handleBadRequest(response)

		//* Get the profile id from the query
		const profileId: string = request.query["profile_id"].toString()

		//? Query experience details by profile id
		const experienceEntityList = await JobModel.find({
			profile_id: profileId
		})

		//* Return response
		return ResponseBody.handleEntityListResponse(
			experienceEntityList,
			response,
			ExperienceQuery.schemaName
		)
	}

	//TODO: Get job details by job Id
	static async getJobById(request: Request, response: Response) {

	}

	//TODO: Add job details for a profile
	static async addJob(request: Request, response: Response) {

	}
	
	//TODO: Update job by job Id
	static async updateJobById(request: Request, response: Response) {

	}
	
	//TODO: Delete job by job Id
	static async deleteJobById(request: Request, response: Response) {

	}

	//TODO: Delete all jobs for a profile
	static async deleteAllJobs(request: Request, response: Response) {
		
	}
}

export { ExperienceQuery }
