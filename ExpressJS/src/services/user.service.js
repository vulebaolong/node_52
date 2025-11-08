import { BadRequestException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";
import path from "path";
import fs from "fs";
import cloudinary from "../common/cloudinary/init.cloudinary.js";

export const userService = {
    avatarLocal: async function (req) {
        //   console.log(req.file, req.user);

        if (!req.file) {
            throw new BadRequestException("Không có file");
        }

        await prisma.users.update({
            where: {
                id: req.user.id,
            },
            data: {
                avatar: req.file.filename,
            },
        });

        // đảm bảo 1 user - 1 avatar => xoá hình cũ
        // phải xoá 2 nơi mới đảm bảo  được 1 user - 1 avatar
        if (req.user.avatar) {
            // Xoá local
            const oldPath = path.join("public/images/", req.user.avatar);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            // Xoá Cloud
            cloudinary.uploader.destroy(req.user.avatar);
        }

        return true;
    },

    avatarCloud: async function (req) {
        console.log({ file: req.file });

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({folder: ""},(error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(uploadResult);
                })
                .end(req.file.buffer);
        });

        await prisma.users.update({
            where: {
                id: req.user.id,
            },
            data: {
                avatar: uploadResult.public_id,
            },
        });

        // đảm bảo 1 user - 1 avatar => xoá hình cũ
        // phải xoá 2 nơi mới đảm bảo  được 1 user - 1 avatar
        if (req.user.avatar) {
            // Xoá local
            const oldPath = path.join("public/images/", req.user.avatar);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            // Xoá Cloud
            cloudinary.uploader.destroy(req.user.avatar);
        }

        console.log({ uploadResult });

        return true;
    },

    create: async function (req) {
        return `This action create`;
    },

    findAll: async function (req) {
        return `This action returns all user`;
    },

    findOne: async function (req) {
        return `This action returns a id: ${req.params.id} user`;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} user`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} user`;
    },
};
