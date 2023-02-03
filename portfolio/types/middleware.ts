//? Profile request Type (Middleware)
export type ProfileMiddlewareType = {
	_id: String
	username: String
	name: String
	email: String
	bio: String
	socials: SocialType
}

//? Global Social Field Type
export type SocialType = {
	twitter: String
	linkedin: String
	github: String
}