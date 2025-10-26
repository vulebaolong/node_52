import tokenService from "../../services/token.service.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";
import prisma from "../prisma/connect.prisma.js";

const protect = async (req, res, next) => {
    // mục đích: lấy token, để kiểm tra xem token có hợp lệ hay không
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new UnauthorizedException("Không có authorization");
    }

    const [type, accessToken] = authorization.split(" ");
    if (type !== "Bearer") {
        throw new UnauthorizedException("Type Token Không Hợp lệ, yêu cầu kiểu Bearer");
    }
    if (!accessToken) {
        throw new UnauthorizedException("Accesstoken Chưa hợp lệ");
    }

    // Xác minh token xem có hợp lệ hay không
    const { userId } = tokenService.verifyAccessToken(accessToken);

    const userExist = await prisma.users.findUnique({
        where: {
            id: userId,
        },
    });
    if (!userExist) {
        throw new UnauthorizedException("Người dùng không hợp lệ");
    }

    // console.log({ authorization, type, accessToken, userExist });

    req.user = userExist;

    next();
};

export default protect;
