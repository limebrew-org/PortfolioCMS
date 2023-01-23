import mongoose from "mongoose"
import { PORTFOLIO_DB_CONNECTION_URL } from "../utils/constants"

const url = PORTFOLIO_DB_CONNECTION_URL

mongoose.set("strictQuery", true)
mongoose.connect(url, { maxPoolSize: 100 })

const connection = mongoose.connection
const portfolioDb = connection.useDb("portfolio_db")

export { connection, portfolioDb }
