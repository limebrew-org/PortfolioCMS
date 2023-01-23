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

//? Experience Request Body Type
export type ExperienceSchemaType = {
	profile_id: String
	internships: Array<InternshipType>
	jobs: Array<JobType>
}

//? Global Experience Field Type
interface ExperienceFieldType {
	company: String
	role: String
	technologies: Array<TechnologySchemaType>
	summary: String
	tenure: String
}

//? Experience Field Schema Type
export interface InternshipType extends ExperienceFieldType {}
export interface JobType extends ExperienceFieldType {}

//? Projects Request Body Type
export type ProjectSchemaType = {
	profile_id: String
	name: String
	description: String
	technologies: Array<TechnologySchemaType>
	link: String
}

//? Skills Request Body Type
export type SkillType = {
	profile_id: String
	frontend: Array<SkillSchemaType>
	backend: Array<SkillSchemaType>
	database: Array<SkillSchemaType>
	cloud: Array<SkillSchemaType>
	fundamentals: Array<SkillSchemaType>
}

//? ResponseBody Type
export type ResponseBodyType = {
	status: Number
	message: String
	data: any
}

//? API Key Type
export type APIKeySchemaType = {
	profile_id: String
	api_key: String
}

//? Token Schema Type
export type TokenSchemaType = {
	profile_id: String
	token: String
}

//? Global Technology Field Type
export type TechnologySchemaType = {
	name: String
}

//? Global Social Field Type
export type SocialType = {
	twitter: String
	linkedin: String
	github: String
}

//? Global Skill Schema Type
export type SkillSchemaType = {
	name: String
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
