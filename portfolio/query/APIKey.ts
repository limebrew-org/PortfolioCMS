import { APIKeyModel } from "../schema/apiKey";
import { APIKeyQueryType } from "../types/query";
import { ResponseBodyType } from "../types/response";
import { APIKeySchemaType } from "../types/schema";
import { ResponseStatusHandler } from "../utils/handleResponse";

class APIKeyQuery {
    //TODO: Schema Name
    static schema: string = 'APIKey'

    //TODO: Get API Key based on profile Id
    static async getOne(query: APIKeyQueryType): Promise<ResponseBodyType> {
        //? Grab API Key by query
        const apiKeyEntity = await APIKeyModel.findOne(query)
        
        //? If not found, return error
        if(apiKeyEntity === null)
            return ResponseStatusHandler.error_not_found(APIKeyQuery.schema)
        
        //? If found, return success
        return ResponseStatusHandler.success_get_one(
            APIKeyQuery.schema,
            apiKeyEntity
        ) 
         
    }

    //TODO: Add API Key for a profile Id
    static async addOne(apiKeyInfo: APIKeySchemaType): Promise<ResponseBodyType> {
        const newAPIKeyEntity = new APIKeyModel(apiKeyInfo)
        return await APIKeyQuery.save(newAPIKeyEntity, "ADD")
    }
    //TODO: Save entity in the database
    static async save(
		apiKeyEntity,
		routeType: String
	): Promise<ResponseBodyType> {
		return await apiKeyEntity
			.save()
			.then((apiKeyInfo) => {
				if (routeType === "ADD")
					return ResponseStatusHandler.success_add(APIKeyQuery.schema)
				if (routeType === "UPDATE")
					return ResponseStatusHandler.success_update(
						APIKeyQuery.schema
					)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
	} 
}

export {APIKeyQuery}