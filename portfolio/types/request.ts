import { SocialType } from "./schema"

//? Profile update request body type
export type ProfileUpdateType = {
	name: String
	bio: String
	socials: SocialType
}

//? Education Update type
export type EducationUpdateType = {
	qualification: String
	institution: String
	grade: String
	tenure: String
}

//? Experience Update type
export type ExperienceUpdateType = {
	company: String
	role: String
	technologies: Array<String>
	summary: String
	tenure: String
}

//? Projects Update type
export type ProjectUpdateType = {
	name: String
	description: String
	technologies: Array<String>
	link: String
}

//? Skills Update type
export type SkillUpdateType = {
	frontend: Array<String>
	backend: Array<String>
	database: Array<String>
	cloud: Array<String>
	fundamentals: Array<String>
}