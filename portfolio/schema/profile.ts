import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { ProfileSchemaType } from "../types/schema"
import { PortfolioDBEntity } from "../utils/constants"

const { Schema } = mongoose

const ProfileSchema = new Schema<ProfileSchemaType>({
	username: { type: String, required: true },
	name: { type: String },
	email: { type: String, required: true },
	bio: { type: String },
	socials: {
		twitter: { type: String, lowercase: true, trim: true },
		linkedin: { type: String, lowercase: true, trim: true },
		github: { type: String, lowercase: true, trim: true }
	},
	password: { type: String, required: true }
})

const ProfileModel = portfolioDb.model(PortfolioDBEntity.PROFILES, ProfileSchema)

export { ProfileModel }
