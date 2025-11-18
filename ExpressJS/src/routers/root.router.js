import express from "express";
import demoRouter from "./demo.router.js";
import articleRouter from "./article.router.js";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "../common/swagger/init.swagger.js";
import chatMessageRouter from "./chat-message.router.js";
import chatGroupRouter from "./chat-group.router.js";

const rootRouter = express.Router();

// swaggerDocument: chấp nhận 3 kiểu, yaml | yml, javascript, json
// http://localhost:3069/api/docs
rootRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { swaggerOptions: { persistAuthorization: true } }));

rootRouter.use("/demo", demoRouter);
rootRouter.use("/article", articleRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat-message", chatMessageRouter);
rootRouter.use("/chat-group", chatGroupRouter);

export default rootRouter;
