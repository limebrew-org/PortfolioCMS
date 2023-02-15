import { Request, Response, NextFunction } from "express"
import { ResponseBodyType } from "../types/response"
import { AUTHENTICATION_METHOD } from "../utils/constants"
import { getAuthorizationType } from "../utils/getAuthorization"
import { ResponseBody, ResponseStatusHandler } from "../utils/handleResponse"
import { verifyToken } from "../utils/handleToken"
import { AuthorizationResponseType } from "../types/middleware"
import { ProfileQuery } from "../query/Profile"
import { APIKeyQuery } from "../query/APIKey"

//TODO: Handle JWT Authorization
const handleJWTAuth = async (tokenRaw: String): Promise<ResponseBodyType> => {
	try {
		//? Grab the token from the header (Bearer ...)
		const token = tokenRaw.split(" ")[1]

		//? Verify signature of the access token and grab the payload
		const payload = verifyToken(token, "access_token")

		//? Get profile by the _id inside the payload and mask the profile
		const existingProfileResponse: ResponseBodyType =
			await ProfileQuery.getOne({
				_id: payload["_id"].toString()
			},true)

		//? If profile not found
		if (existingProfileResponse.status === 404)
			return ResponseStatusHandler.error_not_found("Profile")

		//? Grab the profile entity from the response
		const profileEntity = existingProfileResponse.data

		//? Return the response
		console.log("JWT-Middleware verification successful!")
		return ResponseStatusHandler.success_token_valid(profileEntity)
	} catch (error) {
		console.log("JWT-Middleware verification failed!")
		return ResponseStatusHandler.error_unauthorized()
	}
}

//TODO: Handle API Key Authorization
const handleAPIKeyAuth = async (tokenRaw:String): Promise<ResponseBodyType> => {
	try {
		//? Grab the token from the header (Bearer ...)
		const apiKey = tokenRaw

		//? Check if API key exists in the database for a profile id
		const getAPIKeyResponse: ResponseBodyType = await APIKeyQuery.getOne({
			api_key: apiKey.toString()
		})

		//? If key not found
		if(getAPIKeyResponse.status === 404)
			return ResponseStatusHandler.error_not_found("APIKey")

		//? If key found, grab the profile id
		const profileId: string = getAPIKeyResponse.data.profile_id

		//? Get profile from API key inside the payload and mask the profile
		const existingProfileResponse: ResponseBodyType =
			await ProfileQuery.getOne({_id: profileId},true)
		
		//? If profile found for the given id, set profile in the request
		if(existingProfileResponse.status === 404)
			return ResponseStatusHandler.error_not_found("Profile")

		//? Grab the profile entity from the resp
		const profileEntity = existingProfileResponse.data

		//? Return the response
		console.log("API-Key-Middleware verification successful!")
		return ResponseStatusHandler.success_token_valid(profileEntity)

	} catch (error) {
		console.log("API-Key-Middleware verification failed!")
		return ResponseStatusHandler.error_unauthorized()
	}
}

const TokenMiddleWare = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	//? Get the authorization type
	const authorizationResponse: AuthorizationResponseType =
		getAuthorizationType(request)

	//? If authorization not passed
	if (authorizationResponse === null) {
		return ResponseBody.error_token_invald(response, {
			status: 401,
			error: "Authorization header not provided!"
		})
	}

	//? Grab the authorization type and value
	const { type, value } = authorizationResponse

	//? token validation response
	let tokenValidationResponse: ResponseBodyType

	//? Check the authorization type
	if (type === AUTHENTICATION_METHOD.JWT)
		tokenValidationResponse = await handleJWTAuth(value)
	else if (type === AUTHENTICATION_METHOD.API_KEY)
		tokenValidationResponse = await handleAPIKeyAuth(value)

	if (tokenValidationResponse.status === 200) {
		request["profile"] = tokenValidationResponse.data
		next()
	} else
		return ResponseBody.error_token_invald(
			response,
			tokenValidationResponse
		)
}

export { TokenMiddleWare }
