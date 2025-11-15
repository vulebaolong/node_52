import articleService from "../../services/article.service.js";
import { authService } from "../../services/auth.service.js";
import { BadRequestException } from "../helpers/exception.helper.js";
import prisma from "../prisma/connect.prisma.js";

// The root provides a resolver function for each API endpoint
export const root = {
    hello() {
        return "Hello world!";
    },

    async getArticleList(arg, context) {
        console.log({ context });
        const { user } = context;
        if (!user) {
            throw new BadRequestException("Token không hợp lệ");
        }

        const { page, pageSize } = arg;

        const req = {
            query: {
                page,
                pageSize,
            },
        };

        const result = await articleService.findAll(req);

        console.log({ arg, result });

        return result;
    },

    async login(arg) {
        console.log(arg);
        const { email, password } = arg;

        const req = {
            body: {
                email: email,
                password: password,
            },
        };

        const result = await authService.login(req);

        console.log(result);

        return result;
    },
};
