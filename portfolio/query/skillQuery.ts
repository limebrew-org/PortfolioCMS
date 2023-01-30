import { SkillsModel } from "../schema/skills"
import { ResponseBody } from "../utils/handleResponse"
import { RequestBodyHandler } from "../utils/handleFields"
import { Request, Response } from "express"
import {
	ProfileMiddlewareType,
	SkillSchemaType,
	SkillUpdateType
} from "../utils/types"
import { PORTFOLIO_SKILL_FIELDS } from "../utils/constants"

class SkillQuery {
	//? Valid skill Field schema
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

	//? Validate Schema
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

				if (!SkillQuery.isValidSkillFieldList(requestBody[field]))
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

				if (!SkillQuery.isValidSkillFieldList(requestBody[field]))
					return false
			}
			return true
		}
		return false
	}

	//? Set and Update the skillfields
	static setAndUpdate(requestBody: SkillUpdateType, skillEntity: Object) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? set the field if it exists
		for (let i = 0; i < reqBodyKeys.length; i++) {
			const skillField = reqBodyKeys[i]
			if (PORTFOLIO_SKILL_FIELDS.includes(skillField)) {
				skillEntity[skillField] = requestBody[skillField]
			}
		}
	}

	//? Get all skills
	static async getAllSkills(request: Request, response: Response) {
		//? Handle Bad Request
		if (!RequestBodyHandler.isValidKeys(request.query, ["profile_id"]))
			return ResponseBody.handleBadRequest(response)

		//* Get the profile id from the query
		const profileId: String = request.query["profile_id"].toString()

		//? Query skill details by profile id
		const skillEntity = await SkillsModel.findOne({
			profile_id: profileId
		})

		//? Return response
		return ResponseBody.handleNullEntityResponse(
			skillEntity,
			response,
			"skills"
		)
	}

	//? Get skill by skill Id
	static async getSkillById(request: Request, response: Response) {
		//? Handle Bad Request
		if (!RequestBodyHandler.isValidKeys(request.params, ["id"]))
			return ResponseBody.handleBadRequest(response)

		//? Get the skill id from the params
		const skillId: String = request.params["id"].toString()

		//? Query the skills details by skill id
		const skillEntity = await SkillsModel.findOne({
			_id: skillId
		})

		//? Return response
		return ResponseBody.handleNullEntityResponse(
			skillEntity,
			response,
			"skills"
		)
	}

	//?  Add skills details
	static async addSkills(request: Request, response: Response) {
		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: SkillSchemaType = request.body

		//? Handle bad request
		if (!SkillQuery.isValidSchema(inputUserDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Set the profile id from middleware
		inputUserDetails.profile_id = profile._id.toString()

		//? Create a skill entity into the database
		const newSkillEntity = new SkillsModel(inputUserDetails)

		//? Save the new internship entity into the database
		newSkillEntity
			.save()
			.then((skillInfo) => {
				return ResponseBody.success_add(response, {
					status: 200,
					message: `Success! Skill details added successfully for profile: ${profile.username}`,
					data: skillInfo
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while adding Skill details for profile: ${profile.username} ! Error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//? Update skills
	static async updateSkillsById(request: Request, response: Response) {
		//? Query by skill id
		const skillId: string = request.params["id"].toString()

		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: SkillSchemaType = request.body

		//? Handle bad request
		if (!SkillQuery.isValidSchema(inputUserDetails, "UPDATE"))
			return ResponseBody.handleBadRequest(response)

		//? Get skill entity by skill id and profile id
		const skillEntity = await SkillsModel.findOne({
			_id: skillId,
			profile_id: profile._id.toString()
		})

		//? Check if skill details exists for this id
		if (skillEntity === null)
			return ResponseBody.error_not_found(response, {
				status: 404,
				message: `Error! Skill details not found for id: ${skillId}, for profile: ${profile.username}`,
				data: {}
			})

		//? If skillEntity found, update the skill details by skill id
		SkillQuery.setAndUpdate(inputUserDetails, skillEntity)

		//? Save the updated internship entity
		skillEntity
			.save()
			.then(() => {
				return ResponseBody.success_update(response, {
					status: 201,
					message: `Skill details updated successfully for skill id: ${skillId}, for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while updating skill details, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//? Delete skills by skill Id
	static async deleteSkillsById(request: Request, response: Response) {
		//? Grab the skill id
		const skillId: String = request.params["id"].toString()

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete  the skill entity
		SkillsModel.deleteOne({
			_id: skillId,
			profile_id: profile._id
		})

			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Skill details not found for id ${skillId}, for profile: ${profile.username}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `Skill details deleted successfully for skill id: ${skillId}, for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while deleting skill details, error: ${error}`,
					data: {}
				})
			})
		return {}
	}
}

export { SkillQuery }
