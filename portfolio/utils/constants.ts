import dotenv from "dotenv"
import { handleEnv } from "./handleEnv"

//? Load Environment variables
dotenv.config(handleEnv())

//? Portfolio-CMS Auth Server PORT
export const PORTFOLIO_AUTH_PORT = process.env.PORTFOLIO_AUTH_PORT

//? Portfolio-CMS Api Server PORT
export const PORTFOLIO_API_PORT = process.env.PORTFOLIO_API_PORT

//? Database Connection URL
export const PORTFOLIO_DB_CONNECTION_URL =
	process.env.PORTFOLIO_DB_CONNECTION_URL

//? Portfolio Database Name
export const PORTFOLIO_DB_NAME = "portfolio_db"

//? Acess Token Secret
export const PORTFOLIO_ACCESS_TOKEN_SECRET =
	process.env.PORTFOLIO_ACCESS_TOKEN_SECRET

//? Refresh Token Secret
export const PORTFOLIO_REFRESH_TOKEN_SECRET =
	process.env.PORTFOLIO_REFRESH_TOKEN_SECRET

//? Access Token Expiration Time
export const PORTFOLIO_ACCESS_TOKEN_EXPIRATION_TIME = "45m"

//? Regresh Token Expiration Time
export const PORTFOLIO_REFRESH_TOKEN_EXPIRATION_TIME = ""

//? API key Header
export const PORTFOLIO_API_KEY_HEADER: string = "X-PORTFOLIO-KEY"

//? Access Token Header
export const PORTFOLIO_ACCESS_TOKEN_HEADER: string = "authorization"

//? Schema Fields (editable fields)
export const PORTFOLIO_PROFILE_FIELDS: Array<string> = [
	"name",
	"bio",
	"socials"
]
export const PORTFOLIO_PROFILE_REGISTER_FIELDS: Array<string> = [
	"email",
	"username",
	"password"
]
export const PORTFOLIO_SOCIALS_FIELDS: Array<string> = [
	"twitter",
	"linkedin",
	"github"
]
export const PORTFOLIO_EDUCATION_FIELDS: Array<string> = [
	"qualification",
	"institution",
	"grade",
	"tenure"
]
export const PORTFOLIO_SKILL_FIELDS: Array<String> = [
	"backend",
	"frontend",
	"database",
	"cloud",
	"fundamentals"
]


export const PORTFOLIO_EXPERIENCE_FIELDS: Array<String> = [
	"company",
	"role",
	"technologies",
	"summary",
	"tenure"
]

export const PORTFOLIO_PROJECT_FIELDS: Array<String> = [
	"name",
	"description",
	"technologies",
	"link"
]

export const TOKEN_TYPE = {
	refreshToken: "refresh_token",
	accessToken: "access_token"
}

export const AUTHENTICATION_METHOD = {
	JWT: "jwt",
	API_KEY: "api_key"
}
