import { DashboardResponseType, ResponseBodyType } from "../types/response"
import { Document } from "mongoose"
import { Response } from "express"
import { DashboardQueryType } from "../types/query"

class ResponseBody {
	constructor() {}

	static handleResponse(
		response: Response,
		info: ResponseBodyType,
		data?: Boolean
	) {
		if (info.status === 200)
			return ResponseBody.success_found(response, info)
		if (info.status === 201) {
			if (data)
				return ResponseBody.success_update(response, {
					status: 201,
					message: info.message,
					data: info.data
				})
			return ResponseBody.success_update(response, {
				status: 201,
				message: info.message
			})
		}
		if (info.status === 404)
			return ResponseBody.error_not_found(response, info)
		if (info.status === 500)
			return ResponseBody.error_internal(response, info)
		else return ResponseBody.error_internal(response, info)
	}

	static demoResponse(response: Response) {
		return response.status(200).json({
			status: 200,
			message: `This is a demo response`,
			data: {}
		})
	}

	static isExists(entity: Object) {
		if (entity === null) return false
		return true
	}

	static handleEntityListResponse(
		entityList: Array<Document>,
		response: Response,
		entityName: String
	) {
		if (entityList.length === 0)
			return ResponseBody.error_not_found(response, {
				status: 404,
				message: `${entityName} not found`,
				data: {}
			})
		return ResponseBody.success_found(response, {
			status: 200,
			message: `${entityName} found`,
			data: entityList
		})
	}

	static handleNullEntityResponse(
		entity: Object,
		response: Response,
		entityName: string
	) {
		if (entity == null) {
			return ResponseBody.error_not_found(response, {
				status: 404,
				message: `${entityName} not found`,
				data: {}
			})
		}
		return ResponseBody.success_found(response, {
			status: 200,
			message: `${entityName} was found`,
			data: entity
		})
	}

	static handleBadRequest(response: Response) {
		return ResponseBody.error_bad_request(response, {
			status: 400,
			message: `400 Bad request! Mandatory fields not provided`
		})
	}

	static success_dashboard(response: Response,info: DashboardResponseType) {
		return response.status(200).json(info)
	}

	static success_auth(response: Response, info: ResponseBodyType) {
		return response.status(200).json(info)
	}

	static success_found(response: Response, info: ResponseBodyType) {
		return response.status(200).json(info)
	}

	static success_add(response: Response, info: ResponseBodyType) {
		return response.status(201).json(info)
	}

	static success_update(response: Response, info: ResponseBodyType) {
		return response.status(201).json(info)
	}

	static success_delete(response: Response, info: ResponseBodyType) {
		return response.status(201).json(info)
	}

	static error_not_found(response: Response, info: ResponseBodyType) {
		return response.status(404).json(info)
	}

	static error_bad_request(response: Response, info: ResponseBodyType) {
		return response.status(400).json(info)
	}

	static error_exists(response: Response, info: ResponseBodyType) {
		return response.status(403).json(info)
	}

	static error_internal(response: Response, info: ResponseBodyType) {
		return response.status(500).json(info)
	}

	static error_token_invald(response: Response, info: ResponseBodyType) {
		return response.status(401).json(info)
	}

	static error_not_matched(response: Response, info: ResponseBodyType) {
		return response.status(401).json(info)
	}

	static error_unauthorized(response: Response, info: ResponseBodyType) {
		return response.status(401).json(info)
	}
}

class ResponseStatusHandler {
	static success_token_valid(profile) {
		return {
			status: 200,
			message: `Success! token verification was successful`,
			data: profile
		}
	}

	static success_get_one(schema: String, entity: Object): ResponseBodyType {
		return {
			status: 200,
			message: `Success! ${schema} details found`,
			data: entity
		}
	}

	static success_get_many(
		schema: String,
		entityList: Array<Document>
	): ResponseBodyType {
		return {
			status: 200,
			message: `Success! ${entityList.length} ${schema} details were found`,
			data: entityList
		}
	}
	static success_add(schema: String, data?: any): ResponseBodyType {
		return {
			status: 201,
			message: `Success! ${schema} details added successfully`,
			data: data
		}
	}
	static success_update(schema: String, data?: any): ResponseBodyType {
		return {
			status: 201,
			message: `Success! ${schema} details updated successfully`,
			data: data
		}
	}
	static success_delete_one(schema: String): ResponseBodyType {
		return {
			status: 201,
			message: `Success! ${schema} details deleted successfully`
		}
	}
	static success_delete_many(
		schema: String,
		delete_count: Number
	): ResponseBodyType {
		return {
			status: 201,
			message: `Success! ${delete_count} ${schema}'s were deleted successfully`
		}
	}
	static error_known(error: String): ResponseBodyType {
		return {
			status: 500,
			error: `Error! ${error}`
		}
	}
	static error_unknown(): ResponseBodyType {
		return {
			status: 500,
			error: `Error! Something went wrong`
		}
	}
	static error_not_found(schema: String): ResponseBodyType {
		return {
			status: 404,
			error: `Error! No ${schema} details were found`
		}
	}

	static error_unauthorized(): ResponseBodyType {
		return {
			status: 401,
			error: `Unauthorized! Token not provided or has been expired`
		}
	}

	static error_exists(schema: String): ResponseBodyType {
		return {
			status: 403,
			error: `Error! ${schema} already exists`
		}
	}
}

export { ResponseBody, ResponseStatusHandler }
