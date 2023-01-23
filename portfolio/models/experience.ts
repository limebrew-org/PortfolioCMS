class Experience {
	user_id: string
	internships: Array<object>
	jobs: Array<object>

	constructor() {
		console.log("Experience constructor called")
		this.user_id = ""
		this.internships = []
		this.jobs = []
	}

	getAll() {
		return {
			user_id: this.user_id,
			internships: this.internships,
			jobs: this.jobs
		}
	}

	setAll(user_id: string, internships: Array<object>, jobs: Array<object>) {
		this.user_id = user_id
		this.internships = internships
		this.jobs = jobs
	}

	getInternships() {
		return {
			internships: this.internships
		}
	}

	setInternships(internships: Array<object>) {
		this.internships = internships
	}

	getJobs() {
		return {
			jobs: this.jobs
		}
	}

	setJobs(jobs: Array<object>) {
		this.jobs = jobs
	}
}

class ExperienceField {
	company: String
	role: String
	technologies: String
	summary: String
	tenure: String

	constructor() {
		this.company = ""
		this.role = ""
		this.technologies = ""
		this.summary = ""
		this.tenure = ""
	}

	getAll() {
		return {
			company: this.company,
			role: this.role,
			technologies: this.technologies,
			summary: this.summary,
			tenure: this.tenure
		}
	}

	setAll(
		company: string,
		role: string,
		technologies: string,
		summary: string,
		tenure: string
	) {
		this.company = company
		this.role = role
		this.technologies = technologies
		this.summary = summary
		this.tenure = tenure
	}
}

export { Experience, ExperienceField }
