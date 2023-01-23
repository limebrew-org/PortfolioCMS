import { ProfileQuery } from "../query/profileQuery"
import { Request, Response } from "express"

//? GET profile based on query (public endpoint)
const getProfile = async (request: Request, response: Response) => {
	await ProfileQuery.get(request, response)
}

//? GET profile by name/username

//? Update profile (authentication required)
const updateProfile = async (request: Request, response: Response) => {
	await ProfileQuery.update(request, response)
}

//? Delete profile (authentication required)
const deleteProfile = async (request: Request, response: Response) => {}

export { getProfile, updateProfile, deleteProfile }
