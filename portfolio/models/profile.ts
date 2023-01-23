class Profile {
	name: string
	email: string
	bio: string
	socials: any

	constructor() {
		console.log("Profile constructor called")
		this.name = ""
		this.email = ""
		this.bio = ""
		this.socials = {
			twitter: "",
			linkedin: "",
			github: ""
		}
	}

	getAll() {
		return {
			name: this.name,
			email: this.email,
			bio: this.bio,
			socials: this.socials
		}
	}

	setAll(name: string, email: string, bio: string, socials: any) {
		this.name = name
		this.email = email
		this.bio = bio
		this.socials = socials
	}

	getName() {
		return {
			name: this.name
		}
	}

	setName(name: string) {
		this.name = name
	}

	getEmail() {
		return {
			email: this.email
		}
	}

	setEmail(email: string) {
		this.email = email
	}

	getBio() {
		return {
			bio: this.bio
		}
	}

	setBio(bio: string) {
		this.bio = bio
	}

	getSocials() {
		return {
			socials: this.socials
		}
	}

	setSocials(socials: string) {
		this.socials = socials
	}
}

export { Profile }
