export type ProfileQuerytype = {
    _id?: String,
    username?: String
    name?: String
    email?: String
}


export type EducationQuerytype = {
    _id?: String,
    profile_id?: String,
    qualification?: String,
    institution?: String
    grade?: String,
    tenure?: String
}


export type ProjectQueryType = {
    _id?: String,
    profile_id?: String,
    name?: String,
    technologies?: String,
    description?: String
}

export type TokenQueryType = {
    _id?: String,
    profile_id?: String,
    token?: String
}