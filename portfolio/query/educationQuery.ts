import { EducationModel } from "../schema/education"
import { RequestBodyHandler } from "../utils/handleFields"
import { ResponseBody } from "../utils/handleResponse"
import { Request, Response } from "express"
import {
	EducationSchemaType,
	EducationUpdateType,
	ProfileMiddlewareType
} from "../utils/types"
import { PORTFOLIO_EDUCATION_FIELDS } from "../utils/constants"
import { Document } from "mongoose"

class EducationQuery {
	//? Static variables
	static schemaName = "education"

	//? Validate Schema
	static isValidSchema(
		requestBody: EducationSchemaType,
		router: String
	) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? if no properties exist
		if (reqBodyKeys.length === 0) return false

		//* Handle for Add Education
		if (router === "ADD") {
			//? Handle mandatory fields
			for (let i = 0; i < PORTFOLIO_EDUCATION_FIELDS.length; i++) {
				const field = PORTFOLIO_EDUCATION_FIELDS[i]
				if (!requestBody.hasOwnProperty(field)) return false
				if (
					typeof requestBody[field] !== "string" ||
					requestBody[field]?.length === 0
				)
					return false
			}
			return true
		}

		//* Handle for Update Education
		if (router === "UPDATE") {
			//? Handle optional fields
			for (let i = 0; i < reqBodyKeys.length; i++) {
				const educationKey = reqBodyKeys[i]
				console.log("Education key: ", educationKey)
				console.log("Key validation status: ", PORTFOLIO_EDUCATION_FIELDS.includes(educationKey))

				if(!PORTFOLIO_EDUCATION_FIELDS.includes(educationKey)) return false
				else if (
					typeof requestBody[educationKey] !== "string" ||
					requestBody[educationKey]?.length === 0
				)
					return false
			}
			return true
		}
		return false
	}

	//? Set annd Update fields
	static setAndUpdate(
		requestBody: EducationUpdateType,
		educationEntity: Document
	) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? Set the field if key exists
		for (let i = 0; i < reqBodyKeys.length; i++) {
			const key = reqBodyKeys[i]
			if (PORTFOLIO_EDUCATION_FIELDS.includes(key))
				educationEntity[key] = requestBody[key]
		}
	}

	//TODO: Get all education details for a profile
	static async getAll(request: Request, response: Response) {
		//? Handle bad request
		if (!RequestBodyHandler.isValidKeys(request.query, ["profile_id"]))
			return ResponseBody.handleBadRequest(response)

		//* Get the profile_id from query
		const profileId: String = request.query["profile_id"].toString()

		//? Query education details by profile_id
		const educationEntityList = await EducationModel.find({
			profile_id: profileId
		})

		//* Return response
		return ResponseBody.handleEntityListResponse(
			educationEntityList,
			response,
			EducationQuery.schemaName
		)
	}

	//TODO: Get education details by education id
	static async getById(request: Request, response: Response) {
		//? Handle bad request
		if (!RequestBodyHandler.isValidKeys(request.params, ["id"])) 
			return ResponseBody.handleBadRequest(response)
		

		//* Get the education_id from params
		const educationId: String = request.params["id"].toString()

		//? Query the education details by education_id
		const educationEntity = await EducationModel.findOne({
			_id: educationId
		})

		//* Return response
		return ResponseBody.handleNullEntityResponse(
			educationEntity,
			response,
			EducationQuery.schemaName
		)
	}

	//TODO: Add education
	static async add(request: Request, response: Response) {
		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: EducationSchemaType = request.body

		//? Handle bad request
		if (!EducationQuery.isValidSchema(inputUserDetails, "ADD"))
			return ResponseBody.handleBadRequest(response)

		//? Set the profile id from the middleware
		inputUserDetails.profile_id = profile._id.toString()

		//? Create an education entity and set the values from the request body
		const newEducationEntity = new EducationModel(inputUserDetails)

		//? Save the new education entity into the database
		newEducationEntity
			.save()
			.then((educationInfo) => {
				return ResponseBody.success_add(response, {
					status: 200,
					message: `Success! Education details added successfully for profile: ${profile.username}`,
					data: educationInfo
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while adding education details for profile: ${profile.username} ! Error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Update education  by  education id
	static async update(request: Request, response: Response) {
		//? Query by education id
		const educationId: String = request.params["id"].toString()

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the request body
		const inputUserDetails: EducationSchemaType = request.body

		//? Handle bad request
		if (!EducationQuery.isValidSchema(inputUserDetails, "UPDATE"))
			return ResponseBody.handleBadRequest(response)

		//? Get education entity by education id and profile id
		const educationEntity = await EducationModel.findOne({
			_id: educationId,
			profile_id: profile._id.toString()
		})

		if (educationEntity === null)
			return ResponseBody.error_not_found(response, {
				status: 404,
				message: `Error! Education details not found for id: ${educationId}, for profile: ${profile.username}`,
				data: {}
			})

		//? If educationEntity found, update the education entity by request body
		EducationQuery.setAndUpdate(inputUserDetails, educationEntity)

		//? Save the education entity
		educationEntity
			.save()
			.then(() => {
				return ResponseBody.success_update(response, {
					status: 201,
					message: `Education details updated successfully for education id: ${educationId}, for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while updating education details, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Delete Education by education id
	static async deleteById(request: Request, response: Response) {
		//? Grab the education id
		const educationId: String = request.params["id"].toString()

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete the education entity
		EducationModel.deleteOne({
			_id: educationId,
			profile_id: profile._id
		})
			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Education details not found for id ${educationId}, for profile: ${profile.username}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `Education details deleted successfully for education id: ${educationId}, for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while deleting education details, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Delete Education by profile id
	static async deleteAll(request: Request, response: Response) {
		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete the education entity
		EducationModel.deleteMany({
			profile_id: profile._id
		})
			.then((info) => {
				if (info.deletedCount === 0)
					return ResponseBody.error_not_found(response, {
						status: 404,
						message: `Education details not found for profile: ${profile.username}`,
						data: {}
					})
				return ResponseBody.success_delete(response, {
					status: 201,
					message: `All Education details deleted successfully for profile: ${profile.username}`,
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while deleting education details for profile: ${profile.username}, error: ${error}`,
					data: {}
				})
			})
		return {}
	}
}

export { EducationQuery }
