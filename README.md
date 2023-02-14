<div align="center">
  
  [![version](https://img.shields.io/docker/v/limebrewofficial/portfolio-cms?color=&style=flat)](https://hub.docker.com/repository/docker/limebrewofficial/portfolio-cms/general)
  [![build](https://img.shields.io/github/actions/workflow/status/limebrew-org/PortfolioCMS/build-deploy.yml?branch=main&style=flat)](https://github.com/limebrew-org/PortfolioCMS/actions)
  [![nodejs](https://img.shields.io/badge/node.js-16.13.0-brightgreen)](https://nodejs.org/en/)
  [![top-language](https://img.shields.io/github/languages/top/limebrew-org/PortfolioCMS?color=blue)]()
  [![license](https://img.shields.io/github/license/limebrew-org/PortfolioCMS?color=yellow&style=flat)](https://github.com/limebrew-org/PortfolioCMS/blob/main/LICENSE)
  
</div>

# Portfolio

A Headless CMS built with Express,Typescript and MongoDB

## Install and Run:
Docker is the most convenient way to build and run `PortfolioCMS`
To install and run using docker, run docker-compose:

> In Development Mode:

    docker-compose -f docker-compose.dev.yml up -d --build

> In Staging Mode:

    docker-compose -f docker-compose.staging.yml up -d --build


or using Makefile:

    make compose_dev_up

    make compose_staging_up


## Environment
PortfolioCMS supports the following environments:

- local

- dev

- staging

- prod


## Routes:

### Auth:

1. `POST /auth/register`: Register a new profile

2. `POST /auth/login`: Login into the account

3. `POST /auth/token`: Regenerate Access token

4. `POST /auth/logout`: Logout from the account


### 2. Profile:

1.  `GET /api/profile?profile_id=`: Get Profile by `profile_id` (from `request query`)

2.  `GET /api/profile?profile_name=`: Get Profile by `profile_name` (from `request query`)

3.  `UPDATE /api/profile/update`: Update Profile, requires middleware (from `JWT/API Key`)

4.  `DELETE /api/profile/delete`: Delete Profile by `profile_id` (`JWT` only)


### 3. Education:

1.  `GET /api/education/all?profile_id=`: Get All Education details by `profile_id` (from `request query`)

2.  `GET /api/education/:id`: Get Education By `education_id` (from `request params`)

3.  `POST /api/education/add`: Add education for a profile, requires middleware (from `JWT/API Key`)

4.  `PUT /api/education/update/:id`: Update education by `education_id` (from `request params`), requires middleware (from `JWT/API Key`)

5.  `DELETE /api/education/:id`:  Delete education by `education_id` (from `request params`), requires middleware (from `JWT/API Key`)

6.  `DELETE /api/education/all`: Delete all education details for a profile, requires middleware (from `JWT/API Key`)


### 4. Projects:

1.  `GET /api/project/all?profile_id=`: Get All Projects by `profile_id` (from `request query`)

2.  `GET /api/project/:id`: Get Project by `project_id` (from `request params`)

3.  `POST /api/project/add`: Add Project for a profile, requires middleware (from `JWT/API Key`)

4.  `PUT /api/project/update/:id`: Update Project by `project_id` (from `request params`), requires middleware (from `JWT/API key`)

5.  `DELETE /api/project/:id=`: Delete Project by `project_id` (from `request params`), requires middleware (from `JWT/API key`)

6.  `DELETE /api/project/all`: Delete All Projects for a profile, requires middleware (from `JWT/API key`)


### 5. Skills:

1.  `GET /api/skill?profile_id=`: Get all Skills by `profile_id` (from client)

2.  `GET /api/skill/:id`: Get All Skills for a profile by `skill_id` (from `request query`)

3.  `GET /api/skill?field=`: Get All Skills by `field` (from `request query`), will be used for searching

4.  `POST /api/skill/add?field=`: Add Skill by `field` (from requestquery), requires middleware (from `JWT/API key`)

5.  `PUT /api/skill/update?skill_field=&skill_id=`: Update Skill by `skill_field` and `skill_id` (from query) and `profile_id` (from JWT/API key)

6.  `DELETE /api/skill?skill_id=`: Delete Skill by `skill_id` (from query) and `profile_id` (from JWT/API key)

7.  `DELETE /api/skill/all`: Delete all skills by `profile_id` (from JWT/API key)


### 6. Experience:

1.  `GET /api/experience?profile_id=`: Get experience by `profile_id` (from client)

2.  `GET /api/experience/internship?profile_id=`: Get All Internship details by `profile_id` (from client)

3.  `GET /api/experience/job?profile_id=`: Get All Job details by `profile_id` (from client)

4.  `POST /api/experience/internship/add`: Add Internship by `profile_id` (from JWT/API Key)

5.  `POST /api/experience/job/add`: Add Job by `profile_id` (from JWT/API Key)

6.  `PUT /api/experience/internship/update?internship_id=`: Update Internship details by `internship_id` (from query) and `profile_id` (from JWT/API Key)

7.  `PUT /api/experience/job/update?job_id=`: Update Job details by `job_id` (from query) and `profile_id` (from JWT/API Key)

8.  `DELETE /api/experience/all`: Delete All Internships and Job details by `profile_id` (from JWT/API Key)

9.  `DELETE /api/experience/internship/all`: Delete All Internships by `profile_id` (from JWT/API Key)

10.  `DELETE /api/experience/job/all`: Delete All Jobs by `profile_id` (from JWT/API Key)

11.  `DELETE /api/experience/internship?internship_id`: Delete Internship by `internship_id` (from query) and `profile_id` (from JWT/API Key)

12.  `DELETE /api/experience/job?job_id`: Delete Job by `job_id` (from query) and `profile_id` (from JWT/API Key)


### 7. Dashboard:

- `GET /api/dashboard?username=`: Get dashboard by `username` (from `request query`)
