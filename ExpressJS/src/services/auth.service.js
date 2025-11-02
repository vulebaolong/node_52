import { BadRequestException, UnauthorizedException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
import { sendMail } from "../common/node-mailler/init.node-mailler.js";

export const authService = {
    register: async function (req) {
        const { email, password, fullName } = req.body;

        const userExist = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (userExist) {
            throw new BadRequestException("Người dùng đã tồn tại, vui lòng đăng nhập");
        }

        // hash: băm (không thể dịch ngược)
        const hashPassword = bcrypt.hashSync(password, 10);

        const userNew = await prisma.users.create({
            data: {
                email: email,
                password: hashPassword,
                fullName: fullName,
            },
        });

        // console.log({ email, password, fullName, userExist });

        return true;
    },

    login: async function (req) {
        const { email, password } = req.body;

        const userExits = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (!userExits) {
            throw new BadRequestException("Người dùng chưa tồn tại, vui lòng đăng ký");
        }

        if (!password) {
            throw new BadRequestException("Vui lòng đăng nhập bằng Google, để cập nhật mật khẩu trong setting");
        }

        const isPassword = bcrypt.compareSync(password, userExits.password);
        if (!isPassword) {
            throw new BadRequestException("Mật khẩu chưa chính xác");
        }

        const tokens = tokenService.createTokens(userExits.id);

        // sendMail(email)
        await sendMail("vulebaolong@gmail.com", "Cảnh báo đăng nhập");

        return tokens;
    },

    getInfo: async function (req) {
        delete req.user.password;
        return req.user;
    },

    googleCalback: async function (req) {
        const { accessToken, refreshToken } = tokenService.createTokens(req.user.id);
        // console.log({ accessToken, refreshToken });
        return `http://localhost:3000/login-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`;
    },

    refreshToken: async function (req) {
        const { accessToken, refreshToken } = req.body;

        const decodeAccessToken = tokenService.verifyAccessToken(accessToken, { ignoreExpiration: true });
        const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);

        if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
            throw new UnauthorizedException("Token không hợp lệ");
        }

        const userExist = await prisma.users.findUnique({
            where: {
                id: decodeAccessToken.userId,
            },
        });
        if (!userExist) {
            throw new UnauthorizedException("User không hợp lệ");
        }

        // Trường hợp 1: trả 2 cặp token
        // Chỉ khỉ khoản thời gian hết hạn của refreshToken mà người dùng không đăng nhập => login lại
        const tokens = tokenService.createTokens(userExist.id);

        // Trường hợp 2: chỉ trả accessToken mới
        // bắt buộc cứ mỗi thời gian hết hạn của refreshToken => login lại

        console.log({ accessToken, refreshToken, decodeAccessToken, decodeRefreshToken });

        return tokens;
    },

    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        return `This action returns all auth`;
    },

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} auth`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} auth`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} auth`;
    },
};
