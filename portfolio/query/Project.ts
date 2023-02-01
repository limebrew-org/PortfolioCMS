import { ProjectQueryType } from "../types/query";
import { ProjectSchemaType } from "../utils/types";

class ProjectQuery {
    //TODO: Get All Project entities based on Query
    static async getMany(query:ProjectQueryType){}

    //TODO: Get a single Project entity based on Query
    static async getOne(query:ProjectQueryType){}

    //TODO: Add a single Project for a profile
    static async addOne(projectInfo:ProjectSchemaType){}

    //TODO: Update a single Project entity by Id
    static async updateById(updatedProjectInfo:ProjectSchemaType){}

    //TODO: Delete a single Project entity by Id
    static async deleteById(id:string){}

    //TODO: Delete multiple Project entities for a profile
    static async deleteMany(profile_id:String){}
}

export { ProjectQuery }