import { articleSwagger } from "./article.swagger.js";
import { authSwagger } from "./auth.swagger.js";
import { userSwagger } from "./user.swagger.js";

export const swaggerDocument = {
    openapi: "3.0.4",
    info: {
        title: "Sample API",
        description: "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
        version: "0.1.9",
    },
    servers: [
        {
            url: "http://localhost:3069/api",
            description: "dev",
        },
        {
            url: "https://domain.com/api",
            description: "prod",
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
    paths: {
        ...articleSwagger,
        ...authSwagger,
        ...userSwagger,
    },
};
