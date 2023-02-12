import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { APIKeySchemaType } from "../types/schema"
import { PortfolioDBEntity } from "../utils/constants"

const { Schema } = mongoose

const apiKeySchema = new Schema<APIKeySchemaType>({
	profile_id: { type: String, required: true },
	api_key: { type: String, required: true }
})

const APIKeyModel = portfolioDb.model(PortfolioDBEntity.API_KEYS, apiKeySchema)

export { APIKeyModel }
