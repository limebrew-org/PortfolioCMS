import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { ProjectSchemaType } from "../utils/types"

const { Schema } = mongoose

const projectSchema = new Schema<ProjectSchemaType>({
	profile_id: { type: String },
	name: { type: String },
	description: { type: String },
	technologies: [{ type: Object }],
	link: { type: String }
})

const ProjectModel = portfolioDb.model("projects", projectSchema)

export { ProjectModel }
