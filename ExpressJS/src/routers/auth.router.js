import express from "express";
import { authController } from "../controllers/auth.controler.js";
import protect from "../common/middlewares/protect.middleware.js";
import passport from "passport";
import { checkPermision } from "../common/middlewares/check-permision.middleware.js";

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/get-info", protect, checkPermision, authController.getInfo);

// login google
// Khi người dùng click nút google login, thì FE sẽ gọi tới GET: api/auth/google
// Kích hoạt passport để:
//          - yêu cầu lấy thông tin: profile, email
//          - tự chuyển FE sang trang đăng nhập với google
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Sau khi người dùng xác thực với Google thành công, thì google sẽ chuyển người dùng về API (thanh url = GET) này
// API này để hứng tín hiệu của goolge chuyển người dùng, kích hoạt middleware passport để passport làm việc với google lấy profile nằm trong hàm verify
//  hàm verify nằm ở: src/common/passport/google-oauth20.passport.js
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login", session: false }), authController.googleCalback);

authRouter.post("/refresh-token", authController.refreshToken);

authRouter.post("/", authController.create);
authRouter.get("/", authController.findAll);
authRouter.get("/:id", authController.findOne);
authRouter.patch("/:id", authController.update);
authRouter.delete("/:id", authController.remove);

export default authRouter;
