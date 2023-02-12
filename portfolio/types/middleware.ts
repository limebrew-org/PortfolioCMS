import { SocialType } from "./schema"

//? Profile request Type (Middleware)
export type ProfileMiddlewareType = {
	_id: String
	username: String
	name: String
	email: String
	bio: String
	socials: SocialType
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