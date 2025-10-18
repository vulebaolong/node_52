import express from "express";
import demoController from "../controllers/demo.controller.js";
import { UnauthorizedException } from "../common/helpers/exception.helper.js";

const demoRouter = express.Router();

// trả dữ liệu
// method: GET

// tạo dữ liệu
// method: POST

// tạo để trả dữ liệu
// url, path, endpoint

// app: http://localhost:3069
// api: GET: /check-server
// app + api: http://localhost:3069/check-server
demoRouter.get("/check-server", demoController.checkServer);

// 4 cách nhận dữ liệu

// Query Parameters
// app: http://localhost:3069
// api: GET: /query
// app + api: http://localhost:3069/query
// nhận biết: bắt đầu bằng dấu ?, phân tách bằng dấu &
// thường dùng: phân trang, search, lọc, ..
demoRouter.get(
    "/query",
    (req, res, next) => {
        console.log("mid 1");

        const payload = "user_banned";

        req.payload = payload;

        next();
    },
    (req, res, next) => {
        console.log("mid 2");

        // console.log("Dữ liệu nhận từ mid 1", req.payload);

        // if (req.payload === "user_banned") {
        //     throw new UnauthorizedException("User Bị ban")
        // }

        next();
    },
    (req, res, next) => {
        console.log("mid 3");

        next();
    },
    demoController.query
);

// Path Parameters
// nhận biết: được xác định bằng dấu 2 chấm (:) trong (router, url, endpoint, path, ...)

// Headers
// PUT: /headers
// thường dùng: FE sẽ muốn gửi token, key, ...
demoRouter.delete("/path/:id/:email", demoController.path);
demoRouter.put("/headers", demoController.headers);
demoRouter.post("/body", demoController.body);

// Body
// sẽ không lấy được body nếu như thiếu express.json()
// POST: /body
// thường dùng: dữ liệu gửi lên lớn

export default demoRouter;
