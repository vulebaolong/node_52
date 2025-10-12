import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/app-error/app.error.js";

const app = express();

// Giúp nhận được dữ liệu của body
app.use(express.json());

app.use("/api", rootRouter);

app.use(appError);

const PORT = 3069;
app.listen(PORT, () => {
    console.log(`🤷 Server online at http://localhost:${PORT}`);
});
