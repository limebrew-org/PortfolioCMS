import { Request, Response } from "express"
import { PORTFOLIO_PROFILE_REGISTER_FIELDS, TOKEN } from "../utils/constants"
import { RequestBodyHandler } from "../utils/handleFields"
import { ResponseBody } from "../utils/handleResponse"
import { ProfileSchemaType, TokenSchemaType } from "../types/schema"
import { ProfileQuery } from "../query/Profile"
import { comparePassword, hashPassword } from "../utils/handlePassword"
import {
	generateAccessToken,
	generateRefreshToken,
	generateAPIKey,
	verifyToken
} from "../utils/handleToken"
import { TokenQuery } from "../query/Token"
import { ResponseBodyType } from "../types/response"
import { ProfileMiddlewareType, PayloadSchemaType } from "../types/middleware"
import { APIKeyQuery } from "../query/APIKey"

class AuthController {
	//TODO: Register profile (public)
	async register(request: Request, response: Response): Promise<Response> {
		//? Grab the request body
		const inputProfileDetails: ProfileSchemaType = request.body

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(
				inputProfileDetails,
				PORTFOLIO_PROFILE_REGISTER_FIELDS
			)
		)
			return ResponseBody.handleBadRequest(response)

		//? Handle lowercase
		inputProfileDetails.username = inputProfileDetails.username
			.toString()
			.toLowerCase()
		inputProfileDetails.email = inputProfileDetails.email
			.toString()
			.toLowerCase()

		//? Check user in the database by username
		const existingProfileResponseByUsername: ResponseBodyType =
			await ProfileQuery.getOne({
				username: inputProfileDetails.username
			})

		//? Check user in the database by email
		const existingProfileResponseByEmail: ResponseBodyType =
			await ProfileQuery.getOne({
				email: inputProfileDetails.email
			})

		//? if profile exists with email
		if (existingProfileResponseByEmail.status === 200)
			return ResponseBody.error_exists(response, {
				status: 403,
				error: `Error! Profile with email: ${inputProfileDetails.email} already exists`
			})

		//? If profile exists with username
		if (existingProfileResponseByUsername.status === 200)
			return ResponseBody.error_exists(response, {
				status: 403,
				error: `Error! Profile with username: ${inputProfileDetails.username} already exists`
			})

		//? Hash the password
		const hashedPassword: String = await hashPassword(
			inputProfileDetails.password.toString()
		)

		//? Update the password with hashed password in request body
		inputProfileDetails.name = inputProfileDetails.username.toString()
		inputProfileDetails.password = hashedPassword
		inputProfileDetails.bio = ""
		inputProfileDetails.socials = {
			twitter: "",
			linkedin: "",
			github: ""
		}

