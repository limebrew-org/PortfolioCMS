import { ProfileModel } from "../schema/profile"
import { ResponseBody } from "../utils/handleResponse"
import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import {
	ProfileSchemaType,
	ProfileUpdateType,
	SocialType
} from "../utils/types"
import { RequestBodyHandler } from "../utils/handleFields"
import {
	PORTFOLIO_PROFILE_FIELDS,
	PORTFOLIO_SOCIALS_FIELDS
} from "../utils/constants"
import {
	maskedProfileEntity,
	maskedProfileEntityList
} from "../utils/maskProfile"

class ProfileQuery {
	//? Set and Update
	static setAndUpdate(
		requestBody: ProfileUpdateType,
		profileEntity: ProfileSchemaType
	) {
		if ("name" in requestBody) {
			profileEntity.name = requestBody.name
		}
		if ("bio" in requestBody) {
			profileEntity.bio = requestBody.bio
		}
		if ("socials" in requestBody) {
			if ("twitter" in requestBody.socials) {
				profileEntity.socials.twitter = requestBody.socials.twitter
			}
			if ("linkedin" in requestBody.socials) {
				profileEntity.socials.linkedin = requestBody.socials.linkedin
			}
			if ("github" in requestBody.socials) {
				profileEntity.socials.github = requestBody.socials.github
			}
		}
	}

	//? Check Valid Socials
	static isValidSocials(socialField: SocialType) {
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

	//? Check Valid Schema
	static isValidSchema(requestBody: ProfileUpdateType) {
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
				!ProfileQuery.isValidSocials(requestBody.socials)
			)
				return false
		}
		return true
	}

	//? get profile
	static async get(request: Request, response: Response) {
		//? Get profile by ID
		if (request.query?.profile_id) {
			const profile_id = new ObjectId(`${request.query.profile_id}`)
			const profileEntity = await ProfileModel.findOne({
				_id: profile_id
			})
			const modifiedProfileEntity = maskedProfileEntity(profileEntity)
			return ResponseBody.handleNullEntityResponse(
				modifiedProfileEntity,
				response,
				"profile"
			)
		}

		//? Get profile by name
		if (request.query?.profile_name) {
			const profileEntityList = await ProfileModel.find({
				username: { $regex: request.query.profile_name, $options: "i" }
			})
			const modifiedProfileEntityList =
				maskedProfileEntityList(profileEntityList)

			return ResponseBody.handleEntityListResponse(
				modifiedProfileEntityList,
				response,
				"profile"
			)
		}

		return ResponseBody.handleBadRequest(response)
	}

	//? Update profile (name, bio, socials, password)
	static async update(request: Request, response: Response) {
		//? Grab the request body
		const inputUserDetails: ProfileUpdateType = request.body

		//? Handle Bad Request
		if (
			!RequestBodyHandler.isValidFieldCustom(
				inputUserDetails,
				PORTFOLIO_PROFILE_FIELDS
			) ||
			!ProfileQuery.isValidSchema(inputUserDetails)
		)
			return ResponseBody.handleBadRequest(response)

		//? if request body is valid, then find profile by email (from req.profile)
		const profileEntity = await ProfileModel.findOne({
			email: request["profile"].email
		})

		//? if profile not found then return error not found
		if (profileEntity === null)
			return ResponseBody.error_not_found(response, {
				status: 404,
				message: "Profile not found",
				data: {}
			})

		//? If found, then update the profile entity with the fields passed (setAndUpdate)
		ProfileQuery.setAndUpdate(inputUserDetails, profileEntity)

		//? Save the profile entity
		profileEntity
			.save()
			.then((profile: ProfileSchemaType) => {
				return ResponseBody.success_update(response, {
					status: 201,
					message: "Profile updated successfully!",
					data: {}
				})
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Error while updating profile, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//? Delete profile
	static async delete(request: Request, response: Response) {}
}

export { ProfileQuery }
