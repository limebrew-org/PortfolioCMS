import { Request, Response } from "express"
import { PORTFOLIO_PROFILE_REGISTER_FIELDS } from "../utils/constants"
import { RequestBodyHandler } from "../utils/handleFields"
import { ResponseBody } from "../utils/handleResponse"
import {
	PayloadSchemaType,
	ProfileSchemaType
} from "../utils/types"
import { ProfileQuery } from "../query/Profile"
import { comparePassword, hashPassword } from "../utils/handlePassword"
import { generateAccessToken, generateRefreshToken } from "../utils/handleToken"
import { TokenQuery } from "../query/Token"
import { ResponseBodyType } from "../types/response"

class AuthController {
	async register(request: Request, response: Response) {
		//? Grab the request body
		const inputProfileDetails: ProfileSchemaType = request.body

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidKeys(
				inputProfileDetails,
				PORTFOLIO_PROFILE_REGISTER_FIELDS
			)
		)
			return ResponseBody.handleBadRequest(response)

		inputProfileDetails.username = inputProfileDetails.username.toString()
		inputProfileDetails.email = inputProfileDetails.email.toString()

		//? Check user in the database by username
		const existingProfileResponseByUsername = await ProfileQuery.getOne({
			username: inputProfileDetails.username
		})

		//? Check user in the database by email
		const existingProfileResponseByEmail = await ProfileQuery.getOne({
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
		const hashedPassword = await hashPassword(
			inputProfileDetails.password.toString()
		)

		//? Update the password with hashed password in request body
		inputProfileDetails.name = request.body.username.toString()
		inputProfileDetails.password = hashedPassword.toString()
		inputProfileDetails.bio = ""
		inputProfileDetails.socials = {
			twitter: "",
			linkedin: "",
			github: ""
		}

		const addProfileResponse = await ProfileQuery.addOne(inputProfileDetails)
		return ResponseBody.handleStatus(response,addProfileResponse)
	}

	async login(request: Request, response: Response) {
		//? Grab the request body
		const inputProfileDetails: ProfileSchemaType = request.body

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidKeys(
				inputProfileDetails,
				PORTFOLIO_PROFILE_REGISTER_FIELDS
			)
		)
			return ResponseBody.handleBadRequest(response)

		//? Check user by email or username in the database
		let existingProfileResponse: ResponseBodyType

		if (RequestBodyHandler.isValidKeys(inputProfileDetails, ["email"])) {
			existingProfileResponse = await ProfileQuery.getOne({
				email: inputProfileDetails.email.toString().toLowerCase()
			})
		} else if (
			RequestBodyHandler.isValidKeys(inputProfileDetails, ["username"])
		) {
			existingProfileResponse = await ProfileQuery.getOne({
				username: inputProfileDetails.username.toString().toLowerCase()
			})
		}

		//? Check if the profile exists by email or username
		if (existingProfileResponse.status === 404)
			return ResponseBody.error_not_found(response, existingProfileResponse)

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
		const accessToken = generateAccessToken(payload)
		const refreshToken = generateRefreshToken(payload)

		//? Update Token (if not found then add)
		const updateTokenResponse:ResponseBodyType = await TokenQuery.updateById(
			profileEntity._id,
			refreshToken
		)

		//? If update status is 200 or 201 then return jwt
		if(updateTokenResponse.status === 200 || updateTokenResponse.status === 201)
			return ResponseBody.success_auth(response,{
				status:200,
				message: `Success! ${profileEntity.username} logged in successfully!`,
				data: {
					accessToken: accessToken,
					refreshToken: refreshToken
				}
			})
		
		return ResponseBody.error_internal(response,updateTokenResponse)
	}

	async logout(request: Request, response: Response) {}

	async generateToken(request: Request, response: Response) {}
}

export { AuthController }
