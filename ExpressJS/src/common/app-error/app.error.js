import { responseError } from "../helpers/function.helper.js";

export const appError = (err, req, res, next) => {
    console.log("Lỗi đặc biệt", err);

    const response = responseError(err.message, err.code, err.stack);

    res.status(response.statusCode).json(response);
};
