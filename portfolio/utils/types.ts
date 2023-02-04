//? Profile Schema request body Type
export type ProfileSchemaType = {
	username: String
	name: String
	email: String
	bio: String
	socials: SocialType
	password: String
}

//? Profile request Type (Middleware)
export type ProfileMiddlewareType = {
	_id: String
	username: String
	name: String
	email: String
	bio: String
	socials: SocialType
}

//? Profile update request body type
export type ProfileUpdateType = {
	name: String
	bio: String
	socials: SocialType
}

//? Education Request Body Type
export type EducationSchemaType = {
	profile_id: String
	qualification: String
	institution: String
	grade: String
	tenure: String
}

//? Education Update type
export type EducationUpdateType = {
	qualification: String
	institution: String
	grade: String
	tenure: String
}

//? Global Experience Field Type
export interface ExperienceFieldType {
	profile_id: String
	company: String
	role: String
	technologies: Array<String>
	summary: String
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

//? Experience Field Schema Type
export interface InternshipSchemaType extends ExperienceFieldType {}
export interface JobSchemaType extends ExperienceFieldType {}

//? Projects Request Body Type
export type ProjectSchemaType = {
	profile_id: String
	name: String
	description: String
	technologies: Array<String>
	link: String
}

//? Projects Update type
export type ProjectUpdateType = {
	name: String
	description: String
	technologies: Array<String>
	link: String
}

//? Skills Request Body Type
export type SkillSchemaType = {
	profile_id: String
	frontend: Array<String>
	backend: Array<String>
	database: Array<String>
	cloud: Array<String>
	fundamentals: Array<String>
}

//? Skills Update type
export type SkillUpdateType = {
	frontend: Array<String>
	backend: Array<String>
	database: Array<String>
	cloud: Array<String>
	fundamentals: Array<String>
}

//? ResponseBody Type
export type ResponseBodyType = {
	status?: number
	message?: String
	data?: any
	error?: String
}

//? API Key Type
export type APIKeySchemaType = {
	profile_id: String
	api_key: String
}

//? Token Schema Type
export type TokenSchemaType = {
	profile_id?: String
	token: String
}

//? Global Social Field Type
export type SocialType = {
	twitter: String
	linkedin: String
	github: String
}

//? Payload type
export type PayloadSchemaType = {
	_id: string
}

//? Authorization response
export type AuthorizationResponseType = {
	type: String
	value: String
}
