import { buildSchema } from "graphql";

/**
Int: Số nguyên
Float: Số thực, số có dấu phẩy
String: Chuỗi
Boolean: true hoặc false
ID: dịnh danh duy nhất, dùng cho cột id
!: field không được phép null
[type]: danh sách
 */

// Construct a schema using GraphQL schema language
export const schema = buildSchema(/* GraphQL */ `
    type Articles {
        id: ID
        title: String
        content: String
        imageUrl: String
        views: Int
        userId: Int
        deletedBy: Int
        isDeleted: Boolean
        deletedAt: String
        createdAt: String
        updatedAt: String
    }

    type PaginationArticle {
        page: Int
        pageSize: Int
        totalItem: Int
        totalPage: Int
        items: [Articles]
    }

    type LoginRes {
        accessToken: String
        refreshToken: String
    }

    # Query: type đặc biệt
    type Query {
        hello: String
        getArticleList(page: Int, pageSize: Int): PaginationArticle
    }

    # Mutation: type đặc biệt
    type Mutation {
        login(email: String, password: String): LoginRes
    }
`);
