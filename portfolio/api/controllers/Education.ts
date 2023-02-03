import { Request, Response } from "express"
import { EducationQuery } from "../../query/Education"
import { EducationQuerytype } from "../../types/query"
import { ResponseBodyType } from "../../types/response"
import { PORTFOLIO_EDUCATION_FIELDS } from "../../utils/constants"
import { RequestBodyHandler } from "../../utils/handleFields"
import { ResponseBody } from "../../utils/handleResponse"
import { EducationSchemaType, ProfileMiddlewareType } from "../../utils/types"
import mongoose from "mongoose"

class EducationController {
    //? Handling Object Id
    static ObjectId = mongoose.Types.ObjectId
    
	//? Validate Schema
	static isValidSchema(requestBody: EducationSchemaType, router: String) {
		//? Get keys of requestBody
		const reqBodyKeys = Object.keys(requestBody)

		//? if no properties exist
		if (reqBodyKeys.length === 0) return false

		//* Handle for Add Education
		if (router === "ADD") {
			//? Handle mandatory fields
			for (let i = 0; i < PORTFOLIO_EDUCATION_FIELDS.length; i++) {
				const field = PORTFOLIO_EDUCATION_FIELDS[i]
				if (!requestBody.hasOwnProperty(field)) return false
				if (
					typeof requestBody[field] !== "string" ||
					requestBody[field]?.length === 0
				)
					return false
			}
			return true
		}

		//* Handle for Update Education
		if (router === "UPDATE") {
			//? Handle optional fields
			for (let i = 0; i < reqBodyKeys.length; i++) {
				const educationKey = reqBodyKeys[i]
				console.log("Education key: ", educationKey)
				console.log(
					"Key validation status: ",
					PORTFOLIO_EDUCATION_FIELDS.includes(educationKey)
				)

				if (!PORTFOLIO_EDUCATION_FIELDS.includes(educationKey))
					return false
				else if (
					typeof requestBody[educationKey] !== "string" ||
					requestBody[educationKey]?.length === 0
				)
					return false
			}
			return true
		}
		return false
	}
    
    async getAll(request:Request,response:Response){
        const query: EducationQuerytype = request.query
        
        //? Handlle Bad Request
        if(
            !RequestBodyHandler.isValidKeys(query, ["profile_id"]) ||
            !EducationController.ObjectId.isValid(query.profile_id.toString())
        )
            return ResponseBody.handleBadRequest(response)

        //? Get the profile id from query
        const profileId: String = query.profile_id.toString()

        //? Query education details by profile id
        const educationEntityResponse: ResponseBodyType = await EducationQuery.getMany({profile_id: profileId})

        //? Check if education entity list exists
        if(educationEntityResponse.status === 200)
            return ResponseBody.success_found(response, educationEntityResponse)
        
        //? Else, return error not found
        return ResponseBody.error_not_found(response,educationEntityResponse)

    }

    async getById(request:Request,response:Response){
        const query: EducationQuerytype = request.params

        //? Handle Bad Request
        if(
            !RequestBodyHandler.isValidKeys(query, ["id"]) ||
            !EducationController.ObjectId.isValid(query["id"].toString())
        )

            return ResponseBody.handleBadRequest(response)
        
        //? Get the education by id 
        const educationId: String = query["id"].toString()

        //? Query the education details by id
        const educationEntityResponse: ResponseBodyType = await EducationQuery.getOne({ _id: educationId })

        //? Check if education entity exists
        if(educationEntityResponse.status === 200)
            return ResponseBody.success_found(response, educationEntityResponse)
        
        //? Else, return error not found
        return ResponseBody.error_not_found(response,educationEntityResponse)
    }

    async add(request:Request,response:Response){
        const inputEducationDetails: EducationSchemaType = request.body

        //? Grab the profile from the middleware
        const profile: ProfileMiddlewareType = request["profile"]

        //? Handle Bad Request
        if(!EducationController.isValidSchema(inputEducationDetails, "ADD"))
            return ResponseBody.handleBadRequest(response)

        //? Set the profile id from the middleware
        inputEducationDetails.profile_id = profile._id.toString()

        //? Add education details into the database
        const educationAddResponse: ResponseBodyType = await EducationQuery.addOne(inputEducationDetails)

        //? Check education response
        if(educationAddResponse.status === 201)
            return ResponseBody.success_add(response, educationAddResponse)

        //? Else, return error
        return ResponseBody.error_internal(response, educationAddResponse)
    }

    async updateById(request:Request,response:Response){
        const query: EducationQuerytype = request.params

        //? Grab the request body
		const inputEducationDetails: EducationSchemaType = request.body

        //? Grab the profile from the middleware
		const profile: ProfileMiddlewareType = request["profile"]

        //? Handle bad request
		if (
            !EducationController.isValidSchema(inputEducationDetails, "UPDATE") ||
            !EducationController.ObjectId.isValid(query["id"].toString())
        )
			return ResponseBody.handleBadRequest(response)

        const educationId: string = query["id"].toString()
        
        inputEducationDetails.profile_id = profile._id.toString()

        //? Update education details
        const educationUpdateResponse: ResponseBodyType = await EducationQuery.updateById(educationId,inputEducationDetails)
        console.log("Education update response: ", educationUpdateResponse)

        //? If the update was successful
        if(educationUpdateResponse.status === 201)
            return ResponseBody.success_update(response, educationUpdateResponse)

        //? Else, return error
        return ResponseBody.error_internal(response, educationUpdateResponse)
    }

    async deleteById(request:Request,response:Response){
        const query: EducationQuerytype = request.params

        //? Handle bad request
        if(!EducationController.ObjectId.isValid(query["id"].toString()))
            return ResponseBody.handleBadRequest(response)
        
        //? Grab the profile from middleware
        const profile: ProfileMiddlewareType = request["profile"]

        //? Delete the education entity
        const deleteEducationResponse: ResponseBodyType = await EducationQuery.deleteById(query["id"].toString(), profile._id)

        //? If the delete was successful
        if(deleteEducationResponse.status === 204)
            return ResponseBody.success_delete(response, deleteEducationResponse)

        //? Else, return error
        return ResponseBody.error_internal(response, deleteEducationResponse)
    }   

    async deleteAll(request:Request,response:Response){
        //? Grab the profile from middleware
        const profile: ProfileMiddlewareType = request["profile"]

        //? Delete all education details
        const deleteAllEducationResponse: ResponseBodyType = await EducationQuery.deleteMany(profile._id)

        //? If the delete was successful
        if(deleteAllEducationResponse.status === 204)
            return ResponseBody.success_delete(response, deleteAllEducationResponse)
        
        //? Else, return error
        return ResponseBody.error_internal(response, deleteAllEducationResponse)
    }
}

export { EducationController }