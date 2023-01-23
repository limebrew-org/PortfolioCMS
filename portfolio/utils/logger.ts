class Logger {
	constructor() {}

	static success(message: string, schemaType: string) {
		console.log(` ✅  ${schemaType}: ${message}`)
	}

	static error(message: string, schemaType: string) {
		console.log(` ❌  ${schemaType}: ${message}`)
	}

	static info(message: string, schemaType: string) {
		console.log(` ℹ️  ${schemaType}: ${message}`)
	}

	static warn(message: string, schemaType: string) {
		console.log(` ⚠️   ${schemaType}: ${message}`)
	}
}

export { Logger }
