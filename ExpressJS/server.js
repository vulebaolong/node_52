import express from "express";

const app = express();

// trả dữ liệu
// method: GET

// tạo dữ liệu
// method: POST

// tạo để trả dữ liệu
// url, path, endpoint

// app: http://localhost:3069
// api: GET: /check-server
// app + api: http://localhost:3069/check-server
app.get("/check-server", (req, res, next) => {
    res.json("Hello world");
});

// 4 cách nhận dữ liệu

// Query Parameters
// app: http://localhost:3069
// api: GET: /query
// app + api: http://localhost:3069/query
// nhận biết: bắt đầu bằng dấu ?, phân tách bằng dấu &
// thường dùng: phân trang, search, lọc, ..
app.get("/query", (req, res, next) => {
    const query = req.query;

    console.log("query", query);
    console.log({ query });

    res.json({
        message: "Nhận dữ liệu từ query",
        data: query,
    });
});

// Path Parameters
// nhận biết: được xác định bằng dấu 2 chấm (:) trong (router, url, endpoint, path, ...)
app.delete("/path/:id/:email", (req, res, next) => {
    const params = req.params;

    const id = params.id
    console.log(id);

    const email = params.email
    console.log(email);


    res.json({
        message: "Nhận dữ liệu từ Path",
        data: params,
    });
});

// Headers
// PUT: /headers

// Body
// sẽ không lấy được body nếu như thiếu express.json()
// POST: /body

const PORT = 3069;
app.listen(PORT, () => {
    console.log(`🤷 Server online at http://localhost:${PORT}`);
});
