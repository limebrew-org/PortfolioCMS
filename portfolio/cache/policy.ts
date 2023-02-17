import { redisClient } from "./redis"
import { PORTFOLIO_DASHBOARD_CACHE_EXPIRATION_TIME } from "../utils/constants"

//TODO: Cache Policy Implementation
class CachePolicy {
	//? Check if cache was hit
	static async isCacheHit(key: string) {
		const cacheHitResponse = await CachePolicy.getCache(key)

		//? If cache not found return false
		if (cacheHitResponse === null) return { hit: false }

		//? Else return true and the data
		return { hit: true, value: JSON.parse(cacheHitResponse) }
	}

	//? Get Cache by key
	static async getCache(key: string) {
		return await redisClient.get(key)
	}

	//? Set Cache with expiration time
	static async setCache(key: string, value: any) {
		await redisClient.set(key, value)
		await redisClient.expire(
			key,
			parseInt(PORTFOLIO_DASHBOARD_CACHE_EXPIRATION_TIME)
		)
	}
}

export { CachePolicy }