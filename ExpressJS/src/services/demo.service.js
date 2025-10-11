import sequelize from "../common/sequelize/connect.sequelize.js";

const demoService = {
    query: async (req) => {
        const query = req.query;

        console.log("query", query);
        console.log({ query });

        const [results, metadata] = await sequelize.query("SELECT * FROM Users"); // Raw query - use array destructuring

        console.log("result",results);

        return results;
    },
};

export default demoService;
