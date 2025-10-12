import { responseSuccess } from "../common/helpers/function.helper.js";
import demoService from "../services/demo.service.js";

const demoController = {
    checkServer: (req, res, next) => {
        const result = demoService.checkServer(req);
        const response = responseSuccess(result, "Check server thành công");
        res.status(response.statusCode).json(response);
    },
    query: async (req, res, next) => {
        const result = await demoService.query(req);
        const response = responseSuccess(result, "Nhận dữ liệu từ query");
        res.status(response.statusCode).json(response);
    },
    path: async (req, res, next) => {
        const result = await demoService.path(req);
        const response = responseSuccess(result, "Nhận dữ liệu từ path");
        res.status(response.statusCode).json(response);
    },
    headers: async (req, res, next) => {
        const result = await demoService.headers(req);
        const response = responseSuccess(result, "Nhận dữ liệu từ path");
        res.status(response.statusCode).json(response);
    },
    body: async (req, res, next) => {
        const result = await demoService.body(req);
        const response = responseSuccess(result, "Nhận dữ liệu từ path");
        res.status(response.statusCode).json(response);
    },
};

export default demoController;
