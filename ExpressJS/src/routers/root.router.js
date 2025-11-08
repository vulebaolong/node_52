import express from "express"
import demoRouter from "./demo.router.js"
import articleRouter from "./article.router.js"
import authRouter from "./auth.router.js"
import userRouter from "./user.router.js"

const rootRouter = express.Router()

rootRouter.use("/demo", demoRouter)
rootRouter.use("/article", articleRouter)
rootRouter.use("/auth", authRouter)
rootRouter.use("/user", userRouter)

export default rootRouter