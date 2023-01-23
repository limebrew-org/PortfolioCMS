#!/bin/bash

BASE_URL="http://localhost:8000"
EMAIL=saptak@gmail.com

#? 1. Get All Profiles
printf "\n✅ 1. Get all profiles: \n"
curl -s "${BASE_URL}/api/profile?email=${EMAIL}" | json_pp -json_opt pretty,canonical


#? 2. Get profile by email
printf "\n✅ 2. Get profile by email: \n"
curl -s "${BASE_URL}/api/profile?email=${EMAIL}" | json_pp -json_opt pretty,canonical


#? 3. Get Education details by email
printf "\n✅ 3. Get Education by email: \n"
curl -s "${BASE_URL}/api/education?email=${EMAIL}" | json_pp -json_opt pretty,canonical


#? 5. Get Experience details by email
printf "\n✅ 4. Get Experience details by email: \n"
curl -s "${BASE_URL}/api/experience?email=${EMAIL}" | json_pp -json_opt pretty,canonical


#? 6. Get Skills by email
printf "\n✅ 5. Get Skills by email: \n"
curl -s "${BASE_URL}/api/skills?email=${EMAIL}" | json_pp -json_opt pretty,canonical


#? 7. Get Projects by email
printf "\n✅ 6. Get Projects by email: \n"
curl -s "${BASE_URL}/api/projects?email=${EMAIL}" | json_pp -json_opt pretty,canonical