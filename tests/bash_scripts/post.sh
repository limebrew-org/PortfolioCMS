#!/bin/bash

BASE_URL="http://localhost:8000"
EMAIL=saptak@gmail.com

#? 1. Add Profile
printf "\n✅ 1. Add Profile: \n"
curl -s -X POST -H "Content-Type:application/json" -d '{ "name":"Saptak", "email":"saptak@gmail.com","bio":"Hard Core Pussy Lover"}' "${BASE_URL}/api/profile/add" | json_pp -json_opt pretty,canonical

#? 2. Add Education
printf "\n✅ 2. Add Education: \n"
# curl -s -X POST -H "Content-Type: application/json" -d '{"qualification": "Higher Secondary","institution": "Hindi Higher Secondary School","grade": "88.2 %","tenure": "2016-18"}' "${BASE_URL}/api/education/add?email=${EMAIL}" | json_pp -json_opt pretty,canonical

#? 3. Add Experience
printf "\n✅ 3. Add Experience: \n"
curl -s -X POST -H "Content-Type: application/json" -d '{"internships": [{"company": "IBM","role": "SDE1","technologies": "Web-dev","summary": "laude lage pare hain", "tenure": "1 year"}],"jobs":["data"]}' "${BASE_URL}/api/experience/add?email=${EMAIL}" | json_pp -json_opt pretty,canonical

#? 4. Add Skills 