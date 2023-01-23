import express from "express"
import { dashboardDetails } from "../controllers/dashboard"

const dashboardRouter = express.Router()

dashboardRouter.get("/", dashboardDetails)

export { dashboardRouter }
