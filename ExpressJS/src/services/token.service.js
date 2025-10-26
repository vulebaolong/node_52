import jwt from "jsonwebtoken";

const tokenService = {
    createTokens: (userId) => {
        const accesToken  = jwt.sign({ userId: userId }, "ACCESS_TOKEN_SECRET", { expiresIn: "1d" });

        return {
            accessToken: accesToken,
            refreshToken: "refreshToken",
        };
    },
};

export default tokenService;
