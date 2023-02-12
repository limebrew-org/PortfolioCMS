import jwt from "jsonwebtoken"
import { PayloadSchemaType } from "../types/middleware"
import {
	PORTFOLIO_ACCESS_TOKEN_SECRET,
	PORTFOLIO_REFRESH_TOKEN_SECRET
} from "./constants"

import { MiddlewareConfiguration } from "./constants"
import { TOKEN } from "./constants"

//? Generate accessToken
const generateAccessToken = (payload: PayloadSchemaType) => {
	return jwt.sign(payload, PORTFOLIO_ACCESS_TOKEN_SECRET, {
		expiresIn: MiddlewareConfiguration.ACCESS_TOKEN_EXPIRATION_TIME
	})
}

//? Generate refreshToken
const generateRefreshToken = (payload: PayloadSchemaType) => {
	return jwt.sign(payload, PORTFOLIO_REFRESH_TOKEN_SECRET)
}

//? Verify token signature
const verifyToken = (token: string, tokenType: string) => {
	if (tokenType === TOKEN.refreshToken)
		return jwt.verify(token, PORTFOLIO_REFRESH_TOKEN_SECRET)
	if (tokenType === TOKEN.accessToken)
		return jwt.verify(token, PORTFOLIO_ACCESS_TOKEN_SECRET)
}

export { generateAccessToken, generateRefreshToken, verifyToken }
