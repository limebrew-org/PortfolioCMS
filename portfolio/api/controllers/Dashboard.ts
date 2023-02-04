import { Request, Response } from "express-serve-static-core"
import { ResponseBody } from "../../utils/handleResponse"

class DashboardController {
	async getDashboard(
		request: Request,
		response: Response
	): Promise<Response> {
		return ResponseBody.demoResponse(response)
	}
}

export { DashboardController }
