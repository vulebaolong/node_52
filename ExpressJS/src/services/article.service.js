import { buildQuery } from "../common/helpers/build-query.helper.js";
import prisma from "../common/prisma/connect.prisma.js";

const articleService = {
    findAll: async (req) => {
        const { page, pageSize, filters, index } = buildQuery(req.query);

        const articlesPromise = prisma.articles.findMany({
            // skip qua index bao nhiêu
            where: filters,
            skip: index,
            take: pageSize,
        });
        const totalItemPromise = prisma.articles.count({ where: filters });

        const [articles, totalItem] = await Promise.all([articlesPromise, totalItemPromise]);

        const totalPage = Math.ceil(totalItem / pageSize);

        return {
            page: page,
            pageSize: pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: articles || [],
        };
    },
    findOne: async (req) => {
        const { id } = req.params;

        const article = await prisma.articles.findUnique({
            where: {
                id: Number(id),
            },
        });

        return article;
    },
};

export default articleService;
