class Education {
	user_id: string
	qualification: string
	institution: string
	grade: string
	tenure: string

	constructor() {
		this.user_id = ""
		this.qualification = ""
		this.institution = ""
		this.grade = ""
		this.tenure = ""
	}

	getAll() {
		return {
			user_id: this.user_id,
			qualification: this.qualification,
			institution: this.institution,
			grade: this.grade,
			tenure: this.tenure
		}
	}

	setAll(
		user_id: string,
		qualification: string,
		institution: string,
		grade: string,
		tenure: string
	) {
		this.user_id = user_id
		this.qualification = qualification
		this.institution = institution
		this.grade = grade
		this.tenure = tenure
	}

	getQualification() {
		return {
			qualification: this.qualification
		}
	}

	setQualification(qualification: string) {
		this.qualification = qualification
	}

	getInstitution() {
		return {
			institution: this.institution
		}
	}

	setInstitution(institution: string) {
		this.institution = institution
	}

	getGrade() {
		return {
			grade: this.grade
		}
	}

	setGrade(grade: string) {
		this.grade = grade
	}

	getTenure() {
		return {
			tenure: this.tenure
		}
	}

	setTenure(tenure: string) {
		this.tenure = tenure
	}
}

export { Education }
