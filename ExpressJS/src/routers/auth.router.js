import express from "express";
import { authController } from "../controllers/auth.controler.js";
import protect from "../common/middlewares/protect.middleware.js";
import passport from "passport";

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/get-info", protect, authController.getInfo);

// login google
// Khi người dùng click nút google login, thì FE sẽ gọi tới GET: api/auth/google
// Kích hoạt passport để:
//          - yêu cầu lấy thông tin: profile, email
//          - tự chuyển FE sang trang đăng nhập với google
authRouter.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))

authRouter.post("/", authController.create);
authRouter.get("/", authController.findAll);
authRouter.get("/:id", authController.findOne);
authRouter.patch("/:id", authController.update);
authRouter.delete("/:id", authController.remove);

export default authRouter;
