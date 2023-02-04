import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { InternshipSchemaType } from "../utils/types"
import { JobSchemaType } from "../utils/types"

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

const InternshipModel = portfolioDb.model("internship", internshipSchema)
const JobModel = portfolioDb.model("job", jobSchema)

export { internshipSchema, InternshipModel, JobModel, jobSchema }
