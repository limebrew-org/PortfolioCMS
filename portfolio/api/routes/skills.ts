import express from "express"
import { SkillController } from "../controllers/Skills"
import { TokenMiddleWare } from "../../middleware/verifyToken"

const SkillRouter = express.Router()
const skillController = new SkillController()

SkillRouter.get("/", skillController.getByField)
SkillRouter.get("/:id", skillController.getById)
SkillRouter.post("/add", TokenMiddleWare, skillController.add)
SkillRouter.put("/update/:id", TokenMiddleWare, skillController.updateById)
SkillRouter.delete("/delete/:id", TokenMiddleWare, skillController.deleteById)

export { SkillRouter }
