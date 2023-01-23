import crypto from "crypto"

const generateSecretToken = () => {
	return crypto.randomBytes(64).toString("hex")
}

export { generateSecretToken }
