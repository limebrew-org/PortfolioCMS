import { EducationSchemaType, InternshipSchemaType, JobSchemaType, ProjectSchemaType, SkillSchemaType } from "../utils/types"
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
