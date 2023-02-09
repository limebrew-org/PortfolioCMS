import mongoose from "mongoose"
import { PortfolioDBEntity, PORTFOLIO_DB_CONNECTION_URL } from "../utils/constants"

const url:string = PORTFOLIO_DB_CONNECTION_URL
const MAX_POOL_SIZE: number = PortfolioDBEntity.MAX_POOL_SIZE

mongoose.set("strictQuery", true)
mongoose.connect(url, { maxPoolSize: MAX_POOL_SIZE })

const connection = mongoose.connection
const portfolioDb = connection.useDb(PortfolioDBEntity.DB_NAME)

export { connection, portfolioDb }
