import express from "express";
import { uploadDiskLocal } from "../common/multer/disk-local.multer.js";
import { userController } from "../controllers/user.controller.js";
import protect from "../common/middlewares/protect.middleware.js";
import { uploadMemoryCloud } from "../common/multer/memory-cloud.multer.js";

const userRouter = express.Router();

userRouter.post("/avatar-local", protect, uploadDiskLocal.single("avatar"), userController.avatarLocal);
userRouter.post("/avatar-cloud", protect, uploadMemoryCloud.single("avatar"),userController.avatarCloud);

// Tạo route CRUD
userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.remove);

export default userRouter;
