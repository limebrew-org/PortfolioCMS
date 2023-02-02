import { TokenModel } from "../schema/token"
import { TokenQueryType } from "../types/query"
import { ResponseBodyType } from "../types/response"
import { ResponseStatusHandler } from "../utils/handleResponse"
import { TokenSchemaType } from "../utils/types"
import { ProfileQuery } from "./Profile"

class TokenQuery {
	//TODO: Schema Name
	static schema: string = "Token"

	//TODO: Get Multiple Tokens based on query
	static async getMany(query: TokenQueryType) {}

	//TODO: Get A single Token based on Query
	static async getOne(query: TokenQueryType) {
		//? Grab a single Token by query
		const tokenEntity = await TokenModel.findOne(query)

		//? If token was not found
		if (tokenEntity === null)
			return ResponseStatusHandler.error_not_found(TokenQuery.schema)

		return ResponseStatusHandler.success_get_one(
			TokenQuery.schema,
			tokenEntity
		)
	}

	//TODO: Add Token for a profile
	static async addOne(tokenInfo: TokenSchemaType) {
		//? Else Create a new refresh token
		const newRefreshTokenEntity = new TokenModel(tokenInfo)
		return await TokenQuery.save(newRefreshTokenEntity, "ADD")
	}

	//TODO: Update Token by ID for a profile
	static async updateById(profile_id: String, newToken: String) {
		//? Check if the token exists for a profile
		const existingTokenResponse = await TokenQuery.getOne({
			profile_id: profile_id
		})

		//? If token not found then create a new one
		if (existingTokenResponse.status === 404)
			return await TokenQuery.addOne({
				profile_id: profile_id,
				token: newToken
			})

		//? If token exists, then update
		const originalTokenEntity = existingTokenResponse.data

		//? Update the existing token with the new token
		originalTokenEntity.token = newToken
		return await TokenQuery.save(originalTokenEntity, "UPDATE")
	}

	static async save(tokenEntity, routeType: String) {
		return await tokenEntity
			.save()
			.then((tokenInfo) => {
				if (routeType === "ADD")
					return ResponseStatusHandler.success_add(TokenQuery.schema)
				if (routeType === "UPDATE")
					return ResponseStatusHandler.success_update(
						TokenQuery.schema
					)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
	}

	//TODO: Delete Token by ID for a profile
	static async deleteOneById(profile_id: String) {
		//? Grab the Token for a profile
		const existingTokenResponse: ResponseBodyType = await TokenQuery.getOne(
			{
				profile_id: profile_id
			}
		)

		//? If token not found
		if (existingTokenResponse.status === 404)
			return ResponseStatusHandler.error_not_found(TokenQuery.schema)

		//? If token found, then grab the token from the response
		const tokenEntity = existingTokenResponse.data

		//? Remove the token if it exists
		const tokenDeleteResponse = tokenEntity
			.remove()
			.then((info) => {
				return ResponseStatusHandler.success_delete_one(
					TokenQuery.schema
				)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
		return tokenDeleteResponse
	}

	//TODO: Delete all tokens (for admin only)
	static async deleteMany() {}
}

export { TokenQuery }
