import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { TokenSchemaType } from "../types/schema"

const { Schema } = mongoose

//? To store refresh token
const tokenSchema = new Schema<TokenSchemaType>({
	profile_id: { type: String },
	token: { type: String }
})

const TokenModel = portfolioDb.model("token", tokenSchema)

export { TokenModel }
