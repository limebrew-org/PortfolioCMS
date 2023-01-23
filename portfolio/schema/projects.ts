import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { ProjectSchemaType} from "../utils/types"
import { technologySchema } from "./technology"

const { Schema } = mongoose

const projectSchema = new Schema<ProjectSchemaType>({
	profile_id: { type: String , required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	technologies: [technologySchema],
	link: { type: String, required: true }
})

const ProjectModel = portfolioDb.model("projects", projectSchema)

export { ProjectModel }
