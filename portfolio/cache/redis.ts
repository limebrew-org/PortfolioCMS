import * as redis from "redis"
import { PORTFOLIO_REDIS_CONNECTION_URL } from "../utils/constants"

const redisClient = redis.createClient({ url: PORTFOLIO_REDIS_CONNECTION_URL })
export { redisClient }