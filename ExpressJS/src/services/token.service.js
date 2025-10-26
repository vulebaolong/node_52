import jwt from "jsonwebtoken";

const tokenService = {
    createTokens: (userId) => {
        const accesToken = jwt.sign({ userId: userId }, "ACCESS_TOKEN_SECRET", { expiresIn: "1d" });

        return {
            accessToken: accesToken,
            refreshToken: "refreshToken",
        };
    },

    verifyAccessToken: (accessToken) => {
        const decodeAccessToken = jwt.verify(accessToken, "ACCESS_TOKEN_SECRET");
        return decodeAccessToken;
    },
};

export default tokenService;
