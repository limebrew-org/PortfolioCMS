import { ProjectModel } from "../schema/projects";
import { ProjectQueryType } from "../types/query";
import { ResponseBodyType } from "../types/response";
import { ProjectField } from "../utils/handleFields";
import { ResponseStatusHandler } from "../utils/handleResponse";
import { ProjectSchemaType } from "../utils/types";

class ProjectQuery {
    //TODO: Schema Name
    static schema: String = "Project"
    
    //TODO: Get All Project entities based on Query
    static async getMany(query:ProjectQueryType): Promise<ResponseBodyType> {
        //? Grab all the project entities by query
        const projectEntityList = await ProjectModel.find(query)

        //? If no project entities found
        if(projectEntityList.length == 0)
            return ResponseStatusHandler.error_not_found(ProjectQuery.schema)
        
        //? If found, return the entity list
        return ResponseStatusHandler.success_get_many(
            ProjectQuery.schema,
            projectEntityList
        )
    }

    //TODO: Get a single Project entity based on Query
    static async getOne(query:ProjectQueryType): Promise<ResponseBodyType>{
        //? Grab the single project entity by query
        const projectEntity = await ProjectModel.findOne(query)

        //? If project entity is not found
        if(projectEntity == null)
            return ResponseStatusHandler.error_not_found(ProjectQuery.schema)
        
        //? If found, return the project entity
        return ResponseStatusHandler.success_get_one(
            ProjectQuery.schema,
            projectEntity
        )
    }

    //TODO: Add a single Project for a profile
    static async addOne(projectInfo:ProjectSchemaType): Promise<ResponseBodyType>{
        //? Create a new project entity
        const newProjectEntity = new ProjectModel(projectInfo)

        //? Save the project entity
        return await ProjectQuery.save(newProjectEntity, "ADD")
    }

    //TODO: Update a single Project entity by Id
    static async updateById(
        id: String,
        updatedProjectInfo:ProjectSchemaType
        ): Promise<ResponseBodyType> {
            //? Check if the project entity exists for the given id and profile id
            const existingProjectResponse: ResponseBodyType =
                await ProjectQuery.getOne({
                    _id: id,
                    profile_id: updatedProjectInfo.profile_id
                })
            
            //? Check if project entity not found
            if(existingProjectResponse.status === 404)
                return ResponseStatusHandler.error_not_found(ProjectQuery.schema)
            
            //? If found, grab the project entity
            const projectEntity = existingProjectResponse.data

            //? Then update the project entity
            ProjectField.setAndUpdate(projectEntity, updatedProjectInfo)

            //? Save the project entity
            return await ProjectQuery.save(projectEntity, "UPDATE")
    }

    //TODO: Delete a single Project entity by Id
    static async deleteById(
        id:String,
        profile_id: String
        ): Promise<ResponseBodyType> {
            //? Grab the project entity by id and profile id
            const existingProjectResponse: ResponseBodyType =
                await ProjectQuery.getOne({
                    _id: id,
                    profile_id: profile_id
                })
            
            //? Check if project entity exists for the given id and profile id
            if(existingProjectResponse.status === 404)
                return ResponseStatusHandler.error_not_found(ProjectQuery.schema)
            
            //? If found, grab the project entity
            const projectEntity = existingProjectResponse.data

            //? Delete the project entity
            return await projectEntity
                .remove()
                .then((info)=>{
                    return ResponseStatusHandler.success_delete_one(
                        ProjectQuery.schema
                    )
                })
                .catch((error)=>{
                    return ResponseStatusHandler.error_known(error.message)
                })
        }

    //TODO: Delete multiple Project entities for a profile
    static async deleteMany(profile_id:String): Promise<ResponseBodyType> {

        //? Delete all project entities for the given profile
        return await ProjectModel.deleteMany({profile_id: profile_id})
        .then((info)=>{
            return ResponseStatusHandler.success_delete_many(
                ProjectQuery.schema,
                info.deletedCount
            )
        })
        .catch((error)=>{
            return ResponseStatusHandler.error_known(error.message)
        }) 
    }

    //TODO: Save the project entity
    static async save(
        projectEntity,
        routeType: String
    ): Promise<ResponseBodyType> {
        return await projectEntity
            .save()
            .then((projectInfo)=> {
                if(routeType === "ADD")
                    return ResponseStatusHandler.success_add(
                        ProjectQuery.schema,
                        projectInfo
                    )
                if(routeType === "UPDATE")
                    return ResponseStatusHandler.success_update(
                        ProjectQuery.schema,
                        projectInfo
                    )
            })
            .catch((error)=> {
                return  ResponseStatusHandler.error_known(error.message)
            })
    }
}

export { ProjectQuery }