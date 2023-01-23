import mongoose from "mongoose"
import { portfolioDb } from "../db/portfoliodb"
import { TechnologySchemaType } from "../utils/types"

const { Schema } = mongoose

const technologySchema = new Schema<TechnologySchemaType>({
    name: { type: String, required: true }
})

export {technologySchema}
