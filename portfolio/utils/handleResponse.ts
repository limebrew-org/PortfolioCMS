import { ResponseBodyType } from "./types"
import { Document } from "mongoose"
import { Response } from "express"

class ResponseBody {
	constructor() {}

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
			message: `400 Bad request! Mandatory fields not provided`,
			data: {}
		})
	}

	static success_found(response: Response, info: ResponseBodyType) {
		return response.status(200).json(info)
	}

	static success_add(response: Response, info: ResponseBodyType) {
		return response.status(200).json(info)
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
}

export { ResponseBody }
