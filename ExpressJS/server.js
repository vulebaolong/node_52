import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/app-error/app.error.js";
import cors from "cors";

const app = express();

// Giúp nhận được dữ liệu của body
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "google.com"],
    })
);

app.use("/api", rootRouter);

app.use(appError);

const PORT = 3069;
app.listen(PORT, () => {
    console.log(`🤷 Server online at http://localhost:${PORT}`);
});
