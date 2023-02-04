import { TokenModel } from "../schema/token"
import { TokenQueryType } from "../types/query"
import { ResponseBodyType } from "../types/response"
import { ResponseStatusHandler } from "../utils/handleResponse"
import { TokenSchemaType } from "../utils/types"

class TokenQuery {
	//TODO: Schema Name
	static schema: string = "Token"

	//TODO: Get Multiple Tokens based on query
	static async getMany(query: TokenQueryType): Promise<ResponseBodyType> {
		//? Get All Tokens for a profile (ideally 1 for each profile)
		const tokenEntityList = await TokenModel.find(query)

		//? If empty token list
		if (tokenEntityList.length === 0)
			return ResponseStatusHandler.error_not_found(TokenQuery.schema)

		//? Else return filtered token EntityList
		return ResponseStatusHandler.success_get_many(
			TokenQuery.schema,
			tokenEntityList
		)
	}

	//TODO: Get A single Token based on Query
	static async getOne(query: TokenQueryType): Promise<ResponseBodyType> {
		//? Grab a single Token by query
		const tokenEntity = await TokenModel.findOne(query)

		//? If token was not found
		if (tokenEntity === null)
			return ResponseStatusHandler.error_not_found(TokenQuery.schema)

		//? Return token if it was found
		return ResponseStatusHandler.success_get_one(
			TokenQuery.schema,
			tokenEntity
		)
	}

	//TODO: Add Token for a profile
	static async addOne(tokenInfo: TokenSchemaType): Promise<ResponseBodyType> {
		//? Else Create a new refresh token
		const newRefreshTokenEntity = new TokenModel(tokenInfo)
		return await TokenQuery.save(newRefreshTokenEntity, "ADD")
	}

	//TODO: Update Token by ID for a profile
	static async updateById(
		profile_id: String,
		newToken: String
	): Promise<ResponseBodyType> {
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

	static async save(
		tokenEntity,
		routeType: String
	): Promise<ResponseBodyType> {
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
	static async deleteOneById(profile_id: String): Promise<ResponseBodyType> {
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
	static async deleteMany(): Promise<ResponseBodyType> {
		return
	}
}

export { TokenQuery }
