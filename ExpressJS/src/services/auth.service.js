import { BadRequestException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";

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

        const isPassword = bcrypt.compareSync(password, userExits.password);
        if (!isPassword) {
            throw new BadRequestException("Mật khẩu chưa chính xác");
        }

        const tokens = tokenService.createTokens(userExits.id);

        return tokens;
    },

    getInfo: async function (req) {
        return "getInfo"
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
