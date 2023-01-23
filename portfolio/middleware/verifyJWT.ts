import { verifyToken } from "../utils/handleToken"
import { ProfileModel } from "../schema/profile"
import { ResponseBody } from "../utils/handleResponse"
import { NextFunction, Request, Response } from "express"
import {
	ProfileMiddlewareType,
	AuthorizationResponseType
} from "../utils/types"
import { getAuthorizationType } from "../utils/getAuthorization"
import { AUTHENTICATION_METHOD } from "../utils/constants"

//? Authorize token from request header
const middleware = async (
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
			message: "Authorization header not provided!",
			data: {}
		})
	}

	//? Grab the authorization type and value
	const { type, value } = authorizationResponse

	//? Handle authorization for JWT
	if (type === AUTHENTICATION_METHOD.JWT) {
		try {
			//? Grab the token from the header (Bearer ...)
			const token = value.split(" ")[1]

			//? Verify signature of the token to grab the payload
			const payload = verifyToken(token, "access_token")

			//? Get profile by the _id inside the payload
			const profileEntity = await ProfileModel.findOne({
				_id: payload["_id"].toString()
			})

			//? If profile not found
			if (profileEntity === null)
				return ResponseBody.error_not_found(response, {
					status: 404,
					message: "Profile not found!",
					data: {}
				})

			//? If profile found, set the profiledetails in the request and next (To hide the password)
			const modifiedProfile: ProfileMiddlewareType = {
				_id: profileEntity._id.toString(),
				username: profileEntity.username,
				name: profileEntity.name,
				email: profileEntity.email,
				bio: profileEntity.bio,
				socials: profileEntity.socials
			}

			//? Set the profile info in request
			request["profile"] = modifiedProfile
			console.log("Middleware verification successful!")
			next()
		} catch (error) {
			console.log("Middleware verification failed!")
			return ResponseBody.error_token_invald(response, {
				status: 401,
				message: "Invalid token!",
				data: {}
			})
		}
	}

	//? Handle authorization for API key
	if (AUTHENTICATION_METHOD.API_KEY) {
	}
}

export { middleware }
