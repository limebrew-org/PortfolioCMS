import { Request } from "express"
import {
	PORTFOLIO_API_KEY_HEADER,
	PORTFOLIO_ACCESS_TOKEN_HEADER
} from "./constants"
import { AuthorizationResponseType } from "./types"
import { AUTHENTICATION_METHOD } from "./constants"

const getAuthorizationType = (request: Request) => {
	//? List request headers
	const headers = request.headers

	//? Initialize authorization response
	const authorizationResponse: AuthorizationResponseType = {
		type: "",
		value: ""
	}

	//? Check if API key passed in header
	if (PORTFOLIO_API_KEY_HEADER in headers) {
		authorizationResponse.type = AUTHENTICATION_METHOD.API_KEY
		authorizationResponse.value =
			headers[PORTFOLIO_API_KEY_HEADER].toString()
		return authorizationResponse
	}

	//? Check if access_token passed in authorization header
	if (PORTFOLIO_ACCESS_TOKEN_HEADER in headers) {
		authorizationResponse.type = AUTHENTICATION_METHOD.JWT
		authorizationResponse.value =
			headers[PORTFOLIO_ACCESS_TOKEN_HEADER].toString()
		return authorizationResponse
	}
	return null
}

export { getAuthorizationType }
