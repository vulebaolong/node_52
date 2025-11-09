import prisma from "../prisma/connect.prisma.js";

// The root provides a resolver function for each API endpoint
export const root = {
    hello() {
        return "Hello world!";
    },

    async getArticleList() {
        const articles = await prisma.articles.findMany()
        console.log(articles);
        return articles
    },
};
