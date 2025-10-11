import demoService from "../services/demo.service.js";

const demoController = {
    query: async (req, res, next) => {
        const query = await demoService.query(req);

        res.json({
            message: "Nhận dữ liệu từ query",
            data: query,
        });
    },
};

export default demoController;
