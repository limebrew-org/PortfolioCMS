import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { SkillType } from "../utils/types"

const { Schema } = mongoose

const skillSchema = new Schema<SkillType>({
	profile_id: { type: String, required: true },
	frontend: [{ type: Object }],
	backend: [{ type: Object }],
	database: [{ type: Object }],
	cloud: [{ type: Object }],
	fundamentals: [{ type: Object }]
})

const SkillsModel = portfolioDb.model("skills", skillSchema)

export { SkillsModel }
