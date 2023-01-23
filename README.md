# Portfolio

This is a portfolio management service

## Routes:

1. Profile:

a. `GET /api/profile?user_id=`: Get Profile by `user_id` (from client)
b. `GET /api/profile?name=`: Get Profile by `name` (from query), used for searching user in community)
c. `POST /api/profile/add`: Create Profile in the database
d. `UPDATE /api/profile/update`: Update Profile by `user_id` (from JWT/API Key)
e. `DELETE /api/profile/delete`: Delete Profile by `user_id` (from JWT)
f. `


2. Education:

a. `GET /api/education/all?user_id=`: Get All Education details by `user_id` (from client)
b. `GET /api/education?education_id=`: Get Education By `education_id` and `user_id` (from client)
c. `POST /api/education/add`: Add education by `user_id` (from JWT/API Key)
d. `PUT /api/education/update?education_id=`: Update education by `education_id` (from query) and `user_id` (from JWT/API Key)
e. `DELETE /api/education?education_id=`:  Delete education by `education_id` (from query) and `user_id` (from JWT/API Key)
f. `DELETE /api/education/all`: Delete all education by `user_id` (from JWT/API Key)


3. Experience:

a. `GET /api/experience?user_id=`: Get experience by `user_id` (from client)
b. `GET /api/experience/internship?user_id=`: Get All Internship details by `user_id` (from client)
c. `GET /api/experience/job?user_id=`: Get All Job details by `user_id` (from client)
d. `POST /api/experience/internship/add`: Add Internship by `user_id` (from JWT/API Key)
e. `POST /api/experience/job/add`: Add Job by `user_id` (from JWT/API Key)
f. `PUT /api/experience/internship/update?internship_id=`: Update Internship details by `internship_id` (from query) and `user_id` (from JWT/API Key)
g. `PUT /api/experience/job/update?job_id=`: Update Job details by `job_id` (from query) and `user_id` (from JWT/API Key)
h. `DELETE /api/experience/all`: Delete All Internships and Job details by `user_id` (from JWT/API Key)
i. `DELETE /api/experience/internship/all`: Delete All Internships by `user_id` (from JWT/API Key)
j. `DELETE /api/experience/job/all`: Delete All Jobs by `user_id` (from JWT/API Key)
k. `DELETE /api/experience/internship?internship_id`: Delete Internship by `internship_id` (from query) and `user_id` (from JWT/API Key)
l. `DELETE /api/experience/job?job_id`: Delete Job by `job_id` (from query) and `user_id` (from JWT/API Key)

4. Projects:

a. `GET /api/project/all?user_id=`: Get All Projects by `user_id` (from client)
b. `GET /api/project?project_id=`: Get Project by `project_id` (from query) and `user_id` (from JWT/API Key)
c. `GET /api/project?project_name=`: Get Project by `project_name` (from query) and `user_id` (from JWT/API Key)
d. `POST /api/project/add`: Add Project by `user_id` (from JWT/API Key)
e. `PUT /api/project/update?project_id=`: Update Project by `project_id` (from query) and `user_id` (from JWT/API key)
f. `DELETE /api/project?project_id=`: Delete Project by `project_id` (from query) and `user_id` (from JWT/API key)
g. `DELETE /api/project/all`: Delete All Projects by `user_id` (from JWT/API key)


5. Skills:

a. `GET /api/skill?user_id=`: Get all Skills by `user_id` (from client)
b. `GET /api/skill?skill_name=`: Get Skills by `skill_name` (from client), will be used for searching
c. `POST /api/skill/add?skill_field=`: Add Skill by `skill_field` (from query) and `user_id` (from JWT/API key)
d. `PUT /api/skill/update?skill_field=&skill_id=`: Update Skill by `skill_field` and `skill_id` (from query) and `user_id` (from JWT/API key)
e. `DELETE /api/skill?skill_id=`: Delete Skill by `skill_id` (from query) and `user_id` (from JWT/API key)
f. `DELETE /api/skill/all`: Delete all skills by `user_id` (from JWT/API key)