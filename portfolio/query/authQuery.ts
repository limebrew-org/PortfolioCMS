import { ProfileModel } from "../schema/profile"
import { ResponseBody } from "../utils/handleResponse"
import { Request, Response } from "express"
import { PayloadSchemaType, ProfileSchemaType, ProfileMiddlewareType } from "../utils/types"
import { hashPassword, comparePassword } from "../utils/handlePassword"
import {
	generateAccessToken,
	generateRefreshToken,
	verifyToken
} from "../utils/handleToken"
import { TokenModel } from "../schema/token"
import { RequestBodyHandler } from "../utils/handleFields"
import { PORTFOLIO_PROFILE_REGISTER_FIELDS } from "../utils/constants"
import { TOKEN_TYPE } from "../utils/constants"
import { maskedProfileEntity } from "../utils/maskProfile"


class AuthQuery {
	//TODO: Register profile
	static async register(request: Request, response: Response) {
		//? Grab the request body
		const inputUserDetails: ProfileSchemaType = request.body

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidKeys(
				inputUserDetails,
				PORTFOLIO_PROFILE_REGISTER_FIELDS
			)
		)
			return ResponseBody.handleBadRequest(response)

		//? Handle LowerCase
		inputUserDetails.username = inputUserDetails.username.toLowerCase()
		inputUserDetails.email = inputUserDetails.email.toLowerCase()

		//? Check user in the database by username
		const profileEntityByUserName = await ProfileModel.findOne({
			username: inputUserDetails.username
		})

		//? Check user in the database by email
		const profileEntityByEmail = await ProfileModel.findOne({
			email: inputUserDetails.email.toString()
		})

		//? Query Status
		const profileWithUserNameStatus = ResponseBody.isExists(
			profileEntityByUserName
		)
		const profileWithEmailStatus =
			ResponseBody.isExists(profileEntityByEmail)

		//? If Profile exists with email
		if (profileWithEmailStatus)
			return ResponseBody.error_exists(response, {
				status: 403,
				message: `Error! Profile with email: ${inputUserDetails.email} already exists`,
				data: {}
			})

		if (profileWithUserNameStatus)
			return ResponseBody.error_exists(response, {
				status: 403,
				message: `Error! Profile with username: ${inputUserDetails.username} already exists`,
				data: {}
			})

		//? hash password
		const hashedPassword = await hashPassword(
			inputUserDetails.password.toString()
		)

		//? Update the password with hashed password in request body
		inputUserDetails.name = request.body.username.toString()
		inputUserDetails.password = hashedPassword.toString()
		inputUserDetails.bio = ""
		inputUserDetails.socials = {
			twitter: "",
			linkedin: "",
			github: ""
		}

		//? Add the user to the database
		const newProfileEntity = new ProfileModel(inputUserDetails)

