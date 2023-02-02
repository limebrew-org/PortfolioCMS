import { EducationQuerytype } from "../types/query"
import { ResponseBodyType } from "../types/response"
import { EducationSchemaType } from "../utils/types"
import { EducationModel } from "../schema/education"
import { ResponseStatusHandler } from "../utils/handleResponse"
import { EducationField } from "../utils/handleFields"

class EducationQuery {
	//TODO: Schema Name
	static schema: String = "Education"

	//TODO: Get All education details by Query
	static async getMany(query: EducationQuerytype): Promise<ResponseBodyType> {
		//? Grab all the education entities by query
		const educationEntityList = await EducationModel.find(query)

		//? If no education entities are found
		if (educationEntityList.length === 0)
			return ResponseStatusHandler.error_not_found(EducationQuery.schema)

		//? If found, return the entity list
		return ResponseStatusHandler.success_get_many(
			EducationQuery.schema,
			educationEntityList
		)
	}

	//TODO: Get Single education entity by Query
	static async getOne(query: EducationQuerytype) {
		//? Grab the single education entity by query
		const educationEntity = await EducationModel.findOne(query)

		//? If education entity is not found
		if (educationEntity === null)
			return ResponseStatusHandler.error_not_found(EducationQuery.schema)

		//? If found, return the education entity
		return ResponseStatusHandler.success_get_one(
			EducationQuery.schema,
			educationEntity
		)
	}

	//TODO: Add education details
	static async addOne(
		educationInfo: EducationSchemaType
	): Promise<ResponseBodyType> {
		//? Create the education entity
		const newEducationEntity = new EducationModel(educationInfo)

		//? Save the education entity
		return await EducationQuery.save(newEducationEntity, "ADD")
	}

	//TODO: Update Education details By Id
	static async updateById(
		id: String,
		updatedEducationInfo: EducationSchemaType
	): Promise<ResponseBodyType> {
		//? Check if the education entity exists for the given id and profile id
		const existingEducationResponse: ResponseBodyType =
			await EducationQuery.getOne({
				_id: id,
				profile_id: updatedEducationInfo.profile_id
			})
		console.log("Education get by id response: " ,existingEducationResponse)
		//? Check if education entity not found
		if (existingEducationResponse.status === 404)
			return ResponseStatusHandler.error_not_found(EducationQuery.schema)

		//? If found, grab the education entity
		const educationEntity = existingEducationResponse.data

		//? Then update the education entity
		EducationField.setAndUpdate(educationEntity, updatedEducationInfo)

		//? Save the education entity
		return await EducationQuery.save(educationEntity, "UPDATE")
	}

	//TODO: Delete a single education entity
	static async deleteById(
		id: String,
		profile_id: String
	): Promise<ResponseBodyType> {
		//? Grab education entity by id and profile id
		const existingEducationResponse: ResponseBodyType =
			await EducationQuery.getOne({ _id: id, profile_id: profile_id })

		//? Check if education entity exists for the given id and profile id
		if (existingEducationResponse.status === 404)
			return ResponseStatusHandler.error_not_found(EducationQuery.schema)

		//? If found, grab the education entity
		const educationEntity = existingEducationResponse.data

		//? Delete the education entity
		const response = await educationEntity
			.remove()
			.then((info) => {
				return ResponseStatusHandler.success_delete_one(
					EducationQuery.schema
				)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
		return response
	}

	//TODO: Delete Multiple education entities
	static async deleteMany(profile_id: String): Promise<ResponseBodyType> {
        
        //? Delete all education entities for a profile
        const deleteManyResponse = EducationModel.deleteMany({ profile_id: profile_id })
        .then((info) => {
            return ResponseStatusHandler.success_delete_many(
                EducationQuery.schema,
                info.deletedCount
            )
        })
        .catch((error) => {
            return ResponseStatusHandler.error_known(error.message)
        })
    return deleteManyResponse
        
    }

	//TODO: Save the education entity
	static async save(
		educationEntity,
		routeType: String
	): Promise<ResponseBodyType> {
		return await educationEntity
			.save()
			.then((educationInfo) => {
				if (routeType === "ADD")
					return ResponseStatusHandler.success_add(
						EducationQuery.schema,
						educationInfo
					)
				if (routeType === "UPDATE")
					return ResponseStatusHandler.success_update(
						EducationQuery.schema,
						educationInfo
					)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
	}
}

export { EducationQuery }
