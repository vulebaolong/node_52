import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant.js";

const tokenService = {
    createTokens: (userId) => {
        // hạn sử dụng của access token
        // cần được giảm xuống đáng kể, để giảm thiểu rủi ro khi người dùng bị lộ token
        // thời gian hết hạn tồn tại bao nhiêu thì người dùng rủi ro bấy nhiêu (nếu bị lộ)
        const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        // hạn sử dụng của refresh token
        // sẽ để cao hơn thời gian hết hạn của access,
        // Trả về CẶP token mới: thời gian hết hạn là thời gian nếu như người dùng không đăng nhập thì sẽ cần phải đăng nhập lại
        // Chỉ Trả accessToken mới: thời gian hết hạn là thời gian bắt buộc người dùng sẽ cần phải đăng nhập lại
        const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    },

    verifyAccessToken: (accessToken, option) => {
        const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, option);
        return decodeAccessToken;
    },

    verifyRefreshToken: (refreshToken) => {
        const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        return decodeRefreshToken;
    },
};

export default tokenService;
