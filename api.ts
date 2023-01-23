import express from "express"
import cors from "cors"
import { connection } from "./portfolio/db/portfoliodb"
import { dashboardRouter } from "./portfolio/routes/dashboard"
import { profileRouter } from "./portfolio/routes/profile"
import { projectRouter } from "./portfolio/routes/projects"
import { experienceRouter } from "./portfolio/routes/experience"
import { skillRouter } from "./portfolio/routes/skills"
import { educationRouter } from "./portfolio/routes/education"
import { PORTFOLIO_API_PORT } from "./portfolio/utils/constants"

//! Error in connection
connection.on("error", () => {
	console.log("MongoDB connection error")
})

//? Connection established
connection.on("connected", function () {
	console.log("MongoDB connected successfully")
})

//? Initialize Express app
const app = express()

// TODO: Set API port
const PORT = process.env.PORT || PORTFOLIO_API_PORT

//TODO: Configure CORS
app.use(cors())

//TODO: Configure body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? API routes
app.use("/api/dashboard", dashboardRouter)
app.use("/api/profile", profileRouter)
app.use("/api/skills", skillRouter)
app.use("/api/education", educationRouter)
app.use("/api/projects", projectRouter)
app.use("/api/experience", experienceRouter)

//TODO: Listen from API Server port
app.listen(PORT, () => {
	console.log(
		`Portfolio-CMS: API-Server running successfully on http://localhost:${PORT}`
	)
})
