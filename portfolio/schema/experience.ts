import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { InternshipSchemaType } from "../types/schema"
import { JobSchemaType } from "../types/schema"
import { PortfolioDBEntity } from "../utils/constants"

const { Schema } = mongoose

const internshipSchema = new Schema<InternshipSchemaType>({
	profile_id: { type: String, required: true },
	company: { type: String, required: true },
	role: { type: String, required: true },
	technologies: [{ type: String }],
	summary: { type: String, required: true },
	tenure: { type: String, required: true }
})

const jobSchema = new Schema<JobSchemaType>({
	profile_id: { type: String, required: true },
	company: { type: String, required: true },
	role: { type: String, required: true },
	technologies: [{ type: String }],
	summary: { type: String, required: true },
	tenure: { type: String, required: true }
})

const InternshipModel = portfolioDb.model(PortfolioDBEntity.INTERNSHIPS, internshipSchema)
const JobModel = portfolioDb.model(PortfolioDBEntity.JOBS, jobSchema)

export { internshipSchema, InternshipModel, JobModel, jobSchema }
