import bcrypt from "bcrypt"

//? Hash password
const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10)
}

//? Compare passwords
const comparePassword = async (
	inputPassword: string,
	hashedPassword: string
) => {
	return await bcrypt.compare(inputPassword, hashedPassword)
}

export { hashPassword, comparePassword }
