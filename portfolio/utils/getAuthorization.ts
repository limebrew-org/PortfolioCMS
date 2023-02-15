import { Request } from "express"
import { MiddlewareConfiguration,AUTHENTICATION_METHOD } from "./constants"
import { AuthorizationResponseType } from "../types/middleware"

const getAuthorizationType = (request: Request) => {
	//? List request headers
	const headers = request.headers

	//? Initialize authorization response
	const authorizationResponse: AuthorizationResponseType = {
		type: "",
		value: ""
	}

	//? Grab the Token header configuration
	const ApiKeyHeader:string = MiddlewareConfiguration.API_KEY_HEADER
	const AccessTokenHeader:string = MiddlewareConfiguration.ACCESS_TOKEN_HEADER


	//? Check if access_token passed in authorization header
	if (AccessTokenHeader in headers) {
		authorizationResponse.type = AUTHENTICATION_METHOD.JWT
		authorizationResponse.value =
			headers[AccessTokenHeader].toString()
		return authorizationResponse
	}
	
	//? Check if API key passed in header
	if (ApiKeyHeader in headers) {
		authorizationResponse.type = AUTHENTICATION_METHOD.API_KEY
		authorizationResponse.value =
			headers[ApiKeyHeader].toString()
		return authorizationResponse
	}

	return null
}

export { getAuthorizationType }
