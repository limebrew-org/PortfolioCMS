import { ResponseBody } from "../utils/handleResponse"
import { RequestBodyHandler } from "../utils/handleFields"
import { InternshipModel, JobModel } from "../schema/experience"
import { Request, Response } from "express"
import {
	ProfileMiddlewareType,
	ExperienceFieldType,
	InternshipSchemaType,
	ExperienceUpdateType,
	JobSchemaType
} from "../utils/types"
import { PORTFOLIO_EXPERIENCE_FIELDS } from "../utils/constants"

class ExperienceQuery {
	//? Validate technology schema
	static isValidTechnologyList(technologies: Array<String>) {
		//? Check if technologies list is empty
		if (technologies.length === 0) return false

		//? If not empty, loop over all the elements and check if the value is a string
		for (let i = 0; i < technologies.length; i++) {
			const technology = technologies[i]
			if (typeof technology !== "string") return false
		}
		return true
	}

	//? Validate Schema
	static isValidSchema(requestBody: ExperienceFieldType, router: String) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? If no properties exist
		if (reqBodyKeys.length === 0) return false

		//* Handle for adding internship/job
		if (router === "ADD") {
			//? Handle mandatory fields
			for (let i = 0; i < PORTFOLIO_EXPERIENCE_FIELDS.length; i++) {
				const field = PORTFOLIO_EXPERIENCE_FIELDS[i].toString()
				if (!requestBody.hasOwnProperty(field)) return false

				if (field === "technologies") {
					if (
						!ExperienceQuery.isValidTechnologyList(
							requestBody[field]
						)
					)
						return false
				} else if (
					typeof requestBody[field] !== "string" ||
					requestBody[field].length === 0
				)
					return false
			}
			return true
		}

