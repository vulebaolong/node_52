import { responseSuccess } from "../common/helpers/function.helper.js";
import { authService } from "../services/auth.service.js";

export const authController = {
   create: async function (req, res, next) {
      const result = await authService.create(req);
      const response = responseSuccess(result, `Create auth successfully`);
      res.status(response.statusCode).json(response);
   },

   findAll: async function (req, res, next) {
      const result = await authService.findAll(req);
      const response = responseSuccess(result, `Get all auths successfully`);
      res.status(response.statusCode).json(response);
   },

   findOne: async function (req, res, next) {
      const result = await authService.findOne(req);
      const response = responseSuccess(result, `Get auth #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   update: async function (req, res, next) {
      const result = await authService.update(req);
      const response = responseSuccess(result, `Update auth #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   remove: async function (req, res, next) {
      const result = await authService.remove(req);
      const response = responseSuccess(result, `Remove auth #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};