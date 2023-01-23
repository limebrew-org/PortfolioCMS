import mongoose from "mongoose"

class Project {
	user_id: String
	name: String
	description: String
	technologies: Array<Object>
	link: String

	constructor() {
		console.log("Project constructor called")
		this.user_id = ""
		this.name = ""
		this.description = ""
		this.technologies = []
		this.link = ""
	}

	getAll() {
		return {
			user_id: this.user_id,
			name: this.name,
			description: this.description,
			technologies: this.technologies,
			link: this.link
		}
	}

	setAll(
		user_id: String,
		name: String,
		description: String,
		technologies: Array<Object>,
		link: String
	) {
		this.user_id = user_id
		this.name = name
		this.description = description
		this.technologies = technologies
		this.link = link
	}

	getName() {
		return {
			name: this.name
		}
	}

	setName(name: String) {
		this.name = name
	}

	getDescription() {
		return {
			description: this.description
		}
	}

	setDescription(description: String) {
		this.description = description
	}

	getTechnologies() {
		return {
			technologies: this.technologies
		}
	}

	setTechnologies(technologies: Array<Object>) {
		this.technologies = technologies
	}

	getLink() {
		return {
			link: this.link
		}
	}

	setLink(link: String) {
		this.link = link
	}
}

class ProjectField {
	_id: String
	name: String

	constructor() {
		this._id = new mongoose.Types.ObjectId().toString()
		this.name = ""
	}

	getTechnologies() {
		return {
			_id: this._id,
			name: this.name
		}
	}

	setTechnologies(name: String) {
		this.name = name
	}
}

export { Project, ProjectField }
