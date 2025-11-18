import { buildQuery } from "../common/helpers/build-query.helper.js";
import prisma from "../common/prisma/connect.prisma.js";

export const chatMessageService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
       const { page, pageSize, filters, index } = buildQuery(req.query);

        const articlesPromise = prisma.chatMessages.findMany({
            // skip qua index bao nhiêu
            where: filters,
            skip: index,
            take: pageSize,
            orderBy: {
                createdAt: "desc"
            }
        });
        const totalItemPromise = prisma.chatMessages.count({ where: filters });

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
      return `This action returns a id: ${req.params.id} chatMessage`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} chatMessage`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} chatMessage`;
   },
};