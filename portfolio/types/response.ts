import { EducationSchemaType, SkillSchemaType, ProjectSchemaType, InternshipSchemaType, JobSchemaType } from "./schema"
import { ProfileSchemaType } from "./schema"

//? ResponseBody Type
export type ResponseBodyType = {
	status?: number
	message?: String
	data?: any
	error?: String
}

//? Dashboard Response
export type DashboardResponseType = {
	profile?: ProfileSchemaType | {},
	education: EducationSchemaType | {},
	skills?: SkillSchemaType | {},
	projects: ProjectSchemaType | {},
	experience?: ExperienceResponseType
}

export type ExperienceResponseType = {
	internships?: InternshipSchemaType | {},
	jobs?: JobSchemaType | {}
}