import { EducationQuerytype } from "../types/query";
import { EducationSchemaType } from "../utils/types";

class EducationQuery {
    //TODO: Get All education details by Query
    static async getMany(query:EducationQuerytype){}

    //TODO: Get Single education entity by Query
    static async getOne(query:EducationQuerytype) {}

    //TODO: Add education details
    static async add(educationInfo: EducationSchemaType){}

    //TODO: Update Education details By Id
    static async updateById(id:String){}

    //TODO: Delete a single education entity
    static async deleteById(id:String){}

    //TODO: Delete Multiple education entities
    static async deleteMany(profile_id:String){}
}

export { EducationQuery }