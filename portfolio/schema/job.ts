import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { JobType } from "../utils/types"

const { Schema } = mongoose

const jobsSchema = new Schema<JobType>({
	company: { type: String },
	role: { type: String },
	technologies: [{ type: String }],
	summary: { type: String },
	tenure: { type: String }
})

const JobModel = portfolioDb.model("jobs", jobsSchema)
export { jobsSchema, JobModel }
