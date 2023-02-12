import { Request, Response } from "express"
import { PORTFOLIO_PROJECT_FIELDS } from "../../utils/constants"
import { RequestBodyHandler } from "../../utils/handleFields"
import { ProjectQueryType } from "../../types/query"
import { ResponseBody } from "../../utils/handleResponse"
import { ResponseBodyType } from "../../types/response"
import { ProjectQuery } from "../../query/Project"
import { ProfileMiddlewareType } from "../../types/middleware"
import { ProjectSchemaType } from "../../types/schema"
import mongoose from "mongoose"

class ProjectController {
	//? Handling Object Id
	static ObjectId = mongoose.Types.ObjectId

	//TODO Validate technology schema
	static isValidTechnologyList(technologies: Array<String>): Boolean {
		//? Check if technologies list is empty
		if (technologies.length === 0) return false

		//? If not empty, loop over all the elements and check if value is a string
		for (let i = 0; i < technologies.length; i++) {
			const technology = technologies[i]
			if (typeof technology !== "string") return false
		}
		return true
	}

	//TODO: Validate schema
	static isValidSchema(
		requestBody: ProjectSchemaType,
		router: String
	): Boolean {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? if no properties exist
		if (reqBodyKeys.length === 0) return false

		//* Handle for Add Project
		if (router == "ADD") {
			//? Handle mandatory fields
			for (let i = 0; i < PORTFOLIO_PROJECT_FIELDS.length; i++) {
				const field = PORTFOLIO_PROJECT_FIELDS[i].toString()
				if (!requestBody.hasOwnProperty(field)) return false

				if (field === "technologies") {
					if (
						!ProjectController.isValidTechnologyList(
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

		//* Handle for Update Education
		if (router === "UPDATE") {
			//? Handle optional fields
			for (let i = 0; i < reqBodyKeys.length; i++) {
				const projectKey = reqBodyKeys[i]
				if (!PORTFOLIO_PROJECT_FIELDS.includes(projectKey)) return false

				if (projectKey === "technologies") {
					if (
						!ProjectController.isValidTechnologyList(
							requestBody[projectKey]
						)
					)
						return false
				} else if (
					typeof requestBody[projectKey] !== "string" ||
					requestBody[projectKey]?.length === 0
				)
					return false
			}
			return true
		}
		return false
	}

	//TODO: Get all project entities for a profile
	async getAll(request: Request, response: Response): Promise<Response> {
		const query: ProjectQueryType = request.query

		//? Handlle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(query, ["profile_id"]) ||
			!ProjectController.ObjectId.isValid(query.profile_id.toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Get the profile id from query
		const profileId: String = query.profile_id.toString()

		//? Query project details by profile id
		const projectEntityResponse: ResponseBodyType =
			await ProjectQuery.getMany({ profile_id: profileId })

		//? handle response
		return ResponseBody.handleResponse(response, projectEntityResponse)
	}

	//TODO: Get project entity for a profile by id
	async getById(request: Request, response: Response): Promise<Response> {
		const query: ProjectQueryType = request.params

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(query, ["id"]) ||
			!ProjectController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Get the project by id
		const projectId: String = query["id"].toString()

		//? Query the project details by id
		const projectEntityResponse: ResponseBodyType =
			await ProjectQuery.getOne({ _id: projectId })

		//? Handle response
		return ResponseBody.handleResponse(response, projectEntityResponse)
	}

	//TODO: Add a project entity for a profile
	async add(request: Request, response: Response): Promise<Response> {
		const inputProjectDetails: ProjectSchemaType = request.body

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle Bad Request
		if (!ProjectController.isValidSchema(inputProjectDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Set the profile id from the middleware
		inputProjectDetails.profile_id = profile._id.toString()

		//? Add project details into the database
		const projectAddResponse: ResponseBodyType = await ProjectQuery.addOne(
			inputProjectDetails
		)

		//? Handle response
		return ResponseBody.handleResponse(response, projectAddResponse, true)
	}

	//TODO: Update project entity by Id for a profile
	async updateById(request: Request, response: Response): Promise<Response> {
		const query: ProjectQueryType = request.params

		//? Grab the request body
		const inputProjectDetails: ProjectSchemaType = request.body

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle bad request
		if (
			!RequestBodyHandler.isValidMandatoryFields(query, ["id"]) ||
			!ProjectController.ObjectId.isValid(query["id"].toString()) ||
			!ProjectController.isValidSchema(inputProjectDetails, "UPDATE")
		)
			return ResponseBody.handleBadRequest(response)

		//? Grab the project id from params
		const projectId: string = query["id"].toString()

		//? Set the profile id in the request body
		inputProjectDetails.profile_id = profile._id.toString()

		//? Update project details
		const projectUpdateResponse: ResponseBodyType =
			await ProjectQuery.updateById(projectId, inputProjectDetails)

		//? If the update was successful
		return ResponseBody.handleResponse(
			response,
			projectUpdateResponse,
			true
		)
	}

	//TODO: Delete project entity by Id for a profile
	async deleteById(request: Request, response: Response) {
		const query: ProjectQueryType = request.params

		//? Handle bad request
		if (
			!RequestBodyHandler.isValidMandatoryFields(query, ["id"]) ||
			!ProjectController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the project id from params
		const projectId: string = query["id"].toString()

		//? Delete the project entity
		const deleteProjectResponse: ResponseBodyType =
			await ProjectQuery.deleteById(projectId, profile._id)

		//? Handle response
		return ResponseBody.handleResponse(response, deleteProjectResponse)
	}

	//TODO: Delete all project entities for a profile
	async deleteAll(request: Request, response: Response): Promise<Response> {
		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete all project details
		const deleteAllProjectResponse: ResponseBodyType =
			await ProjectQuery.deleteMany(profile._id)

		//? Handle response
		return ResponseBody.handleResponse(response, deleteAllProjectResponse)
	}
}

export { ProjectController }