		//* Handle for Updating Internship/Job
		if (router === "UPDATE") {
			//? Handle optional fields
			for (let i = 0; i < reqBodyKeys.length; i++) {
				const experienceKey = reqBodyKeys[i]
				if (!PORTFOLIO_EXPERIENCE_FIELDS.includes(experienceKey))
					return false

				if (experienceKey === "technologies") {
					if (
						!ExperienceQuery.isValidTechnologyList(
							requestBody[experienceKey]
						)
					)
						return false
				} else if (
					typeof requestBody[experienceKey] !== "string" ||
					requestBody[experienceKey]?.length === 0
				)
					return false
			}
			return true
		}
		return false
	}

	//? Set and Update fields
	static setAndUpdate(
		requestBody: ExperienceUpdateType,
		internshipEntity: Object
	) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? Set the field if exists
		for (let i = 0; i < reqBodyKeys.length; i++) {
			const internshipKey = reqBodyKeys[i]
			if (PORTFOLIO_EXPERIENCE_FIELDS.includes(internshipKey))
				internshipEntity[internshipKey] = requestBody[internshipKey]
		}
	}

	//TODO: Get all internship details for a profile
	static async getAllInternships(request: Request, response: Response) {
		//? Handle bad request
		if (!RequestBodyHandler.isValidKeys(request.query, ["profile_id"]))
			return ResponseBody.handleBadRequest(response)

		//* Get the profile id from the query
		const profileId: String = request.query["profile_id"].toString()

		//? Query internship details by profile id
		const internshipEntityList = await InternshipModel.find({
			profile_id: profileId
		})

		//* Return response
		return ResponseBody.handleEntityListResponse(
			internshipEntityList,
			response,
			"internship"
		)
	}

	//TODO: Get Internship details by internship id
	static async getInternshipById(request: Request, response: Response) {
		//? Handle bad request
		if (!RequestBodyHandler.isValidKeys(request.params, ["id"]))
			return ResponseBody.handleBadRequest(response)

		//? Get the internship id from the params
		const internshipId: String = request.params["id"].toString()

		//? Query the experience details by internship id
		const internshipEntity = await InternshipModel.findOne({
			_id: internshipId
		})

		//? Return response
		return ResponseBody.handleNullEntityResponse(
			internshipEntity,
			response,
			"internship"
		)
	}

	//TODO: Add Internship details
	static async addInternship(request: Request, response: Response) {
		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: InternshipSchemaType = request.body

		//? Handle bad request
		if (!ExperienceQuery.isValidSchema(inputUserDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Set the profile id from middleware
		inputUserDetails.profile_id = profile._id.toString()

		//? Create an internship entity into the database
		const newInternshipEntity = new InternshipModel(inputUserDetails)

		//? Save the new internship entity into the database
		newInternshipEntity
			.save()
			.then((internshipInfo) => {
				return ResponseBody.success_add(response, {
					status: 200,
					message: `Success! Internship details added successfully for profile: ${profile.username}`,
					data: internshipInfo
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while adding Internship details for profile: ${profile.username} ! Error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Update Internship details
	static async updateInternshipById(request: Request, response: Response) {
		//? Query by internship id
		const internshipId: String = request.params["id"].toString()

		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: InternshipSchemaType = request.body

		//? Handle bad request
		if (!ExperienceQuery.isValidSchema(inputUserDetails, "UPDATE"))
			return ResponseBody.handleBadRequest(response)

		//? Get internship entity by internship id and profile id
		const internshipEntity = await InternshipModel.findOne({
			_id: internshipId,
			profile_id: profile._id.toString()
		})

		//? Check if internship details exists for this id
		if (internshipEntity === null)
			return ResponseBody.error_not_found(response, {
				status: 404,
				message: `Error! Internship details not found for id: ${internshipId}, for profile: ${profile.username}`,
				data: {}
			})

		//? If internshipEntity found, update the internship by request body
		ExperienceQuery.setAndUpdate(inputUserDetails, internshipEntity)

		//? Save the updated internship entity
		internshipEntity
			.save()
			.then(() => {
				return ResponseBody.success_update(response, {
					status: 201,
					message: `Internship details updated successfully for internship id: ${internshipId}, for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while updating internship details, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Delete Internship details by internship id
	static async deleteInternshipById(request: Request, response: Response) {
		//? Grab the internship id
		const internshipId: String = request.params["id"].toString()

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete the internship entity
		InternshipModel.deleteOne({
			_id: internshipId,
			profile_id: profile._id
		})
			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Internship details not found for id ${internshipId}, for profile: ${profile.username}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `Internship details deleted successfully for internship id: ${internshipId}, for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while deleting internship details, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Delete all Internship details for a profile
	static async deleteAllInternships(request: Request, response: Response) {
		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete all internship entites
		InternshipModel.deleteMany({
			profile_id: profile._id
		})

			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Internship details not found for profile: ${profile.username}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `All Internship details deleted successfully for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while deleting Internship details for profile: ${profile.username}, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Get all job details for a profile
	static async getAllJobs(request: Request, response: Response) {
		//? Handle bad request
		if (!RequestBodyHandler.isValidKeys(request.query, ["profile_id"]))
			return ResponseBody.handleBadRequest(response)

		//* Get the profile id from the query
		const profileId: String = request.query["profile_id"].toString()

		//? Query job details by profile id
		const jobEntityList = await JobModel.find({
			profile_id: profileId
		})

		//* Return response
		return ResponseBody.handleEntityListResponse(
			jobEntityList,
			response,
			"job"
		)
	}

	//TODO: Get job details by job Id
	static async getJobById(request: Request, response: Response) {
		//? Handle Bad Request
		if (!RequestBodyHandler.isValidKeys(request.params, ["id"]))
			return ResponseBody.handleBadRequest(response)

		//? Get the job_id from params
		const jobId: String = request.params["id"].toString()

		//? Query job details by job id
		const jobEntity = await JobModel.findOne({
			_id: jobId
		})

		//? Return response
		return ResponseBody.handleNullEntityResponse(jobEntity, response, "job")
	}

	//TODO: Add job details for a profile
	static async addJob(request: Request, response: Response) {
		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: JobSchemaType = request.body

		//? Handle bad request
		if (!ExperienceQuery.isValidSchema(inputUserDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Set the profile id from middleware
		inputUserDetails.profile_id = profile._id.toString()

		//? Create an job entity into the database
		const newJobEntity = new JobModel(inputUserDetails)

		//? Save the new job entity into the database
		newJobEntity
			.save()
			.then((jobInfo) => {
				return ResponseBody.success_add(response, {
					status: 200,
					message: `Success! Job details added successfully for profile: ${profile.username}`,
					data: jobInfo
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while adding Job details for profile: ${profile.username} ! Error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Update job by job Id
	static async updateJobById(request: Request, response: Response) {
		//? Query by job id
		const jobId: String = request.params["id"].toString()

		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: JobSchemaType = request.body

		//? Handle bad request
		if (!ExperienceQuery.isValidSchema(inputUserDetails, "UPDATE"))
			return ResponseBody.handleBadRequest(response)

		//? Get job entity by job id and profile id
		const jobEntity = await JobModel.findOne({
			_id: jobId,
			profile_id: profile._id.toString()
		})

		//? Check if job details exists for this id
		if (jobEntity === null)
			return ResponseBody.error_not_found(response, {
				status: 404,
				message: `Error! Job details not found for id: ${jobId}`,
				data: {}
			})

		//? If job Entity found, update the job by request body
		ExperienceQuery.setAndUpdate(inputUserDetails, jobEntity)

		//? Save the updated job entity
		jobEntity
			.save()
			.then(() => {
				return ResponseBody.success_update(response, {
					status: 201,
					message: `Job details updated successfully for job id: ${jobId} for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while updating job details, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Delete job by job Id
	static async deleteJobById(request: Request, response: Response) {
		//? Grab the internship id
		const jobId: String = request.params["id"].toString()

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete the job entity
		JobModel.deleteOne({
			_id: jobId,
			profile_id: profile._id
		})
			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Job details not found for id ${jobId}, for profile: ${profile.username}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `Job details deleted successfully for job id: ${jobId}, for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while deleting job details! error: ${error.message}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Delete all jobs for a profile
	static async deleteAllJobs(request: Request, response: Response) {
		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete all  job entities
		JobModel.deleteMany({
			profile_id: profile._id
		})

			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Job details not found for profile: ${profile.username}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `All Job details deleted successfully for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while deleting Job details for profile: ${profile.username}, error: ${error}`,
					data: {}
				})
			})
		return {}
	}
}

export { ExperienceQuery }
