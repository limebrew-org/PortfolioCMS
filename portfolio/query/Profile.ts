import { ProfileModel } from "../schema/profile"
import { ProfileQueryType } from "../types/query"
import { ProfileSchemaType } from "../utils/types"
import { ResponseStatusHandler } from "../utils/handleResponse"
import { ResponseBodyType } from "../utils/types"
import { ProfileField } from "../utils/handleFields"

class ProfileQuery {
	//TODO: Schema Name
	static schema: String = "Profile"

	//TODO: Get Multiple profiles based on query
	static async getMany(query: ProfileQueryType): Promise<ResponseBodyType> {
		//? Grab all the profiles by query
		const profileEntityList = await ProfileModel.find(query)

		//? If no profiles were found
		if (profileEntityList.length === 0)
			return ResponseStatusHandler.error_not_found(ProfileQuery.schema)

		return ResponseStatusHandler.success_get_many(
			ProfileQuery.schema,
			profileEntityList
		)
	}

	//TODO: Get single profile based on query
	static async getOne(query: ProfileQueryType): Promise<ResponseBodyType> {
		//? Grab a single profile by query
		const profileEntity = await ProfileModel.findOne(query)

		//? If profile was not found
		if (profileEntity === null)
			return ResponseStatusHandler.error_not_found(ProfileQuery.schema)

		return ResponseStatusHandler.success_get_one(
			ProfileQuery.schema,
			profileEntity
		)
	}

	//TODO: Add profile
	static async addOne(
		profileInfo: ProfileSchemaType
	): Promise<ResponseBodyType> {
		//? Check if profile exists for email
		const existingProfileResponse = await ProfileQuery.getOne({
			email: profileInfo.email
		})

		//? If profile exists
		if (existingProfileResponse.status === 200)
			return ResponseStatusHandler.error_exists(ProfileQuery.schema)

		//? Else create a new profile
		const newProfileEntity = new ProfileModel(profileInfo)

		//? Save the new profile in the database
		return await ProfileQuery.save(newProfileEntity, "ADD")
	}

	//TODO: Update profile by Id and Email
	static async updateById(
		id: String,
		updatedProfile: ProfileSchemaType
	): Promise<ResponseBodyType> {
		//? Check if the profile exists for the given id and email
		const existingProfileResponse: ResponseBodyType =
			await ProfileQuery.getOne({ _id: id })

		//? Check profile response
		if (existingProfileResponse.status === 404)
			return ResponseStatusHandler.error_not_found(ProfileQuery.schema)

		//? Grab the profile from the response
		const profileEntity = existingProfileResponse.data

		//? If exists, then update
		ProfileField.setAndUpdate(profileEntity, updatedProfile)

		//? Save the profile
		return await ProfileQuery.save(profileEntity, "UPDATE")
	}

	//TODO: Delete profile by Id
	static async deleteOneById(
		id: String,
		email: String
	): Promise<ResponseBodyType> {
		//? Grab Profile by Id and email
		const existingProfileResponse: ResponseBodyType =
			await ProfileQuery.getOne({ _id: id, email: email })

		//? Check if Profile exists
		if (existingProfileResponse.status === 404)
			return ResponseStatusHandler.error_not_found(ProfileQuery.schema)

		//? Grab the Profile from the response
		const profileEntity = existingProfileResponse.data

		//? Remove Profile if it exists
		const response = profileEntity
			.remove()
			.then((info) => {
				return ResponseStatusHandler.success_delete_one(
					ProfileQuery.schema
				)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
		return response
	}

	//TODO: Save the profile entity
	static async save(
		profileEntity,
		routeType: String
	): Promise<ResponseBodyType> {
		return await profileEntity
			.save()
			.then((profileInfo) => {
				if (routeType === "ADD")
					return ResponseStatusHandler.success_add(
						ProfileQuery.schema
					)
				if (routeType === "UPDATE")
					return ResponseStatusHandler.success_update(
						ProfileQuery.schema
					)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
	}
}

export { ProfileQuery }
