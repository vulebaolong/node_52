import express from "express";
import demoController from "../controllers/demo.controller.js";

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
demoRouter.get("/check-server", (req, res, next) => {
    res.json("Hello world");
});

// 4 cách nhận dữ liệu

// Query Parameters
// app: http://localhost:3069
// api: GET: /query
// app + api: http://localhost:3069/query
// nhận biết: bắt đầu bằng dấu ?, phân tách bằng dấu &
// thường dùng: phân trang, search, lọc, ..
demoRouter.get("/query", demoController.query);

// Path Parameters
// nhận biết: được xác định bằng dấu 2 chấm (:) trong (router, url, endpoint, path, ...)
demoRouter.delete("/path/:id/:email", (req, res, next) => {
    const params = req.params;

    const id = params.id;
    console.log(id);

    const email = params.email;
    console.log(email);

    res.json({
        message: "Nhận dữ liệu từ Path",
        data: params,
    });
});

// Headers
// PUT: /headers
// thường dùng: FE sẽ muốn gửi token, key, ...
demoRouter.put("/headers", (req, res, next) => {
    const headers = req.headers;
    console.log(headers);

    res.json({
        message: "Nhận dữ liệu từ headers",
        data: headers,
    });
});

// Body
// sẽ không lấy được body nếu như thiếu express.json()
// POST: /body
// thường dùng: dữ liệu gửi lên lớn
demoRouter.post("/body", (req, res, next) => {
    const body = req.body;

    console.log("body", body);

    res.json({
        message: "Nhận dữ liệu từ body",
        data: body,
    });
});

export default demoRouter;
