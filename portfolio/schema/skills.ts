import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { SkillSchemaType } from "../utils/types"

const { Schema } = mongoose

const skillSchema = new Schema<SkillSchemaType>({
	profile_id: { type: String, required: true },
	frontend: [{ type: String }],
	backend: [{ type: String }],
	database: [{ type: String }],
	cloud: [{ type: String }],
	fundamentals: [{ type: String }]
})

const SkillsModel = portfolioDb.model("skills", skillSchema)

export { SkillsModel }
