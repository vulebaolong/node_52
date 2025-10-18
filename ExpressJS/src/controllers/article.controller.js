import { responseSuccess } from "../common/helpers/function.helper.js";
import articleService from "../services/article.service.js";

const articleController = {
    findAll: (req, res, next) => {
        const result = articleService.findAll(req);
        const response = responseSuccess(result, "Find All Success");
        res.status(response.statusCode).json(response);
    },
};

export default articleController;
