import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { APIKeySchemaType } from "../utils/types"

const { Schema } = mongoose

const apiKeySchema = new Schema<APIKeySchemaType>({
	profile_id: { type: String, required: true },
	api_key: { type: String, required: true }
})

const APIKeyModel = portfolioDb.model("api_key", apiKeySchema)

export { APIKeyModel }
