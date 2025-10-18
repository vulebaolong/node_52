import express from "express"
import articleController from "../controllers/article.controller.js"

const articleRouter = express.Router()

// CRUD
// Read All
articleRouter.get("/", articleController.findAll)

export default articleRouter