		//? Save the new profile
		newProfileEntity
			.save()
			.then((profile) => {
				if (profile) {
					const modifiedProfileEntity = maskedProfileEntity(profile)
					return ResponseBody.success_add(response, {
						status: 200,
						message: `Profile added successfully`,
						data: modifiedProfileEntity
					})
				}
			})
			.catch((error) => {
				return ResponseBody.error_internal(response, {
					status: 500,
					message: `Failed to add, error: ${error}`,
					data: {}
				})
			})
		return {}
	}

	//TODO: Login profile
	static async login(request: Request, response: Response) {
		//? Grab the request body
		const inputUserDetails: ProfileSchemaType = request.body

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidKeys(
				inputUserDetails,
				PORTFOLIO_PROFILE_REGISTER_FIELDS
			)
		)
			return ResponseBody.handleBadRequest(response)

		//? Check user by email or username in the database
		let profileEntity

		if (RequestBodyHandler.isValidKeys(inputUserDetails, ["email"])) {
			profileEntity = await ProfileModel.findOne({
				email: inputUserDetails.email.toString().toLowerCase()
			})
		} else if (
			RequestBodyHandler.isValidKeys(inputUserDetails, ["username"])
		) {
			profileEntity = await ProfileModel.findOne({
				username: inputUserDetails.username.toString().toLowerCase()
			})
		}

		//? Handle null entity
		const profileExistStatus = ResponseBody.isExists(profileEntity)

		//? if user exists in the database, compare the password
		if (profileExistStatus) {
			//? Compare the password hashes
			const bcryptResponse = await comparePassword(
				inputUserDetails.password.toString(),
				profileEntity.password.toString()
			)
			//? if password matches, create access token and refresh token
			if (bcryptResponse) {
				//? create a payload object using the id extracted from the response
				const payload: PayloadSchemaType = {
					_id: profileEntity._id.toString()
				}

				//? create Access Token and refresh tokens
				const accessToken = generateAccessToken(payload)
				const refreshToken = generateRefreshToken(payload)

				///? Check if any refresh token exists for the profile
				const refreshTokenEntity = await TokenModel.findOne({
					profile_id: profileEntity._id
				})

				//? Check if refresh token exists
				const refreshTokenStatus =
					ResponseBody.isExists(refreshTokenEntity)

				//? If no refresh token found
				if (!refreshTokenStatus) {
					//? create a new refresh token entity
					const newRefreshTokenEntity = new TokenModel({
						profile_id: profileEntity._id,
						token: refreshToken
					})

					//? Save the token in the DB
					newRefreshTokenEntity
						.save()
						.then((token) => {
							if (token)
								return ResponseBody.success_add(response, {
									status: 200,
									message: `User logged in successfully with username: ${profileEntity.username} and email: ${profileEntity.email}`,
									data: {
										access_token: accessToken,
										refresh_token: refreshToken
									}
								})
						})
						.catch((error) => {
							return ResponseBody.error_internal(response, {
								status: 500,
								message: `Authorization failed, error: ${error}`,
								data: {}
							})
						})

					//? Exit from the block
					return {}
				}

				//? else update the refresh token with the generated refresh token
				refreshTokenEntity.token = refreshToken

				//? save the refresh token
				refreshTokenEntity
					.save()
					.then((token) => {
						if (token)
							return ResponseBody.success_add(response, {
								status: 200,
								message: `User logged in successfully with username: ${profileEntity.username} and email: ${profileEntity.email}`,
								data: {
									access_token: accessToken,
									refresh_token: refreshToken
								}
							})
					})
					.catch((error) => {
						return ResponseBody.error_internal(response, {
							status: 500,
							message: `Authorization failed, error: ${error}`,
							data: {}
						})
					})
				return {}
			}
		}

		//? else, return user doesn't exist
		return ResponseBody.error_not_found(response, {
			status: 404,
			message: `Profile not found`,
			data: {}
		})
	}

	//? Logout profile
	static async logout(request: Request, response: Response) {
		//* Handle Bad Request
		if (!RequestBodyHandler.isValidKeys(request.body, ["token"])) {
			return ResponseBody.handleBadRequest(response)
		}

		//? Grab the refresh token from request body
		const refreshToken = request.body.token.toString()

		//? Verify the refresh token signature

		//? Check if the token is available in the database
		const refreshTokenEntity = await TokenModel.findOne({
			token: refreshToken
		})

		//? Check if token exists
		const tokenExistStatus = ResponseBody.isExists(refreshTokenEntity)

		//? If the token exists, delete the token and return
		if (tokenExistStatus) {
			TokenModel.deleteOne({
				token: request.body.token
			})
				.then((info) => {
					if (info.deletedCount === 0)
						return ResponseBody.error_not_found(response, {
							status: 404,
							message: "Token does not exist",
							data: {}
						})
					//? Else return success
					return ResponseBody.success_update(response, {
						status: 200,
						message: `User logged out successfully`,
						data: {}
					})
				})
				.catch((error) => {
					return ResponseBody.error_internal(response, {
						status: 500,
						message: `Something went wrong! error: ${error}`,
						data: {}
					})
				})
			return {}
		}

		//? Else User not logged in
		return ResponseBody.error_not_found(response, {
			status: 404,
			message: `User not logged in`,
			data: {}
		})
	}

	//? Regenerate accesstoken
	static async regenerateToken(request: Request, response: Response) {
		//* Handle Bad Request
		if (!RequestBodyHandler.isValidKeys(request.body, ["token"]))
			return ResponseBody.handleBadRequest(response)

		//? Grab the token
		const refreshToken = request.body.token.toString()

		//? Check if the token is valid or not
		const refreshTokenEntity = await TokenModel.findOne({
			token: refreshToken
		})

		//? Get the token exist status
		const tokenExistStatus = ResponseBody.isExists(refreshTokenEntity)

		//? If the token exists, delete the token and return
		if (tokenExistStatus) {
			let payload: PayloadSchemaType

			try {
				//? Verify the token
				const tokenVerifyPayload = verifyToken(
					refreshToken,
					TOKEN_TYPE.refreshToken
				)

				//? Create the payload
				payload = { _id: tokenVerifyPayload["_id"].toString() }
			} catch (error) {
				return ResponseBody.error_token_invald(response, {
					status: 401,
					message: `Invalid token found`,
					data: {}
				})
			}

			//? Generate the access token from the payload
			const newAccessToken = generateAccessToken(payload)

			//? return the access token
			return ResponseBody.success_found(response, {
				status: 200,
				message: `Token successfully regenerated`,
				data: {
					access_token: newAccessToken
				}
			})
		}

		//? Else return token doesn't exist
		return ResponseBody.error_not_found(response, {
			status: 404,
			message: `Token not found in the database`,
			data: {}
		})
	}
}

export { AuthQuery }
