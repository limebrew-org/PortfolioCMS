import { Request, Response } from "express"
import mongoose from "mongoose"
import { SkillQuery } from "../../query/Skills"
import { SkillQueryType } from "../../types/query"
import { ResponseBodyType } from "../../types/response"
import { PORTFOLIO_SKILL_FIELDS } from "../../utils/constants"
import { RequestBodyHandler } from "../../utils/handleFields"
import { ResponseBody } from "../../utils/handleResponse"
import {
	ProfileMiddlewareType,
	SkillSchemaType,
	SkillUpdateType
} from "../../utils/types"

class SkillController {
	//? Handle object Id
	static ObjectId = mongoose.Types.ObjectId

	//TODO: Valid skill Field schema
	static isValidSkillFieldList(skillField: Array<String>) {
		//? Check if skillField list is empty
		if (skillField.length === 0) return false

		//? If not empty, loop over all the elements and check if the value is a string
		for (let i = 0; i < skillField.length; i++) {
			const skillFieldElement = skillField[i]
			if (typeof skillFieldElement !== "string") return false
		}
		return true
	}

	//TODO: Validate Schema
	static isValidSchema(requestBody: SkillSchemaType, router: String) {
		//? Get keys of request body
		const reqBodyKeys = Object.keys(requestBody)

		//? If no properties exist
		if (reqBodyKeys.length === 0) return false

		//* Handle for adding skills
		if (router === "ADD") {
			//? Handle mandatory fields
			for (let i = 0; i < PORTFOLIO_SKILL_FIELDS.length; i++) {
				const field = PORTFOLIO_SKILL_FIELDS[i].toString()
				if (!requestBody.hasOwnProperty(field)) return false

				if (!SkillController.isValidSkillFieldList(requestBody[field]))
					return false
			}
			return true
		}

		//* Handle for  updating skills
		if (router === "UPDATE") {
			//? Handle optional fields
			for (let i = 0; i < reqBodyKeys.length; i++) {
				const field = reqBodyKeys[i]
				if (!PORTFOLIO_SKILL_FIELDS.includes(field)) return false

				if (!SkillController.isValidSkillFieldList(requestBody[field]))
					return false
			}
			return true
		}
		return false
	}

	//TODO: Get skill by query
	async getByField(request: Request, response: Response): Promise<Response> {
		const query: SkillQueryType = request.query

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidKeys(query, [
				"field_name",
				"profile_id"
			]) ||
			!PORTFOLIO_SKILL_FIELDS.includes(query.field_name)
		)
			return ResponseBody.handleBadRequest(response)

		//?Grab the profile id and field name from the query
		const profileId: string = query.profile_id.toString()
		const fieldName: string = query.field_name.toString()

		//? Query skills by profileId and fieldName
		const skillEntityResponse: ResponseBodyType = await SkillQuery.getOne({
			profile_id: profileId
		})

		//? Check if skill entity exist
		if (skillEntityResponse.status === 200)
			//? Return the skills for the field passed in query
			return ResponseBody.success_found(response, {
				status: 200,
				message: `Skill details for profile ${profileId} found for field ${fieldName}`,
				data: skillEntityResponse.data[fieldName]
			})

		//? Else, return error
		return ResponseBody.error_not_found(response, skillEntityResponse)
	}

	//TODO: Get skill entity by id
	async getById(request: Request, response: Response): Promise<Response> {
		const query: SkillQueryType = request.params

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidKeys(query, ["id"]) ||
			!SkillController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Get the skill id from params
		const skillId = query["id"].toString()

		//? Query skill details by id
		const skillEntityResponse: ResponseBodyType = await SkillQuery.getOne({
			_id: skillId
		})

		//? Check if skill entity exists
		if (skillEntityResponse.status === 200)
			return ResponseBody.success_found(response, skillEntityResponse)

		//? Else, return error not found
		return ResponseBody.error_not_found(response, skillEntityResponse)
	}

	//TODO: Add a skill entity for a profile
	async add(request: Request, response: Response): Promise<Response> {
		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputSkillDetails: SkillSchemaType = request.body

		//? Handle bad request
		if (!SkillController.isValidSchema(inputSkillDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Check if skill entity already exists for the profile
		const existingSkillEntityResponse: ResponseBodyType =
			await SkillQuery.getOne({ profile_id: profile._id })

		//? Handle if skill entity already exists for the profile
		if (existingSkillEntityResponse.status === 200)
			return ResponseBody.error_exists(response, {
				status: 403,
				message: `Skill already exists for user ${profile.name}`
			})

		//? Set the profile id from middleware
		inputSkillDetails.profile_id = profile._id.toString()

		//? Add the skill entity to the database
		const skillAddResponse: ResponseBodyType = await SkillQuery.addOne(
			inputSkillDetails
		)

		//? Check skill entity response
		if (skillAddResponse.status === 201)
			return ResponseBody.success_add(response, skillAddResponse)

		//? Else, return error
		return ResponseBody.error_internal(response, skillAddResponse)
	}

	//TODO: Update a skill entity by Id for a profile
	async updateById(request: Request, response: Response): Promise<Response> {
		const query: SkillQueryType = request.params

		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputSkillDetails: SkillSchemaType = request.body

		//? Handle Bad Request
		if (
			!SkillController.isValidSchema(inputSkillDetails, "UPDATE") ||
			!SkillController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Grab the skill id
		const skillId = query["id"].toString()

		//? Add profile id in the request body
		inputSkillDetails.profile_id = profile._id.toString()

		//? Update skill entity
		const skillUpdateResponse: ResponseBodyType =
			await SkillQuery.updateById(skillId, inputSkillDetails)

		//? If the update was successful
		if (skillUpdateResponse.status === 201)
			return ResponseBody.success_update(response, skillUpdateResponse)

		//? Else, return error
		return ResponseBody.error_internal(response, skillUpdateResponse)
	}

	//TODO: Delete a skill entity by Id for a profile
	async deleteById(request: Request, response: Response): Promise<Response> {
		const query: SkillQueryType = request.params

		//? Handle Bad Request
		if (!SkillController.ObjectId.isValid(query["id"].toString()))
			return ResponseBody.handleBadRequest(response)

		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the skill id
		const skillId = query["id"].toString()

		//? Delete the skill entity
		const deleteSkillResponse: ResponseBodyType =
			await SkillQuery.deleteById(skillId, profile._id)

		//? If the deletion was successful
		if (deleteSkillResponse.status === 204)
			return ResponseBody.success_delete(response, deleteSkillResponse)

		//? Else, return error
		return ResponseBody.error_internal(response, deleteSkillResponse)
	}
}

export { SkillController }
