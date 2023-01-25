# Portfolio

This is a portfolio management service

## Routes:

### 1. Auth:

- `POST /auth/register`: Register a new profile

- `POST /auth/login`: Login into the account

- `POST /auth/token`: Regenerate Access token

- `POST /auth/logout`: Logout from the account


### 2. Profile:

-  `GET /api/profile?profile_id=`: Get Profile by `profile_id` (from `request query`)

-  `GET /api/profile?profile_name=`: Get Profile by `profile_name` (from `request query`)

-  `UPDATE /api/profile/update`: Update Profile, requires middleware (from `JWT/API Key`)

-  `DELETE /api/profile/delete`: Delete Profile by `profile_id` (`JWT` only)


### 3. Education:

-  `GET /api/education/all?profile_id=`: Get All Education details by `profile_id` (from `request query`)

-  `GET /api/education/:id`: Get Education By `education_id` (from `request params`)

-  `POST /api/education/add`: Add education for a profile, requires middleware (from `JWT/API Key`)

-  `PUT /api/education/update/:id`: Update education by `education_id` (from `request params`), requires middleware (from `JWT/API Key`)

-  `DELETE /api/education/:id`:  Delete education by `education_id` (from `request params`), requires middleware (from `JWT/API Key`)

-  `DELETE /api/education/all`: Delete all education details for a profile, requires middleware (from `JWT/API Key`)


### 4. Projects:

-  `GET /api/project/all?profile_id=`: Get All Projects by `profile_id` (from `request query`)

-  `GET /api/project/:id`: Get Project by `project_id` (from `request params`)

-  `POST /api/project/add`: Add Project for a profile, requires middleware (from `JWT/API Key`)

-  `PUT /api/project/update/:id`: Update Project by `project_id` (from `request params`), requires middleware (from `JWT/API key`)

-  `DELETE /api/project/:id=`: Delete Project by `project_id` (from `request params`), requires middleware (from `JWT/API key`)

-  `DELETE /api/project/all`: Delete All Projects for a profile, requires middleware (from `JWT/API key`)


### 5. Skills:

-  `GET /api/skill?profile_id=`: Get all Skills by `profile_id` (from client)

-  `GET /api/skill/:id`: Get All Skills for a profile by `skill_id` (from `request query`)

-  `GET /api/skill?field=`: Get All Skills by `field` (from `request query`), will be used for searching

-  `POST /api/skill/add?field=`: Add Skill by `field` (from requestquery), requires middleware (from `JWT/API key`)

-  `PUT /api/skill/update?skill_field=&skill_id=`: Update Skill by `skill_field` and `skill_id` (from query) and `profile_id` (from JWT/API key)

-  `DELETE /api/skill?skill_id=`: Delete Skill by `skill_id` (from query) and `profile_id` (from JWT/API key)

-  `DELETE /api/skill/all`: Delete all skills by `profile_id` (from JWT/API key)


### 6. Experience:

-  `GET /api/experience?profile_id=`: Get experience by `profile_id` (from client)

-  `GET /api/experience/internship?profile_id=`: Get All Internship details by `profile_id` (from client)

-  `GET /api/experience/job?profile_id=`: Get All Job details by `profile_id` (from client)

-  `POST /api/experience/internship/add`: Add Internship by `profile_id` (from JWT/API Key)

-  `POST /api/experience/job/add`: Add Job by `profile_id` (from JWT/API Key)

-  `PUT /api/experience/internship/update?internship_id=`: Update Internship details by `internship_id` (from query) and `profile_id` (from JWT/API Key)

-  `PUT /api/experience/job/update?job_id=`: Update Job details by `job_id` (from query) and `profile_id` (from JWT/API Key)

-  `DELETE /api/experience/all`: Delete All Internships and Job details by `profile_id` (from JWT/API Key)

-  `DELETE /api/experience/internship/all`: Delete All Internships by `profile_id` (from JWT/API Key)

-  `DELETE /api/experience/job/all`: Delete All Jobs by `profile_id` (from JWT/API Key)

-  `DELETE /api/experience/internship?internship_id`: Delete Internship by `internship_id` (from query) and `profile_id` (from JWT/API Key)

-  `DELETE /api/experience/job?job_id`: Delete Job by `job_id` (from query) and `profile_id` (from JWT/API Key)


### 7. Dashboard:

- `GET /dashboard?profile_id=`: Get dashboard by `profile_id` (from `request query`)