export type ProfileQueryType = {
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
    technology?: String,
    description?: String
}

export type ExperienceQueryType = {
    _id?: String,
    profile_id?: String,
    company?: String,
    role?: String,
    technology?: String,
    summary?: String,
    tenure?: String
}

export type SkillQueryType = {
    _id?: String,
    profile_id?: String,
    field_name?: "frontend" | "backend" | "database" | "cloud" | "fundamentals" 
}

export type TokenQueryType = {
    _id?: String,
    profile_id?: String,
    token?: String
}