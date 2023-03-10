import express from "express"
import cors from "cors"
import { connection } from "./portfolio/db/portfoliodb"
import { DashboardRouter } from "./portfolio/api/routes/dashboard"
import { ProfileRouter } from "./portfolio/api/routes/profile"
import { ExperienceRouter } from "./portfolio/api/routes/experience"
import { SkillRouter } from "./portfolio/api/routes/skills"
import { EducationRouter } from "./portfolio/api/routes/education"
import { PORTFOLIO_API_PORT } from "./portfolio/utils/constants"
import { ProjectRouter } from "./portfolio/api/routes/projects"
import { redisClient } from "./portfolio/cache/redis"

//TODO: Setup Redis Connection ----------------------
//? Connect to redis
;(async () => {
	await redisClient.connect()
})()

//! Event Listener for error state
redisClient.on("error", (err) => {
	console.log("Error in connecting to Redis! Error: ", err)
})

//? Event Listener for ready state
redisClient.on("ready", () => {
	console.log("Redis Connected Successfully!")
})

//TODO: Setup MongoDB Connection ----------------------
//! Error in connection
connection.on("error", () => {
	console.log("MongoDB connection error")
})

//? Connection established
connection.on("connected", function () {
	console.log("MongoDB connected successfully")
})


//TODO: Initialize Express app
const app = express()

// TODO: Set API port
const PORT = process.env.PORT || PORTFOLIO_API_PORT

//TODO: Configure CORS
app.use(cors())

//TODO: Configure body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? API routes
app.use("/api/dashboard", DashboardRouter)
app.use("/api/profile", ProfileRouter)
app.use("/api/skills", SkillRouter)
app.use("/api/education", EducationRouter)
app.use("/api/projects", ProjectRouter)
app.use("/api/experience", ExperienceRouter)

//TODO: Listen from API Server port
app.listen(PORT, () => {
	console.log(
		`Portfolio-CMS: API-Server running successfully on http://localhost:${PORT}`
	)
})
