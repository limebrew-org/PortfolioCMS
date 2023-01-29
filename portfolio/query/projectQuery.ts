import { ProjectModel } from "../schema/projects"
import { ResponseBody } from "../utils/handleResponse"
import { RequestBodyHandler } from "../utils/handleFields"
import {
	ProfileMiddlewareType,
	ProjectSchemaType,
	ProjectUpdateType
} from "../utils/types"
import { PORTFOLIO_PROJECT_FIELDS } from "../utils/constants"
import { Request, Response } from "express"

class ProjectQuery {
	//? Static variables
	static schemaName = "project"

	//? Validate technology schema
	static isValidTechnologyList(technologies: Array<String>) {
		//? Check if technologies list is empty
		if (technologies.length === 0) return false

		//? If not empty, loop over all the elements and check if value is a string
		for (let i = 0; i < technologies.length; i++) {
			const technology = technologies[i]
			if (typeof technology !== "string") return false
		}
		return true
	}

	//? Validate Schema
	static isValidSchema(requestBody: ProjectSchemaType, router: String) {
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
					if (!ProjectQuery.isValidTechnologyList(requestBody[field]))
						return false
				}else if (
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
						!ProjectQuery.isValidTechnologyList(
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

	//? Set and Update fields
	static setAndUpdate(requestBody: ProjectUpdateType, projectEntity: Object) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? Set the field if exists
		for (let i = 0; i < reqBodyKeys.length; i++) {
			const projectKey = reqBodyKeys[i]
			if (PORTFOLIO_PROJECT_FIELDS.includes(projectKey))
				projectEntity[projectKey] = requestBody[projectKey]
		}
	}

	//TODO: Get all project details for a profile
	static async getAll(request: Request, response: Response) {
		//? Handle bad request
		if (!RequestBodyHandler.isValidKeys(request.query, ["profile_id"]))
			return ResponseBody.handleBadRequest(response)

		//* Get the profile_id from query
		const profileId: string = request.query["profile_id"].toString()

		//? Query project details by profile_id
		const projectEntityList = await ProjectModel.find({
			profile_id: profileId
		})

		//* Return response
		return ResponseBody.handleEntityListResponse(
			projectEntityList,
			response,
			ProjectQuery.schemaName
		)
	}

	//TODO: Get project details by project id
	static async getById(request: Request, response: Response) {
		//? Handle bad request
		if (!RequestBodyHandler.isValidKeys(request.params, ["id"])) {
			return ResponseBody.handleBadRequest(response)
		}

		//* Get the education_id from params
		const projectId = request.params["id"].toString()

		//? Query the education details by education_id
		const projectEntity = await ProjectModel.findOne({
			_id: projectId
		})

		//* Return response
		return ResponseBody.handleNullEntityResponse(
			projectEntity,
			response,
			ProjectQuery.schemaName
		)
	}

	//TODO: Add project
	static async add(request: Request, response: Response) {
		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: ProjectSchemaType = request.body

		//? Handle bad request
		if (!ProjectQuery.isValidSchema(inputUserDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Set the  profile id from middleware
		inputUserDetails.profile_id = profile._id.toString()

		//? Create a project entity into the database
		const newProjectEntity = new ProjectModel(inputUserDetails)

		//? Save the new project entity into the database
		newProjectEntity
			.save()
			.then((projectInfo) => {
				return ResponseBody.success_add(response, {
					status: 200,
					message: `Success! Project details added successfully for profile: ${profile.username}`,
					data: projectInfo
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while adding project details for profile: ${profile.username} ! Error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO Update Project by project id
	static async update(request: Request, response: Response) {
		//? Query by project id
		const projectId = request.params["id"].toString()

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: ProjectSchemaType = request.body

		//? Handle bad request
		if (!ProjectQuery.isValidSchema(inputUserDetails, "UPDATE"))
			return ResponseBody.handleBadRequest(response)

		//? Get project entity by education id and profile id
		const projectEntity = await ProjectModel.findOne({
			_id: projectId,
			profile_id: profile._id.toString()
		})

		//? Check if project details exists for this id
		if (projectEntity === null) 
			return ResponseBody.error_not_found(response, {
				status: 404,
				message: `Error! Project details not found for id: ${projectId}`,
				data: {}
			})
		

		//? If projectEntity found, update the project by request body
		ProjectQuery.setAndUpdate(inputUserDetails, projectEntity)

		//? Save the updated project
		projectEntity
			.save()
			.then(() => {
				return ResponseBody.success_update(response, {
					status: 201,
					message: `Project details updated successfully for education id: ${projectId}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while updating project details, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO Delete Project by project id
	static async deleteById(request: Request, response: Response) {
		//? Grab the project id
		const projectId = request.params["id"].toString()

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete the education entity
		ProjectModel.deleteOne({
			_id: projectId,
			profile_id: profile._id
		})
			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Project details not found for id ${projectId}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `Project details deleted successfully for education id: ${projectId}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: "Error while deleting project details",
					data: {}
				})
			})
		return {}
	}

	//TODO Delete all projects
	static async deleteAll(request: Request, response: Response) {
		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete the education entity
		ProjectModel.deleteMany({
			profile_id: profile._id
		})
			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Project details not found for user: ${profile.username}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `All Project details deleted successfully for user: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while deleting project details for user: ${profile.username}, error: ${error}`,
					data: {}
				})
			})
		return {}
	}
}

export { ProjectQuery }
