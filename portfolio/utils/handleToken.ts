import jwt from "jsonwebtoken"
import { PayloadSchemaType } from "./types"
import {
	PORTFOLIO_ACCESS_TOKEN_SECRET,
	PORTFOLIO_REFRESH_TOKEN_SECRET
} from "./constants"

//? Generate accessToken
const generateAccessToken = (payload: PayloadSchemaType) => {
	return jwt.sign(payload, PORTFOLIO_ACCESS_TOKEN_SECRET, {
		expiresIn: "45m"
	})
}

//? Generate refreshToken
const generateRefreshToken = (payload: PayloadSchemaType) => {
	return jwt.sign(payload, PORTFOLIO_REFRESH_TOKEN_SECRET)
}

//? Verify token
const verifyToken = (token: string, tokenType: string) => {
	if (tokenType === "refresh_token")
		return jwt.verify(token, PORTFOLIO_REFRESH_TOKEN_SECRET)
	if (tokenType === "access_token")
		return jwt.verify(token, PORTFOLIO_ACCESS_TOKEN_SECRET)
}

export { generateAccessToken, generateRefreshToken, verifyToken }
