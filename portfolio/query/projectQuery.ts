import { ProjectModel } from "../schema/projects"
import { ResponseBody } from "../utils/handleResponse"
import { RequestBodyHandler } from "../utils/handleFields"
import { ProjectField } from "../models/projects"
import { 
	ProfileMiddlewareType,
	ProjectSchemaType, 
	TechnologySchemaType} from "../utils/types"
import { PORTFOLIO_PROJECT_FIELDS } from "../utils/constants"
import { Request, Response } from "express"

class ProjectQuery {
	//? Static variables
	static schemaName = "project"

	//? Validate technology schema
	static isValidTechnologySchema(technologies: Array<TechnologySchemaType>) {
		//? If technology type is not an object
		if(typeof technologies !== "object") return false

		//? If technology type is an object, then list the keys
		const technologyKeys = Object.keys(technologies)

		//? If the technolgies schema is empty, return false
		if(technologyKeys.length === 0) return false

		for(let i=0;i< technologyKeys.length;i++) {
			const fieldName = technologyKeys[i]
			const fieldValue = technologies[fieldName]
			
			if(typeof fieldValue !== "object") return false

			if(!fieldValue.hasOwnProperty('name')) return false
		}
		return true
	}

	//? Validate Schema
	static isValidSchema(
		requestBody: ProjectSchemaType,
		router: String
	) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? if no properties exist
		if(reqBodyKeys.length === 0) return false

		//* Handle for Add Project
		if(router == "ADD") {
			//? Handle mandatory fields
			for(let i = 0;i < PORTFOLIO_PROJECT_FIELDS.length;i++) {
				const field = PORTFOLIO_PROJECT_FIELDS[i]
				if(!requestBody.hasOwnProperty(field)) return false
				
				if(field === 'technologies') 
				{
					if(!ProjectQuery.isValidTechnologySchema(requestBody[field]))
						return false
				}
					
					
				else if(
					typeof requestBody[field]!== "string" ||
					requestBody[field].length === 0
				)
				{
					return false
				}
					
			}
			return true
		}

		//* Handle for Update Education
		if (router === "UPDATE") {
			//? Handle optional fields
			for (let i = 0; i < reqBodyKeys.length; i++) {
				const key = reqBodyKeys[i]
				if (
					typeof requestBody[key] !== "string" ||
					requestBody[key]?.length === 0
				)
					return false
			}
			return true
		}
		return false
	}


	//TODO: Get all project details for a profile
	static async getAll(request: Request, response: Response) {
		//? Handle bad request
		if(!RequestBodyHandler.isValidKeys(request.query, ["profile_id"])) 
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
		if(!ProjectQuery.isValidSchema(inputUserDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)
			
		//? Set the  profile id from middleware
		inputUserDetails.profile_id = profile._id.toString()

		//? Generate id for each technology schema
		RequestBodyHandler.generateId(inputUserDetails.technologies)

		//? Create a project entity into the database
		const newProjectEntity = new ProjectModel(inputUserDetails)

		//? Save the new project entity into the database
		newProjectEntity
			.save()
			.then((projectInfo) => {
				return ResponseBody.success_update(response, {
					status: 201,
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

	//? Update Project by project id
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
	}

}

export { ProjectQuery }
