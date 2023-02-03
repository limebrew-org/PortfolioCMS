import { Request, Response } from "express"
import { PORTFOLIO_EXPERIENCE_FIELDS } from "../../utils/constants"
import { RequestBodyHandler } from "../../utils/handleFields"
import { ResponseBody } from "../../utils/handleResponse"
import {
	ExperienceFieldType,
	InternshipSchemaType,
	JobSchemaType,
	ProfileMiddlewareType
} from "../../utils/types"
import mongoose from "mongoose"
import { ExperienceQueryType } from "../../types/query"
import { ResponseBodyType } from "../../types/response"
import { ExperienceQuery } from "../../query/Experience"
import { ExperienceType } from "../../types/schema"

class ExperienceController {
	//? Handling Object Id
	static ObjectId = mongoose.Types.ObjectId

	//TODO: Validate technology schema
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

	//TODO: Validate Schema
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
						!ExperienceController.isValidTechnologyList(
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
						!ExperienceController.isValidTechnologyList(
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

	//TODO: Get all internship entities for a profile
	async getAllInternships(request: Request, response: Response) {
		const query: ExperienceQueryType = request.query
		const schema = ExperienceType.internship

		//? Handle bad request
		if (
			!RequestBodyHandler.isValidKeys(query, ["profile_id"]) ||
			!ExperienceController.ObjectId.isValid(query.profile_id.toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Get the profile id from the query
		const profileId: String = query.profile_id.toString()

		//? Query internship details by profile id
		const internshipEntityResponse: ResponseBodyType =
			await ExperienceQuery.getMany({ profile_id: profileId }, schema)

		//? Check if internship entity list exists
		if (internshipEntityResponse.status === 200)
			return ResponseBody.success_found(
				response,
				internshipEntityResponse
			)

		//? Else, return error not found
		return ResponseBody.error_not_found(response, internshipEntityResponse)
	}

	//TODO: Get all job entities for a profile
	async getAllJobs(request: Request, response: Response) {
		const query: ExperienceQueryType = request.query
		const schema = ExperienceType.job

		//? Handle bad request
		if (
			!RequestBodyHandler.isValidKeys(query, ["profile_id"]) ||
			!ExperienceController.ObjectId.isValid(query.profile_id.toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Get the profile id from the query
		const profileId: String = query.profile_id.toString()

		//? Query job details by profile id
		const jobEntityResponse: ResponseBodyType =
			await ExperienceQuery.getMany({ profile_id: profileId }, schema)

		//? Check if job entity list exists
		if (jobEntityResponse.status === 200)
			return ResponseBody.success_found(response, jobEntityResponse)

		//? Else, return error not found
		return ResponseBody.error_not_found(response, jobEntityResponse)
	}

	//TODO: Get internship entity for a profile by id
	async getInternshipById(request: Request, response: Response) {
		const query: ExperienceQueryType = request.params
		const schema = ExperienceType.internship

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidKeys(query, ["id"]) ||
			!ExperienceController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Get the internship entity by id
		const internshipId: String = query["id"].toString()

		//? Query the internship details by id
		const internshipEntityResponse: ResponseBodyType =
			await ExperienceQuery.getOne({ _id: internshipId }, schema)

		//? Check if internship entity exists
		if (internshipEntityResponse.status === 200)
			return ResponseBody.success_found(
				response,
				internshipEntityResponse
			)

		//? Else, return error not found
		return ResponseBody.error_not_found(response, internshipEntityResponse)
	}

	//TODO: Get job entity for a profile by id
	async getJobById(request: Request, response: Response) {
		const query: ExperienceQueryType = request.params
		const schema = ExperienceType.job

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidKeys(query, ["id"]) ||
			!ExperienceController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Get the job entity by id
		const jobId: String = query["id"].toString()

		//? Query the job details by id
		const jobEntityResponse: ResponseBodyType =
			await ExperienceQuery.getOne({ _id: jobId }, schema)

		//? Check if job entity exists
		if (jobEntityResponse.status === 200)
			return ResponseBody.success_found(response, jobEntityResponse)

		//? Else, return error not found
		return ResponseBody.error_not_found(response, jobEntityResponse)
	}

	//TODO: Add a internship entity for a profile
	async addInternship(request: Request, response: Response) {
		const inputInternshipDetails: InternshipSchemaType = request.body
		const schema = ExperienceType.internship

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle Bad Request
		if (!ExperienceController.isValidSchema(inputInternshipDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Set the profile id from the middleware
		inputInternshipDetails.profile_id = profile._id.toString()

		//? Add education details into the database
		const internshipAddResponse: ResponseBodyType =
			await ExperienceQuery.addOne(inputInternshipDetails, schema)

		//? Check internship response
		if (internshipAddResponse.status === 201)
			return ResponseBody.success_add(response, internshipAddResponse)

		//? Else, return error
		return ResponseBody.error_internal(response, internshipAddResponse)
	}

	//TODO: Add a job entity for a profile
	async addJob(request: Request, response: Response) {
		const inputJobDetails: JobSchemaType = request.body
		const schema = ExperienceType.job

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle Bad Request
		if (!ExperienceController.isValidSchema(inputJobDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Set the profile id from the middleware
		inputJobDetails.profile_id = profile._id.toString()

		//? Add job details into the database
		const jobAddResponse: ResponseBodyType = await ExperienceQuery.addOne(
			inputJobDetails,
			schema
		)

		//? Check job response
		if (jobAddResponse.status === 201)
			return ResponseBody.success_add(response, jobAddResponse)

		//? Else, return error
		return ResponseBody.error_internal(response, jobAddResponse)
	}

	//TODO: Update internship entity by Id for a profile
	async updateInternshipById(request: Request, response: Response) {
		const query: ExperienceQueryType = request.params
		const schema = ExperienceType.internship

		//? Grab the request body
		const inputInternshipDetails: InternshipSchemaType = request.body

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle bad request
		if (
			!ExperienceController.isValidSchema(
				inputInternshipDetails,
				"UPDATE"
			) ||
			!ExperienceController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		const internshipId: string = query["id"].toString()

		//? Add profile id in the request body
		inputInternshipDetails.profile_id = profile._id.toString()

		//? Update internship details
		const internshipUpdateResponse: ResponseBodyType =
			await ExperienceQuery.updateById(
				internshipId,
				inputInternshipDetails,
				schema
			)

		//? If the update was successful
		if (internshipUpdateResponse.status === 201)
			return ResponseBody.success_update(
				response,
				internshipUpdateResponse
			)

		//? Else, return error
		return ResponseBody.error_internal(response, internshipUpdateResponse)
	}

	//TODO: Update job entity by Id for a profile
	async updateJobById(request: Request, response: Response) {
        const query: ExperienceQueryType = request.params
		const schema = ExperienceType.job

		//? Grab the request body
		const inputJobDetails: InternshipSchemaType = request.body

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle bad request
		if (
			!ExperienceController.isValidSchema(
				inputJobDetails,
				"UPDATE"
			) ||
			!ExperienceController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		const jobId: string = query["id"].toString()

		//? Add profile id in the request body
		inputJobDetails.profile_id = profile._id.toString()

		//? Update job details
		const jobUpdateResponse: ResponseBodyType =
			await ExperienceQuery.updateById(
				jobId,
				inputJobDetails,
				schema
			)

		//? If the update was successful
		if (jobUpdateResponse.status === 201)
			return ResponseBody.success_update(
				response,
				jobUpdateResponse
			)

		//? Else, return error
		return ResponseBody.error_internal(response, jobUpdateResponse)
    }

	//TODO: Delete internship entity by Id for a profile
	async deleteInternshipById(request: Request, response: Response) {
        const query: ExperienceQueryType = request.params
        const schema = ExperienceType.internship

        //? Handle bad request
        if(!ExperienceController.ObjectId.isValid(query["id"].toString()))
            return ResponseBody.handleBadRequest(response)
        
        //? Grab the profile from middleware
        const profile: ProfileMiddlewareType = request["profile"]

        //? Grab the Id from the query
        const internshipId: string = query["id"].toString()

        //? Delete the internship entity
        const deleteInternshipResponse: ResponseBodyType = await ExperienceQuery.deleteById(internshipId, profile._id,schema)

        //? If the delete was successful
        if(deleteInternshipResponse.status === 204)
            return ResponseBody.success_delete(response, deleteInternshipResponse)

        //? Else, return error
        return ResponseBody.error_internal(response, deleteInternshipResponse)
    }

	//TODO: Delete job entity by Id for a profile
	async deleteJobById(request: Request, response: Response) {
        const query: ExperienceQueryType = request.params
        const schema = ExperienceType.job

        //? Handle bad request
        if(!ExperienceController.ObjectId.isValid(query["id"].toString()))
            return ResponseBody.handleBadRequest(response)
        
        //? Grab the profile from middleware
        const profile: ProfileMiddlewareType = request["profile"]

        //? Grab the Id from the query
        const jobId: string = query["id"].toString()

        //? Delete the job entity
        const deleteJobResponse: ResponseBodyType = await ExperienceQuery.deleteById(jobId, profile._id,schema)

        //? If the delete was successful
        if(deleteJobResponse.status === 204)
            return ResponseBody.success_delete(response, deleteJobResponse)

        //? Else, return error
        return ResponseBody.error_internal(response, deleteJobResponse)
    }

	//TODO: Delete all internship entities for a profile
	async deleteAllInternships(request: Request, response: Response) {
        const schema = ExperienceType.internship
        
        //? Grab the profile from middleware
        const profile: ProfileMiddlewareType = request["profile"]

        //? Delete all education details
        const deleteAllInternshipResponse: ResponseBodyType = await ExperienceQuery.deleteMany(profile._id, schema)

        //? If the delete was successful
        if(deleteAllInternshipResponse.status === 204)
            return ResponseBody.success_delete(response, deleteAllInternshipResponse)
        
        //? Else, return error
        return ResponseBody.error_internal(response, deleteAllInternshipResponse)
    }

	//TODO: Delete all job entities for a profile
	async deleteAllJobs(request: Request, response: Response) {
        const schema = ExperienceType.job
        
        //? Grab the profile from middleware
        const profile: ProfileMiddlewareType = request["profile"]

        //? Delete all education details
        const deleteAllJobResponse: ResponseBodyType = await ExperienceQuery.deleteMany(profile._id, schema)

        //? If the delete was successful
        if(deleteAllJobResponse.status === 204)
            return ResponseBody.success_delete(response, deleteAllJobResponse)
        
        //? Else, return error
        return ResponseBody.error_internal(response, deleteAllJobResponse)
    }
}

export { ExperienceController }