		const addProfileResponse: ResponseBodyType = await ProfileQuery.addOne(
			inputProfileDetails
		)
		return ResponseBody.handleResponse(response, addProfileResponse)
	}

	//TODO: Login profile (public)
	async login(request: Request, response: Response): Promise<Response> {
		//? Grab the request body
		const inputProfileDetails: ProfileSchemaType = request.body

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(
				inputProfileDetails,
				PORTFOLIO_PROFILE_REGISTER_FIELDS
			)
		)
			return ResponseBody.handleBadRequest(response)

		//? declare a variable to store the response
		let existingProfileResponse: ResponseBodyType

		//? Check user by email or username in the database
		if (
			RequestBodyHandler.isValidMandatoryFields(inputProfileDetails, [
				"email"
			])
		) {
			existingProfileResponse = await ProfileQuery.getOne({
				email: inputProfileDetails.email.toString().toLowerCase()
			})
		} else if (
			RequestBodyHandler.isValidMandatoryFields(inputProfileDetails, [
				"username"
			])
		) {
			existingProfileResponse = await ProfileQuery.getOne({
				username: inputProfileDetails.username.toString().toLowerCase()
			})
		}

		//? Check if the profile exists by email or username
		if (existingProfileResponse.status === 404)
			return ResponseBody.error_not_found(
				response,
				existingProfileResponse
			)

		//? If profile found, Grab the profile from the response
		const profileEntity = existingProfileResponse.data

		//? compare password (request body with profile entity)
		const comparePasswordStatus = await comparePassword(
			inputProfileDetails.password.toString(),
			profileEntity.password.toString()
		)

		//? If password does not match
		if (!comparePasswordStatus)
			return ResponseBody.error_not_matched(response, {
				status: 401,
				error: `Error! Password did not match`
			})

		//? Create the payload
		const payload: PayloadSchemaType = {
			_id: profileEntity._id.toString()
		}

		//? Create Access Token and Refresh Token
		const accessToken: String = generateAccessToken(payload)
		const refreshToken: String = generateRefreshToken(payload)

		//? Update Token (if not found then add)
		const updateTokenResponse: ResponseBodyType =
			await TokenQuery.updateById(profileEntity._id, refreshToken)

		//? If update status is 201 then return jwt
		if (updateTokenResponse.status === 201) {
			//? Set access token and refresh token as HTTP Only Cookies
			response.cookie("access_token",accessToken, {
				httpOnly: true,
				maxAge: 2700000,
				secure: true
			})

			response.cookie("refresh_token",refreshToken, {
				httpOnly: true
			})

			return ResponseBody.success_auth(response, {
				status: 200,
				message: `Success! ${profileEntity.username} logged in successfully!`
			})
		}
			

		//? Else handle response
		return ResponseBody.handleResponse(response, updateTokenResponse)
	}

	//TODO: Logout user (authorization required)
	async logout(request: Request, response: Response) {
		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Delete the refresh token for the profile
		const tokenDeleteResponse: ResponseBodyType =
			await TokenQuery.deleteOneById(profile._id)

		//? If token delete is successful
		if (tokenDeleteResponse.status === 201)
			return ResponseBody.success_delete(response, {
				status: 201,
				message: `Success! Token deleted, User logged out successfully`
			})

		//? else handle response
		return ResponseBody.handleResponse(response, tokenDeleteResponse)
	}

	//TODO: Generate Access Token
	async generateToken(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the request body
		const inputTokenDetails: TokenSchemaType = request.body

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidMandatoryFields(inputTokenDetails, [
				"token"
			])
		)
			return ResponseBody.handleBadRequest(response)

		//? Else grab the refresh token
		const refreshToken: string = inputTokenDetails.token.toString()

		//? Check if the refresh token is valid
		let payload: PayloadSchemaType

		try {
			const tokenVerifiedPayload = verifyToken(
				refreshToken,
				TOKEN.refreshToken
			)
			payload = { _id: tokenVerifiedPayload["_id"].toString() }
		} catch (error) {
			return ResponseBody.error_token_invald(response, {
				status: 401,
				error: `Error! Token verification failed`
			})
		}

		//? If verified, check if the refresh token exists in the database
		const existingTokenResponse: ResponseBodyType = await TokenQuery.getOne(
			{
				token: refreshToken
			}
		)

		//? If refresh token was found, create the access token
		if (existingTokenResponse.status === 200) {
			//* generate access token with the payload
			const newAccessToken = generateAccessToken(payload)

			//* return the access token
			return ResponseBody.success_found(response, {
				status: 200,
				message: `Token successfully generated`,
				data: {
					access_token: newAccessToken
				}
			})
		}

		//? if token not found
		if (existingTokenResponse.status === 404)
			return ResponseBody.error_unauthorized(response, {
				status: 401,
				error: `Error! Refresh Token not found, user not Logged in!`
			})

		//? Else handle response
		return ResponseBody.handleResponse(response, existingTokenResponse)
	}

	//TODO: Generate API key
	async generateKey(request: Request, response: Response): Promise<Response> {
		//? Grab the profile from middleware
		const profile: ProfileMiddlewareType = request["profile"]

		//? Grab the profile id
		const profileId: string = profile._id.toString()

		//? Check for already existing key
		const getAPIKeyResponseByProfileId: ResponseBodyType =
			await APIKeyQuery.getOne({ profile_id: profileId })

		//? If key found, return error
		if (getAPIKeyResponseByProfileId.status === 200)
			return ResponseBody.success_found(response, {
				status: 200,
				message: `API key already exists for username: ${profile.username}`,
				data: { apiKey: getAPIKeyResponseByProfileId.data.api_key }
			})

		//? If no existing key found, generate API key
		const apiKey = generateAPIKey()

		//? Add key into the database
		const addKeyResponse: ResponseBodyType = await APIKeyQuery.addOne({
			profile_id: profileId,
			api_key: apiKey
		})

		if (addKeyResponse.status === 201)
			return ResponseBody.success_add(response, {
				status: 201,
				message: `API Key generated successfully for profile Id: ${profileId}`,
				data: {
					apikey: apiKey
				}
			})

		return ResponseBody.handleResponse(response, addKeyResponse)
	}
}

export { AuthController }
