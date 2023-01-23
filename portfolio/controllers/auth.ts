import { AuthQuery } from "../query/authQuery"
import { Request, Response } from "express"

//? Register profile (public endpoint)
const register = async (request: Request, response: Response) => {
	await AuthQuery.register(request, response)
}

//? Login profile (public endpoint)
const login = async (request: Request, response: Response) => {
	await AuthQuery.login(request, response)
}

//? Logout profile (authentication required)
const logout = async (request: Request, response: Response) => {
	await AuthQuery.logout(request, response)
}

//? Regenerate access token (authentication required)
const regenerateToken = async (request: Request, response: Response) => {
	await AuthQuery.regenerateToken(request, response)
}

export { register, login, logout, regenerateToken }
