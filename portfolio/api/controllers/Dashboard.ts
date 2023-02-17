import { Request, Response } from "express"
import { RequestBodyHandler } from "../../utils/handleFields"
import { ResponseBody } from "../../utils/handleResponse"
import { DashboardQueryType } from "../../types/query"
import { ProfileQuery } from "../../query/Profile"
import { EducationQuery } from "../../query/Education"
import { SkillQuery } from "../../query/Skills"
import { ProjectQuery } from "../../query/Project"
import { ExperienceQuery } from "../../query/Experience"
import { ExperienceType } from "../../types/schema"
import { DashboardResponseType } from "../../types/response"
import { CachePolicy } from "../../cache/policy"

class DashboardController {
	async getDashboard(
		request: Request,
		response: Response
	): Promise<Response> {
		const query: DashboardQueryType = request.query
		const dashboardResponse: DashboardResponseType = {
			profile: {},
			education: {},
			skills: {},
			projects: {},
			experience: {
				internships: {},
				jobs: {}
			}
		}

		//? Handle bad request
		if (!RequestBodyHandler.isValidMandatoryFields(query, ["username"]))
			return ResponseBody.handleBadRequest(response)

		//? Grab the username from the request query
		const username = query.username.toString()

		//? Find username from Cache
		const cacheHitResponse = await CachePolicy.isCacheHit(username)

		//TODO: Check if username (key) exists in the cache
		if (cacheHitResponse["hit"] === true)
			return ResponseBody.success_found(response, {
				status: 200,
				message: `${username} fetched successfully`,
				data: cacheHitResponse["value"]
			})

		//? Return Profile (masked profile)
		const maskedProfileEntityResponse = await ProfileQuery.getOne(
			{ username: username },
			true
		)

		//! If profile does not exist
		if (maskedProfileEntityResponse.status !== 200)
			return ResponseBody.error_not_found(
				response,
				maskedProfileEntityResponse
			)

		//? If found, then grab the profile id
		const profileId = maskedProfileEntityResponse.data._id

		//? Set the profile info
		dashboardResponse.profile = maskedProfileEntityResponse.data

		//? Return Education Entities
		const educationEntitiesResponse = await EducationQuery.getMany({
			profile_id: profileId
		})

		//? Return Skill Entity
		const skillEntityResponse = await SkillQuery.getOne({
			profile_id: profileId
		})

		//? Return Project entities
		const projectEntitiesResponse = await ProjectQuery.getMany({
			profile_id: profileId
		})

		//? Return Experience entities
		//* Get Internship Entities
		const internshipEntityResponse = await ExperienceQuery.getMany(
			{ profile_id: profileId },
			ExperienceType.internship
		)

		//* Get Job Entities
		const jobEntitiesResponse = await ExperienceQuery.getMany(
			{ profile_id: profileId },
			ExperienceType.job
		)

		//? Now check response status for the above apis
		if (educationEntitiesResponse.status === 200)
			dashboardResponse.education = educationEntitiesResponse.data

		if (skillEntityResponse.status === 200)
			dashboardResponse.skills = skillEntityResponse.data

		if (projectEntitiesResponse.status === 200)
			dashboardResponse.projects = projectEntitiesResponse.data

		if (internshipEntityResponse.status === 200)
			dashboardResponse.experience.internships =
				internshipEntityResponse.data

		if (jobEntitiesResponse.status === 200)
			dashboardResponse.experience.jobs = jobEntitiesResponse.data

		//? Now set the dashboard info in Redis Cache
		await CachePolicy.setCache(username, JSON.stringify(dashboardResponse))

		//? return Response to the client
		return ResponseBody.success_found(response, {
			status: 200,
			message: `${username} fetched successfully`,
			data: dashboardResponse
		})
	}
}

export { DashboardController }
