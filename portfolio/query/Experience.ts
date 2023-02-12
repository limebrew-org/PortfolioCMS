import { InternshipModel, JobModel } from "../schema/experience"
import { ExperienceQueryType } from "../types/query"
import { ResponseBodyType } from "../types/response"
import { ExperienceType } from "../types/schema"
import { ExperienceField } from "../utils/handleFields"
import { ResponseStatusHandler } from "../utils/handleResponse"
import { ExperienceFieldType } from "../types/schema"

class ExperienceQuery {
	//TODO: Get all experience details(internship/job) by Query
	static async getMany(
		query: ExperienceQueryType,
		schema: "Internship" | "Job"
	): Promise<ResponseBodyType> {
		//? Declare the entity to be stored
		let experienceEntityList

		if (schema === ExperienceType.internship) {
			//? Grab all the internship entities by query
			experienceEntityList = await InternshipModel.find(query)
		}

		if (schema === ExperienceType.job) {
			//? Grab all the job entities by query
			experienceEntityList = await JobModel.find(query)
		}

		//? If no experience details are found
		if (experienceEntityList.length === 0)
			return ResponseStatusHandler.error_not_found(schema)

		//? If found, return the entity list
		return ResponseStatusHandler.success_get_many(
			schema,
			experienceEntityList
		)
	}

	//TODO: Get Single internship details by Query
	static async getOne(
		query: ExperienceQueryType,
		schema: "Internship" | "Job"
	): Promise<ResponseBodyType> {
		//? Declare the entity to be stored
		let experienceEntity

		if (schema === ExperienceType.internship) {
			//? Grab the internship entity by query
			experienceEntity = await InternshipModel.findOne(query)
		}

		if (schema === ExperienceType.job) {
			//? Grab the job entity by query
			experienceEntity = await JobModel.findOne(query)
		}

		//? If no experience details are found
		if (experienceEntity === null)
			return ResponseStatusHandler.error_not_found(schema)

		//? If found, return the experience entity
		return ResponseStatusHandler.success_get_one(schema, experienceEntity)
	}

	//TODO: Add  an internship entity
	static async addOne(
		experienceInfo: ExperienceFieldType,
		schema: "Internship" | "Job"
	): Promise<ResponseBodyType> {
		//? Declare the entity to be stored
		let newExperienceEntity

		if (schema === ExperienceType.internship) {
			//? Create a new internship entity
			newExperienceEntity = new InternshipModel(experienceInfo)
		}

		if (schema === ExperienceType.job) {
			//? Create a new internship entity
			newExperienceEntity = new JobModel(experienceInfo)
		}

		//? Save the internship entity
		return await ExperienceQuery.save(newExperienceEntity, schema, "ADD")
	}

	//TODO Update  internship details
	static async updateById(
		id: String,
		updatedExperienceInfo: ExperienceFieldType,
		schema: "Internship" | "Job"
	): Promise<ResponseBodyType> {
		//? Declare the entity to be stored
		const existingExperienceEntityResponse: ResponseBodyType =
			await ExperienceQuery.getOne(
				{
					_id: id,
					profile_id: updatedExperienceInfo.profile_id
				},
				schema
			)

		//? Check if experience entity exists
		if (existingExperienceEntityResponse.status === 404)
			return ResponseStatusHandler.error_not_found(schema)

		//? If found, grab the experience entity
		const experienceEntity = existingExperienceEntityResponse.data

		//? Then update the experience entity
		ExperienceField.setAndUpdate(experienceEntity, updatedExperienceInfo)

		//? Save the experience entity
		return await ExperienceQuery.save(experienceEntity, schema, "UPDATE")
	}

	//TODO Delete a single internship entity
	static async deleteById(
		id: String,
		profile_id: String,
		schema: "Internship" | "Job"
	): Promise<ResponseBodyType> {
		//? Grab experience entity by id and profile id
		const existingExperienceEntityResponse: ResponseBodyType =
			await ExperienceQuery.getOne(
				{ _id: id, profile_id: profile_id },
				schema
			)

		//? Check if experience entity exists for the given id and profile id
		if (existingExperienceEntityResponse.status === 404)
			return ResponseStatusHandler.error_not_found(schema)

		//? If found, grab the experience entity
		const experienceEntity = existingExperienceEntityResponse.data

		//? Delete the education entity
		return await experienceEntity
			.remove()
			.then((info) => {
				return ResponseStatusHandler.success_delete_one(schema)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
	}

	//TODO: Delete all internship entities for a given profile
	static async deleteMany(
		profile_id: String,
		schema: "Internship" | "Job"
	): Promise<ResponseBodyType> {
		if (schema === ExperienceType.internship) {
			//? Delete all internship entities for a profile
			return await InternshipModel.deleteMany({ profile_id: profile_id })
				.then((info) => {
					return ResponseStatusHandler.success_delete_many(
						schema,
						info.deletedCount
					)
				})
				.catch((error) => {
					return ResponseStatusHandler.error_known(error.message)
				})
		}

		if (schema === ExperienceType.job) {
			//? Delete all job entities for a profile
			return await JobModel.deleteMany({ profile_id: profile_id })
				.then((info) => {
					return ResponseStatusHandler.success_delete_many(
						schema,
						info.deletedCount
					)
				})
				.catch((error) => {
					return ResponseStatusHandler.error_known(error.message)
				})
		}
	}

	//TODO: Save the internship entity
	static async save(
		experienceEntity,
		schema: String,
		routeType: String
	): Promise<ResponseBodyType> {
		return await experienceEntity
			.save()
			.then((experienceInfo) => {
				if (routeType === "ADD")
					return ResponseStatusHandler.success_add(
						schema,
						experienceInfo
					)
				if (routeType === "UPDATE")
					return ResponseStatusHandler.success_update(
						schema,
						experienceInfo
					)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
	}
}

export { ExperienceQuery }
