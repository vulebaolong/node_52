export const articleSwagger = {
    "/article": {
        get: {
            tags: ["Articles"],
            summary: "Returns a list of article.",
            parameters: [
                {
                    in: "query",
                    name: "page",
                    description: "page index",
                },
                {
                    in: "query",
                    name: "pageSize",
                    description: "pageSize index",
                },
            ],
            description: "Optional extended description in CommonMark or HTML.",
            responses: {
                200: {
                    description: "A JSON array of user names",
                    // content: {
                    //     "application/json": {
                    //         schema: {
                    //             type: "array",
                    //             items: {
                    //                 type: "string",
                    //             },
                    //         },
                    //     },
                    // },
                },
            },
        },
    },
    "/article/{id}": {
        get: {
            tags: ["Articles"],
            summary: "Returns a detail of article.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "Numeric ID of the article to get",
                },
            ],
            description: "Optional extended description in CommonMark or HTML.",
            responses: {
                200: {
                    description: "A JSON array of user names",
                    // content: {
                    //     "application/json": {
                    //         schema: {
                    //             type: "array",
                    //             items: {
                    //                 type: "string",
                    //             },
                    //         },
                    //     },
                    // },
                },
            },
        },
    },
};
