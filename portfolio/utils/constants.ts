import dotenv from "dotenv"
import { handleEnv } from "./handleEnv"

//? Load Environment variables
dotenv.config(handleEnv())

//? Portfolio-CMS Auth Server PORT
export const PORTFOLIO_AUTH_PORT = process.env.PORTFOLIO_AUTH_PORT

//? Portfolio-CMS Api Server PORT
export const PORTFOLIO_API_PORT = process.env.PORTFOLIO_API_PORT

//? Portfolio-CMS Admin Server PORT
export const PORTFOLIO_ADMIN_PORT = process.env.PORTFOLIO_ADMIN_PORT

//? Set Dashboard Expiration Time
export const PORTFOLIO_DASHBOARD_CACHE_EXPIRATION_TIME =
	process.env.PORTFOLIO_DASHBOARD_CACHE_EXPIRATION_TIME

//? Database Connection URL
export const PORTFOLIO_DB_CONNECTION_URL =
	process.env.PORTFOLIO_DB_CONNECTION_URL

//? Get Redis Connection String
export const PORTFOLIO_REDIS_CONNECTION_URL =
	process.env.PORTFOLIO_REDIS_CONNECTION_URL

//? Database Entity configuration
export enum PortfolioDBEntity {
	DB_NAME = "portfolio_db",
	MAX_POOL_SIZE = 100,
	PROFILES = "profiles",
	PROJECTS = "projects",
	SKILLS = "skills",
	INTERNSHIPS = "internships",
	JOBS = "jobs",
	EDUCATION = "education",
	TOKENS = "tokens",
	API_KEYS = "keys"
}

//? Acess Token Secret
export const PORTFOLIO_ACCESS_TOKEN_SECRET =
	process.env.PORTFOLIO_ACCESS_TOKEN_SECRET

//? Refresh Token Secret
export const PORTFOLIO_REFRESH_TOKEN_SECRET =
	process.env.PORTFOLIO_REFRESH_TOKEN_SECRET

//? MiddleWare configuration
export enum MiddlewareConfiguration {
	ACCESS_TOKEN_EXPIRATION_TIME = "45m",
	REFRESH_TOKEN_EXPIRATION_TIME = "2d",
	API_KEY_HEADER = "x-portfolio-key",
	ACCESS_TOKEN_HEADER = "authorization"
}


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

export const TOKEN = {
	refreshToken: "refresh_token",
	accessToken: "access_token"
}

export const AUTHENTICATION_METHOD = {
	JWT: "jwt",
	API_KEY: "api_key"
}
