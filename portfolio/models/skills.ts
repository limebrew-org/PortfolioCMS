import mongoose from "mongoose"

class Skills {
	user_id: String
	frontend: Array<Object>
	backend: Array<Object>
	database: Array<Object>
	cloud: Array<Object>
	fundamentals: Array<Object>

	constructor() {
		console.log("Skills constructor called")
		this.user_id = ""
		this.frontend = []
		this.backend = []
		this.database = []
		this.cloud = []
		this.fundamentals = []
	}

	getAll() {
		return {
			user_id: this.user_id,
			frontend: this.frontend,
			backend: this.backend,
			database: this.database,
			cloud: this.cloud,
			fundamentals: this.fundamentals
		}
	}

	setAll(
		user_id: String,
		frontend: Array<Object>,
		backend: Array<Object>,
		database: Array<Object>,
		cloud: Array<Object>,
		fundamentals: Array<Object>
	) {
		this.user_id = user_id
		this.frontend = frontend
		this.backend = backend
		this.database = database
		this.cloud = cloud
		this.fundamentals = fundamentals
	}

	getBackend() {
		return {
			backend: this.backend
		}
	}

	setBackend(backend: Array<Object>) {
		this.backend = backend
	}

	getFrontend() {
		return {
			frontend: this.frontend
		}
	}

	setFrontend(frontend: Array<Object>) {
		this.frontend = frontend
	}

	getDatabase() {
		return {
			database: this.database
		}
	}

	setDatabase(database: Array<Object>) {
		this.database = database
	}

	getCloud() {
		return {
			cloud: this.cloud
		}
	}

	setCloud(cloud: Array<Object>) {
		this.cloud = cloud
	}

	getFundamentals() {
		return {
			fundamentals: this.fundamentals
		}
	}

	setFundamentals(fundamentals: Array<Object>) {
		this.fundamentals = fundamentals
	}
}

class SkillField {
	_id: String
	name: String

	constructor() {
		this._id = new mongoose.Types.ObjectId().toString()
		this.name = ""
	}

	getSkill() {
		return {
			_id: this._id,
			name: this.name
		}
	}

	setSkill(name: String) {
		this.name = name
	}
}

export { Skills, SkillField }
