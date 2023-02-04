import express from "express"
import cors from "cors"
import { connection } from "./portfolio/db/portfoliodb"
import { AuthRouter } from "./portfolio/auth/routes"
import { PORTFOLIO_AUTH_PORT } from "./portfolio/utils/constants"

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
const PORT = process.env.PORT || PORTFOLIO_AUTH_PORT

//TODO: Configure CORS
app.use(cors())

//TODO: Configure body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//? Auth routes
app.use("/auth", AuthRouter)

//TODO: Listen to Auth Server connections on PORT
app.listen(PORT, () => {
	console.log(
		`Portfolio-CMS: AUTH-Server running successfully on http://localhost:${PORT}`
	)
})
