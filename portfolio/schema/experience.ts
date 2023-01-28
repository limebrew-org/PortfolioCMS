import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { InternshipType } from "../utils/types"
import { JobType } from "../utils/types"

const { Schema } = mongoose

const internshipSchema = new Schema<InternshipType>({
	company: { type: String },
	role: { type: String },
	technologies: [{ type: String}],
	summary: { type: String },
	tenure: { type: String }
})

const jobSchema = new Schema<JobType>({
	company: { type: String },
	role: { type: String },
	technologies: [{ type: String }],
	summary: { type: String },
	tenure: { type: String }
})

const InternshipModel = portfolioDb.model("internships", internshipSchema)
const JobModel = portfolioDb.model("jobs", jobSchema)

export { internshipSchema, InternshipModel, JobModel, jobSchema }

