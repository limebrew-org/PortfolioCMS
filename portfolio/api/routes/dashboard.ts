import express from "express"
import { DashboardController } from "../controllers/Dashboard"

const DashboardRouter = express.Router()
const dashboardController = new DashboardController()

DashboardRouter.get("/", dashboardController.getDashboard)

export { DashboardRouter }
