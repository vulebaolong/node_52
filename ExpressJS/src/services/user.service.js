import { BadRequestException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/connect.prisma.js";
import path from "path";
import fs from "fs";
import cloudinary from "../common/cloudinary/init.cloudinary.js";
import { buildQuery } from "../common/helpers/build-query.helper.js";

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
                .upload_stream({ folder: "" }, (error, uploadResult) => {
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
        const { page, pageSize, filters, index } = buildQuery(req.query);

        const articlesPromise = prisma.users.findMany({
            // skip qua index bao nhiêu
            where: filters,
            skip: index,
            take: pageSize,
        });
        const totalItemPromise = prisma.users.count({ where: filters });

        const [articles, totalItem] = await Promise.all([articlesPromise, totalItemPromise]);

        const totalPage = Math.ceil(totalItem / pageSize);

        return {
            page: page,
            pageSize: pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: articles || [],
        };
    },

    findOne: async function (req) {
        const { id } = req.params;

        const user = await prisma.users.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                Roles: true
            }
        });

        return user;
    },

    update: async function (req) {
        return `This action updates a id: ${req.params.id} user`;
    },

    remove: async function (req) {
        return `This action removes a id: ${req.params.id} user`;
    },
};
