import { ProfileMiddlewareType, ProfileSchemaType } from "./types"

const maskedProfileEntity = (profileEntity: any) => {
	const modifiedProfileEntity: ProfileMiddlewareType = {
		_id: profileEntity._id,
		username: profileEntity.username,
		name: profileEntity.name,
		email: profileEntity.email,
		bio: profileEntity.bio,
		socials: profileEntity.socials
	}
	return modifiedProfileEntity
}

const maskedProfileEntityList = (profileEntityList: any) => {
	//? Handle empty list
	if (profileEntityList.length === 0) return []

	let modifiedEntityList: any = []
	for (let i = 0; i < profileEntityList.length; i++) {
		const modifiedProfileEntity: ProfileMiddlewareType = {
			_id: profileEntityList[i]._id,
			username: profileEntityList[i].username,
			name: profileEntityList[i].name,
			email: profileEntityList[i].email,
			bio: profileEntityList[i].bio,
			socials: profileEntityList[i].socials
		}
		modifiedEntityList.push(modifiedProfileEntity)
	}
	return modifiedEntityList
}

export { maskedProfileEntity, maskedProfileEntityList }
