import { ProfileModel } from "../schema/profile"
import { ProfileQueryType } from "../types/query"
import { ProfileSchemaType } from "../types/schema"
import { ResponseStatusHandler } from "../utils/handleResponse"
import { ResponseBodyType } from "../types/response"
import { ProfileField } from "../utils/handleFields"
import { ProfileMiddlewareType } from "../types/middleware"

class ProfileQuery {
	//TODO: Schema Name
	static schema: String = "Profile"

	//TODO: Mask Profile Entity
	static maskedProfileEntity(profileEntity: any) {
		const modifiedProfileEntity: ProfileMiddlewareType = {
			_id: profileEntity._id,
			username: profileEntity.username,
			name: profileEntity.name,
			email: profileEntity.email,
			bio: profileEntity.bio,
			socials: profileEntity.socials
		}
		return modifiedProfileEntity
	}

	//TODO: Mask Profile Entity List
	static maskedProfileEntityList = (profileEntityList: any) => {
		//? Handle empty list
		if (profileEntityList.length === 0) return []

		let modifiedEntityList: any = []
		for (let i = 0; i < profileEntityList.length; i++) {
			const modifiedProfileEntity: ProfileMiddlewareType = {
				_id: profileEntityList[i]._id,
				username: profileEntityList[i].username,
				name: profileEntityList[i].name,
				email: profileEntityList[i].email,
				bio: profileEntityList[i].bio,
				socials: profileEntityList[i].socials
			}
			modifiedEntityList.push(modifiedProfileEntity)
		}
		return modifiedEntityList
	}

	//TODO: Get Multiple profiles based on query
	static async getMany(
		query: ProfileQueryType,
		mask?: Boolean
	): Promise<ResponseBodyType> {
		//? Grab all the profiles by query
		const profileEntityList = await ProfileModel.find(query)

		//? If no profiles were found
		if (profileEntityList.length === 0)
			return ResponseStatusHandler.error_not_found(ProfileQuery.schema)

		//? If mask is true
		if (mask) {
			//? Mask profile Entity list
			const maskedProfileEntityList =
				ProfileQuery.maskedProfileEntityList(profileEntityList)

			//? return response
			return ResponseStatusHandler.success_get_many(
				ProfileQuery.schema,
				maskedProfileEntityList
			)
		}

		//? return response
		return ResponseStatusHandler.success_get_many(
			ProfileQuery.schema,
			profileEntityList
		)
	}

	//TODO: Get single profile based on query
	static async getOne(
		query: ProfileQueryType,
		mask?: Boolean
	): Promise<ResponseBodyType> {
		//? Grab a single profile by query
		const profileEntity = await ProfileModel.findOne(query)

		//? If profile was not found
		if (profileEntity === null)
			return ResponseStatusHandler.error_not_found(ProfileQuery.schema)

		//? If mask is true
		if (mask) {
			//? Mask profile Entity
			const maskedProfileEntity =
				ProfileQuery.maskedProfileEntity(profileEntity)

			//? return response
			return ResponseStatusHandler.success_get_one(
				ProfileQuery.schema,
				maskedProfileEntity
			)
		}

		//? return response
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
