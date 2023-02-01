import { ProfileModel } from "../schema/profile"
import { ResponseBody } from "../utils/handleResponse"
import { Request, Response } from "express"
import {
	PayloadSchemaType,
	ProfileSchemaType,
	ProfileMiddlewareType
} from "../utils/types"
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
	//TODO Logout profile
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

	//TODO Regenerate accesstoken
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
