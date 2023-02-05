const handleEnv = () => {
	if (process.env.NODE_ENV === "local") return { path: ".env.local" }
	if (process.env.NODE_ENV === "dev") return { path: ".env.dev" }
	if (process.env.NODE_ENV === "staging") return { path: ".env.staging" }
	if (process.env.NODE_ENV === "prod") return { path: ".env.prod" }
}

export { handleEnv }
