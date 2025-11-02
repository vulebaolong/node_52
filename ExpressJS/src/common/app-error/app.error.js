import { responseError } from "../helpers/function.helper.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "../helpers/status-code.helper.js";

export const appError = (err, req, res, next) => {
    console.log("Lỗi đặc biệt", err);

    if (err instanceof jwt.JsonWebTokenError) {
        console.log(2);
        err.code = statusCodes.UNAUTHORIZED; // 401 => mã để FE logout người dùng
    }
    if (err instanceof jwt.TokenExpiredError) {
        console.log(1);
        err.code = statusCodes.FORBIDDEN; // 403 => mã để FE refreshToken
    }

    const response = responseError(err.message, err.code, err.stack);

    res.status(response.statusCode).json(response);
};
