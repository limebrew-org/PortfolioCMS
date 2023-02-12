import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { EducationSchemaType } from "../types/schema"
import { PortfolioDBEntity } from "../utils/constants"

const { Schema } = mongoose

const educationSchema = new Schema<EducationSchemaType>({
	profile_id: { type: String },
	qualification: { type: String },
	institution: { type: String },
	grade: { type: String },
	tenure: { type: String }
})

const EducationModel = portfolioDb.model(PortfolioDBEntity.EDUCATION, educationSchema)

export { EducationModel }
