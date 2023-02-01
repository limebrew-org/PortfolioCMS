//? Profile Schema request body Type
export type ProfileSchemaType = {
	username: String
	name: String
	email: String
	bio: String
	socials: SocialType
	password: String
}


//? Global Social Field Type
export type SocialType = {
	twitter: String
	linkedin: String
	github: String
}