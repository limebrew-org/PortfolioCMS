import { Request, Response } from "express"
import { ProfileQueryType } from "../../types/query"
import { RequestBodyHandler } from "../../utils/handleFields"
import mongoose from "mongoose"
import { ResponseBody } from "../../utils/handleResponse"
import { ResponseBodyType } from "../../types/response"
import { ProfileQuery } from "../../query/Profile"
import { ProfileSchemaType, SocialType } from "../../types/schema"
import { ProfileMiddlewareType, ProfileUpdateType } from "../../utils/types"
import { PORTFOLIO_SOCIALS_FIELDS } from "../../utils/constants"

class ProfileController {
	//? Handling Object Id
	static ObjectId = mongoose.Types.ObjectId

	//TODO Check Valid Socials
	static isValidSocials(socialField: SocialType): Boolean {
		if ("twitter" in socialField) {
			if (
				typeof socialField.twitter !== "string" ||
				socialField.twitter.length === 0
			)
				return false
		}
		if ("linkedin" in socialField) {
			if (
				typeof socialField.linkedin !== "string" ||
				socialField.linkedin.length === 0
			)
				return false
		}
		if ("github" in socialField) {
			if (
				typeof socialField?.github !== "string" ||
				socialField.github.length === 0
			)
				return false
		}
		return true
	}

	//TODO Check Valid Schema
	static isValidSchema(requestBody: ProfileUpdateType): Boolean {
		if ("name" in requestBody) {
			if (
				typeof requestBody?.name !== "string" ||
				requestBody?.name.length === 0
			)
				return false
		}
		if ("bio" in requestBody) {
			if (
				typeof requestBody?.bio !== "string" ||
				requestBody?.bio.length === 0
			)
				return false
		}
		if ("socials" in requestBody) {
			if (
				!RequestBodyHandler.isValidFieldCustom(
					requestBody.socials,
					PORTFOLIO_SOCIALS_FIELDS
				) ||
				!ProfileController.isValidSocials(requestBody.socials)
			)
				return false
		}
		return true
	}

	//TODO: Get profile by Id
	async getById(request: Request, response: Response): Promise<Response> {
		const query: ProfileQueryType = request.params

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(query, ["id"]) ||
			!ProfileController.ObjectId.isValid(query["id"].toString())
		)
			return ResponseBody.handleBadRequest(response)

		//? Get the profile by id
		const profileId: String = query["id"].toString()

		//? Query the profile details by id
		const profileEntityResponse: ResponseBodyType =
			await ProfileQuery.getOne({ _id: profileId }, true)

		//? Handle response
		return ResponseBody.handleResponse(response, profileEntityResponse)
	}

	//TODO: Update profile by Id
	async update(request: Request, response: Response): Promise<Response> {
		//? Grab the request body
		const inputProfileDetails: ProfileSchemaType = request.body

		//? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Handle bad request
		if (!ProfileController.isValidSchema(inputProfileDetails))
			return ResponseBody.handleBadRequest(response)

		//? Grab the profile id from the middleware
		const profileId: string = profile._id.toString()

		//? Update profile details
		const profileUpdateResponse: ResponseBodyType =
			await ProfileQuery.updateById(profileId, inputProfileDetails)

		//? Handle response
		return ResponseBody.handleResponse(response, profileUpdateResponse)
	}

	//TODO: Delete profile by Id
	async delete(request: Request, response: Response) {}
}

export { ProfileController }
