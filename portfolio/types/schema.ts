//? Profile Schema request body Type
export type ProfileSchemaType = {
	username: String
	name: String
	email: String
	bio: String
	socials: SocialType
	password: String
}

//? Education Request Body Type
export type EducationSchemaType = {
	profile_id: String
	qualification: String
	institution: String
	grade: String
	tenure: String
}

//? Projects Request Body Type
export type ProjectSchemaType = {
	profile_id: String
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

// //? Global Social Field Type
export type SocialType = {
	twitter: String
	linkedin: String
	github: String
}

//? Experience Type
export enum ExperienceType {
	job = "Job",
	internship = "Internship"
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

//? Experience Field Schema Type
export interface InternshipSchemaType extends ExperienceFieldType {}
export interface JobSchemaType extends ExperienceFieldType {}