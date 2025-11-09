export const authSwagger = {
    "/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Returns tokens",
            requestBody: {
                description: "Optional description in *Markdown*",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    example: "example@gmail.com",
                                },
                                password: {
                                    type: "string",
                                    example: "12345",
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
    "/auth/register": {
        post: {
            tags: ["Auth"],
            summary: "Returns bolean",
            requestBody: {
                description: "Optional description in *Markdown*",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string",
                                    example: "example@gmail.com",
                                },
                                password: {
                                    type: "string",
                                    example: "12345",
                                },
                                fullName: {
                                    type: "string",
                                    example: "long1",
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
    "/auth/get-info": {
        get: {
            tags: ["Auth"],
            security: [
                { 
                    BearerAuth: [] 
                }
            ],
            summary: "Returns info user",
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
