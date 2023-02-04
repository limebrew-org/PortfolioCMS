import { Request, Response } from "express"
import mongoose from "mongoose"
import { EducationQuery } from "../query/Education"
import { ExperienceQuery } from "../query/Experience"
import { ProfileQuery } from "../query/Profile"
import { ProjectQuery } from "../query/Project"
import { SkillQuery } from "../query/Skills"
import { TokenQuery } from "../query/Token"
import { ProfileQueryType, TokenQueryType } from "../types/query"
import { ResponseBodyType } from "../types/response"
import { ExperienceType } from "../types/schema"
import { RequestBodyHandler } from "../utils/handleFields"
import { ResponseBody } from "../utils/handleResponse"

class AdminController {
	//? Handling Object Id
	static ObjectId = mongoose.Types.ObjectId

	//TODO: Get Profile by Query
	async getProfileByQuery(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the query from request
		const query: ProfileQueryType = request.query

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidOptionalFields(query, [
				"_id",
				"username",
				"name",
				"email"
			])
		)
			return ResponseBody.handleBadRequest(response)

		//? Else Query in the database
		const queryProfileResponse: ResponseBodyType =
			await ProfileQuery.getMany(query, true)

		//? Return response
		return ResponseBody.handleResponse(response, queryProfileResponse)
	}

	//TODO: Get Education entities by Query
	async getEducationByQuery(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the query from request
		const query: ProfileQueryType = request.query

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidOptionalFields(query, [
				"_id",
				"profile_id",
				"qualification",
				"institution",
				"grade",
				"tenure"
			])
		)
			return ResponseBody.handleBadRequest(response)
		//? Get Education entities by query
		const queryEducationResponse: ResponseBodyType =
			await EducationQuery.getMany(query)

		//? Handle Response
		return ResponseBody.handleResponse(response, queryEducationResponse)
	}

	//TODO: Get Internship entities by Query
	async getInternshipsByQuery(
		request: Request,
		response: Response
	): Promise<Response> {
		///? Grab the query from request
		const query: ProfileQueryType = request.query

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidOptionalFields(query, [
				"_id",
				"profile_id",
				"company",
				"role",
				"technology",
				"tenure"
			])
		)
			return ResponseBody.handleBadRequest(response)
		//? Get Internship entities by query
		const queryInternshipResponse: ResponseBodyType =
			await ExperienceQuery.getMany(query, ExperienceType.internship)

		//? Handle Response
		return ResponseBody.handleResponse(response, queryInternshipResponse)
	}

	//TODO: Get Job entities by Query
	async getJobsByQuery(
		request: Request,
		response: Response
	): Promise<Response> {
		///? Grab the query from request
		const query: ProfileQueryType = request.query

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidOptionalFields(query, [
				"_id",
				"profile_id",
				"company",
				"role",
				"technology",
				"tenure"
			])
		)
			return ResponseBody.handleBadRequest(response)
		//? Get Job entities by query
		const queryJobResponse: ResponseBodyType =
			await ExperienceQuery.getMany(query, ExperienceType.job)

		//? Handle Response
		return ResponseBody.handleResponse(response, queryJobResponse)
	}

	//TODO: Get Project entities by query
	async getProjectByQuery(
		request: Request,
		response: Response
	): Promise<Response> {
		///? Grab the query from request
		const query: ProfileQueryType = request.query

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidOptionalFields(query, [
				"_id",
				"profile_id",
				"name",
				"technology"
			])
		)
			return ResponseBody.handleBadRequest(response)
		//? Get Project entities by query
		const queryProjectResponse: ResponseBodyType =
			await ProjectQuery.getMany(query)

		//? Handle Response
		return ResponseBody.handleResponse(response, queryProjectResponse)
	}

	//TODO: Get Skill entities by query
	async getSkillsByQuery(
		request: Request,
		response: Response
	): Promise<Response> {
		///? Grab the query from request
		const query: ProfileQueryType = request.query

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidOptionalFields(query, [
				"_id",
				"profile_id"
			])
		)
			return ResponseBody.handleBadRequest(response)
		//? Get Skill entities by query
		const querySkillResponse: ResponseBodyType = await SkillQuery.getMany(
			query
		)

		//? Handle Response
		return ResponseBody.handleResponse(response, querySkillResponse)
	}

	//TODO: Get tokens by Query
	async getTokensByQuery(
		request: Request,
		response: Response
	): Promise<Response> {
		//? Grab the profile from the query
		const query: TokenQueryType = request.query

		//* Handle Bad Request
		if (
			!RequestBodyHandler.isValidOptionalFields(query, [
				"_id",
				"profile_id"
			])
		)
			return ResponseBody.handleBadRequest(response)

		//? fetch the tokens by profile_id
		const queryTokenResponse: ResponseBodyType = await TokenQuery.getMany(
			query
		)

		//? Return response
		return ResponseBody.handleResponse(response, queryTokenResponse)
	}
}

export { AdminController }
