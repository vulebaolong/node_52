import { buildQuery } from "../common/helpers/build-query.helper.js";
import prisma from "../common/prisma/connect.prisma.js";

export const chatGroupService = {
    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        const { page, pageSize, filters, index } = buildQuery(req.query);
        const isOne = req.query.isOne;

        console.log({ isOne: isOne });

        const articlesPromise = prisma.chatGroups.findMany({
            // skip qua index bao nhiêu
            where: {
                ...filters,
                name: isOne === "true" ? null : { not: null },
            },
            skip: index,
            take: pageSize,
            include: {
                ChatGroupMembers: {
                    include: {
                        Users: true,
                    },
                },
            },
        });
        const totalItemPromise = prisma.chatGroups.count({ where: filters });

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

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} chatGroup`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} chatGroup`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} chatGroup`;
    },
};
