import { UnauthorizedException } from "../common/helpers/exception.helper.js";
import sequelize from "../common/sequelize/connect.sequelize.js";

const demoService = {
    checkServer: () => {
        return "Hello world";
    },
    query: async (req) => {
        const query = req.query;

        console.log("query", query);
        console.log({ query });

        const [results, metadata] = await sequelize.query("SELECT * FROM Users"); // Raw query - use array destructuring

        console.log("result", results);

        return results;
    },
    path: (req) => {
        const params = req.params;

        const id = params.id;
        console.log(id);

        const email = params.email;
        console.log(email);

        return params;
    },
    headers: (req) => {
        const headers = req.headers;
        console.log(headers);

        return headers;
    },
    body: (req) => {
        const body = req.body;

        throw new UnauthorizedException("Body Bị ban");

        console.log("body", body);

        return body;
    },
};

export default demoService;
