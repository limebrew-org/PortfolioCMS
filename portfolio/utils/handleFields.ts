import {
	PORTFOLIO_PROFILE_FIELDS,
	PORTFOLIO_SKILL_FIELDS,
	PORTFOLIO_EDUCATION_FIELDS,
	PORTFOLIO_EXPERIENCE_FIELDS,
	PORTFOLIO_PROJECT_FIELDS
} from "./constants"
import mongoose from "mongoose"
import {
	EducationSchemaType,
	EducationUpdateType,
	ExperienceUpdateType,
	ProfileSchemaType,
	ProjectUpdateType,
	SkillUpdateType
} from "./types"

class RequestBodyHandler {
	cache: Array<String>
	status: Boolean
	schema: Object
	constructor() {
		this.cache = []
		this.schema = {}
	}

	//? Handle Object keys with Array<Object>
	static isValidObject(field: Object, keys: Array<Object>) {}

	//? Handle Object Keys with string types
	static isValidKeys(field: Object, keys: Array<string>) {
		for (let i = 0; i < keys.length; i++) {
			const fieldName = keys[i]
			if (
				!field.hasOwnProperty(fieldName) ||
				typeof field[fieldName] !== "string" ||
				field[fieldName] === undefined ||
				field[fieldName]?.length === 0
			)
				return false
		}
		return true
	}

	//TODO: Handle Mandatory Fields
	static isValidMandatoryFields(
		field: Object,
		mandatoryFieldList: Array<string>
	) {
		for (let i = 0; i < mandatoryFieldList.length; i++) {
			const mandatoryFieldName: string = mandatoryFieldList[i]
			if (
				!field.hasOwnProperty(mandatoryFieldName) ||
				typeof field[mandatoryFieldName] !== "string" ||
				field[mandatoryFieldName] === undefined ||
				field[mandatoryFieldName]?.length === 0
			)
				return false
		}
		return true
	}

	//TODO: Handle Optional Fields
	static isValidOptionalFields(
		field: Object,
		optionalFieldList: Array<string>
	) {
		const inputfieldList: Array<string> = Object.keys(field)

		//? Else loop over the keys and check if the key is found in the optional key list
		for (let i = 0; i < inputfieldList.length; i++) {
			const inputFieldName: string = inputfieldList[i]

			//? Check the validity of the input fields
			if (
				!optionalFieldList.includes(inputFieldName) ||
				typeof field[inputFieldName] !== "string" ||
				field[inputFieldName] === undefined ||
				field[inputFieldName]?.length === 0
			)
				return false
		}
		return true
	}

	//? Handle empty fields
	static isEmptyFields(fields: any) {
		if (fields.length === 0) return true
		return false
	}

	//? Check type
	static isValidDataType(schema: any) {
		if (typeof schema === "object") return true
		return false
	}

	static modifyRequestBody(
		reqBody: Object,
		mandatory_keys: Array<string>,
		fieldName: string
	) {
		if (reqBody === null) return

		//? Deep Copy
		let modifiedReqBody = JSON.parse(JSON.stringify(reqBody))

		if (modifiedReqBody?.[fieldName] === undefined) {
			modifiedReqBody[fieldName] = {}
			mandatory_keys.forEach((key) => {
				modifiedReqBody[fieldName][key] = ""
			})
			return modifiedReqBody
		}

		mandatory_keys.forEach((key) => {
			//? set the value to ''
			if (modifiedReqBody[fieldName][key] === undefined)
				modifiedReqBody[fieldName][key] = ""
		})

		return modifiedReqBody
	}

	static isValidFieldCustom(reqBody: Object, fieldList: Array<String>) {
		let status: Boolean = false

		//? Check if reqBody was passed
		if (reqBody === undefined || typeof reqBody !== "object") return status

		//? Create list of fields as keys from reqBody
		const reqFields = Object.keys(reqBody)

		//? Check if Field is empty
		if (reqFields?.length === 0) return status

		//? Loop over keys of request body
		for (let i = 0; i < reqFields.length; i++) {
			//? Check if reqBody key exists in field list
			if (!fieldList.includes(reqFields[i])) return false
			status = true
		}
		return status
	}

