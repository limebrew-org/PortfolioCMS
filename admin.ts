import express from "express"
import cors from "cors"
import { connection } from "./portfolio/db/portfoliodb"
import { AdminRouter } from "./portfolio/admin/routes"
import { PORTFOLIO_ADMIN_PORT } from "./portfolio/utils/constants"

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
const PORT = process.env.PORT || PORTFOLIO_ADMIN_PORT

//TODO: Configure CORS
app.use(cors())

//TODO: Configure body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? API routes
app.use("/admin", AdminRouter)

//TODO: Listen from API Server port
app.listen(PORT, () => {
	console.log(
		`Portfolio-CMS: Admin-Server running successfully on http://localhost:${PORT}`
	)
})
