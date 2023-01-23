import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { ExperienceSchemaType } from "../utils/types"
import { internshipSchema } from "./internship"
import { jobsSchema } from "./job"

const { Schema } = mongoose

const experienceSchema = new Schema<ExperienceSchemaType>({
	profile_id: { type: String },
	internships: [internshipSchema],
	jobs: [jobsSchema]
})

const ExperienceModel = portfolioDb.model("experience", experienceSchema)

export { ExperienceModel }
