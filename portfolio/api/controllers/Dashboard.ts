import { Request, Response } from "express-serve-static-core"
import { RequestBodyHandler } from "../../utils/handleFields"
import { ResponseBody } from "../../utils/handleResponse"
import mongoose from "mongoose"
import { DashboardQueryType } from "../../types/query"
import { ProfileQuery } from "../../query/Profile"
import { EducationQuery } from "../../query/Education"
import { SkillQuery } from "../../query/Skills"
import { ProjectQuery } from "../../query/Project"
import { ExperienceQuery } from "../../query/Experience"
import { ExperienceType } from "../../types/schema"
import { DashboardResponseType } from "../../types/response"


class DashboardController {
	//? Handling Object Id
	static ObjectId = mongoose.Types.ObjectId

	async getDashboard(
		request: Request,
		response: Response
	): Promise<Response> {
		const query: DashboardQueryType = request.params
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
		if(
			!RequestBodyHandler.isValidMandatoryFields(query,['id']) ||
			!DashboardController.ObjectId.isValid(query?.id.toString()))
			return ResponseBody.handleBadRequest(response)

		//? Grab the profile Id
		const profileId = query.id.toString()

		//? Return Profile (masked profile)
		const maskedProfileEntityResponse = await ProfileQuery.getOne({ _id: profileId },true)

		//? Return Education Entities 
		const educationEntitiesResponse = await EducationQuery.getMany({ profile_id: profileId })
		
		//? Return Skill Entity 
		const skillEntityResponse = await SkillQuery.getOne({ profile_id: profileId })

		//? Return Project entities
		const projectEntitiesResponse = await ProjectQuery.getMany( { profile_id: profileId })

		//? Return Experience entities
		//* Get Internship Entities
		const internshipEntityResponse = await ExperienceQuery.getMany( { profile_id: profileId }, ExperienceType.internship)
		
		//* Get Job Entities
		const jobEntitiesResponse = await ExperienceQuery.getMany( { profile_id: profileId }, ExperienceType.job)

		//! If profile does not exist
		if(maskedProfileEntityResponse.status !== 200)
			return ResponseBody.error_not_found(response,maskedProfileEntityResponse)
		
		//? Set the profile info
		dashboardResponse.profile = maskedProfileEntityResponse.data
		
		//? Now check response status for the above apis
		if(educationEntitiesResponse.status === 200)
			dashboardResponse.education = educationEntitiesResponse.data
		
		if(skillEntityResponse.status === 200)
			dashboardResponse.skills = skillEntityResponse.data
		
		if(projectEntitiesResponse.status === 200)
			dashboardResponse.projects = projectEntitiesResponse.data
		
		if(internshipEntityResponse.status === 200)
			dashboardResponse.experience.internships = internshipEntityResponse.data

		if(jobEntitiesResponse.status === 200)
			dashboardResponse.experience.jobs = jobEntitiesResponse.data
		
		return ResponseBody.success_dashboard(response,dashboardResponse)
	}
}

export { DashboardController }
