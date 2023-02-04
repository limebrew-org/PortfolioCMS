import { SkillsModel } from "../schema/skills"
import { ExperienceQueryType, SkillQueryType } from "../types/query"
import { ResponseBodyType } from "../types/response"
import { SkillField } from "../utils/handleFields"
import { ResponseStatusHandler } from "../utils/handleResponse"
import { SkillSchemaType } from "../utils/types"

class SkillQuery {
	//TODO: Schema Name
	static schema: String = "Skills"

	//TODO: Get Single skill details by Query
	static async getOne(query: SkillQueryType): Promise<ResponseBodyType> {
		//? Grab the single skill entity by query
		const skillEntity = await SkillsModel.findOne(query)

		//? If skill entity is not found
		if (skillEntity == null)
			return ResponseStatusHandler.error_not_found(SkillQuery.schema)

		//? If found, return the skill entity
		return ResponseStatusHandler.success_get_one(
			SkillQuery.schema,
			skillEntity
		)
	}

	//TODO: Add a skill entity for a profile
	static async addOne(skillInfo: SkillSchemaType): Promise<ResponseBodyType> {
		//? Create a new project entity
		const newSkillEntity = new SkillsModel(skillInfo)

		//? Save the project entity
		return await SkillQuery.save(newSkillEntity, "ADD")
	}

	//TODO Update skill details by Id for a profile
	static async updateById(
		id: String,
		updatedSkillInfo: SkillSchemaType
	): Promise<ResponseBodyType> {
		//? Check if the skill entity exists for the given id and profile id
		const existingSkillResponse: ResponseBodyType = await SkillQuery.getOne(
			{
				_id: id,
				profile_id: updatedSkillInfo.profile_id
			}
		)

		//? Check if skill entity not found
		if (existingSkillResponse.status === 404)
			return ResponseStatusHandler.error_not_found(SkillQuery.schema)

		//? If found, grab the skill entity
		const skillEntity = existingSkillResponse.data

		//? Then update the skill entity
		SkillField.setAndUpdate(skillEntity, updatedSkillInfo)

		//? Save the skill entity
		return await SkillQuery.save(skillEntity, "UPDATE")
	}

	//TODO Delete a single skill entity by Id for a profile
	static async deleteById(
		id: String,
		profile_id: String
	): Promise<ResponseBodyType> {
		//? Grab the skill entity by id and profile id
		const existingSkillResponse: ResponseBodyType = await SkillQuery.getOne(
			{
				_id: id,
				profile_id: profile_id
			}
		)

		//? Check if skill entity exists for the given id and profile id
		if (existingSkillResponse.status === 404)
			return ResponseStatusHandler.error_not_found(SkillQuery.schema)

		//? If found, grab the skill entity
		const skillEntity = existingSkillResponse.data

		//? Delete the project entity
		return await skillEntity
			.remove()
			.then((info) => {
				return ResponseStatusHandler.success_delete_one(
					SkillQuery.schema
				)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
	}

	//TODO: Save skill entity in the database
	static async save(
		skillEntity,
		routeType: String
	): Promise<ResponseBodyType> {
		return await skillEntity
			.save()
			.then((skillInfo) => {
				if (routeType === "ADD")
					return ResponseStatusHandler.success_add(
						SkillQuery.schema,
						skillInfo
					)
				if (routeType === "UPDATE")
					return ResponseStatusHandler.success_update(
						SkillQuery.schema,
						skillInfo
					)
			})
			.catch((error) => {
				return ResponseStatusHandler.error_known(error.message)
			})
	}
}

export { SkillQuery }