	static getSchema(schemaType: String) {
		if (schemaType === "profile") return PORTFOLIO_PROFILE_FIELDS
		if (schemaType === "skill") return PORTFOLIO_SKILL_FIELDS
		if (schemaType === "education") return PORTFOLIO_EDUCATION_FIELDS
		if (schemaType === "experience") return PORTFOLIO_EXPERIENCE_FIELDS
		if (schemaType === "project") return PORTFOLIO_PROJECT_FIELDS
	}

	static isValidFields(reqBody: Object, schemaType: string) {
		let status = false
		const schemaFields = RequestBodyHandler.getSchema(schemaType)
		const reqFields = Object.keys(reqBody)

		if (reqFields?.length === 0 || reqFields === undefined) return status

		for (let idx = 0; idx < schemaFields.length; idx++) {
			const field = schemaFields[idx]
			if (!reqFields.includes(`${field}`)) return false
			status = true
		}
		return status
	}
}

abstract class ValidateSchema {
	abstract isValidSchema(): Boolean
}

class ProfileField {
	static setAndUpdate(
		profileEntity: ProfileSchemaType,
		updatedFields: ProfileSchemaType
	) {
		if ("name" in updatedFields) {
			profileEntity.name = updatedFields.name
		}
		if ("bio" in updatedFields) {
			profileEntity.bio = updatedFields.bio
		}
		if ("socials" in updatedFields) {
			if ("twitter" in updatedFields.socials) {
				profileEntity.socials.twitter = updatedFields.socials.twitter
			}
			if ("linkedin" in updatedFields.socials) {
				profileEntity.socials.linkedin = updatedFields.socials.linkedin
			}
			if ("github" in updatedFields.socials) {
				profileEntity.socials.github = updatedFields.socials.github
			}
		}
	}
}

class EducationField {
	static setAndUpdate(
		educationEntity: Document,
		updatedEducationInfo: EducationSchemaType
	) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(updatedEducationInfo)

		//? Set the field if key exists
		for (let i = 0; i < reqBodyKeys.length; i++) {
			const key = reqBodyKeys[i]
			if (PORTFOLIO_EDUCATION_FIELDS.includes(key))
				educationEntity[key] = updatedEducationInfo[key]
		}
	}
}

class ProjectField {
	static setAndUpdate(
		projectEntity: Document,
		updatedProjectInfo: ProjectUpdateType
	) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(updatedProjectInfo)

		//? Set the field if exists
		for (let i = 0; i < reqBodyKeys.length; i++) {
			const projectKey = reqBodyKeys[i]
			if (PORTFOLIO_PROJECT_FIELDS.includes(projectKey))
				projectEntity[projectKey] = updatedProjectInfo[projectKey]
		}
	}
}
class ExperienceField {
	static setAndUpdate(
		experienceEntity: Document,
		updatedExperienceInfo: ExperienceUpdateType
	) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(updatedExperienceInfo)

		//? Set the field if exists
		for (let i = 0; i < reqBodyKeys.length; i++) {
			const experienceKey = reqBodyKeys[i]
			if (PORTFOLIO_EXPERIENCE_FIELDS.includes(experienceKey))
				experienceEntity[experienceKey] =
					updatedExperienceInfo[experienceKey]
		}
	}
}

class SkillField {
	static setAndUpdate(
		skillEntity: Object,
		updatedSkillInfo: SkillUpdateType
	) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(updatedSkillInfo)

		//? set the field if it exists
		for (let i = 0; i < reqBodyKeys.length; i++) {
			const skillField = reqBodyKeys[i]
			if (PORTFOLIO_SKILL_FIELDS.includes(skillField)) {
				skillEntity[skillField] = updatedSkillInfo[skillField]
			}
		}
	}
}

export {
	RequestBodyHandler,
	ValidateSchema,
	ProfileField,
	EducationField,
	ProjectField,
	SkillField,
	ExperienceField
}
