import { Request, Response } from "express"

class EducationController {
    async getAllEducationInfo(request:Request,response:Response){}

    async getEducationById(request:Request,response:Response){}

    async addEducation(request:Request,response:Response){}

    async updateEducationById(request:Request,response:Response){}

    async deleteEducationById(request:Request,response:Response){}

    async deleteAllEducationDetails(request:Request,response:Response){}
}

export { EducationController }