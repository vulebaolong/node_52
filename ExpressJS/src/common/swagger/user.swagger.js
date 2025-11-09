export const userSwagger = {
    "/user/avatar-local": {
        post: {
            tags: ["User"],
            summary: "Returns bolean",
            security: [
                {
                    BearerAuth: [],
                },
            ],
            requestBody: {
                description: "Optional description in *Markdown*",
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                avatar: {
                                    type: "string",
                                    format: "binary",
                                },
                                avatars: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        format: "binary",
                                    },
                                },
                            },
                        },
                    },
                },
            },
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
