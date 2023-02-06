import crypto from "crypto"

//? Generate a token secret
const generateSecretToken = () => {
	return crypto.randomBytes(64).toString("hex")
}

export { generateSecretToken }