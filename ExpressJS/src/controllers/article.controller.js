import { responseSuccess } from "../common/helpers/function.helper.js";
import articleService from "../services/article.service.js";

const articleController = {
    findAll: async (req, res, next) => {
        const result = await articleService.findAll(req);
        const response = responseSuccess(result, "Find All Success");
        res.status(response.statusCode).json(response);
    },
};

export default articleController;
