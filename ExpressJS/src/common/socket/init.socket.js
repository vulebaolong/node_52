import { Server } from "socket.io";
import tokenService from "../../services/token.service.js";
import prisma from "../prisma/connect.prisma.js";

export const initSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("connection", socket.id);

        socket.on("CREATE_ROOM", async (data, cb) => {
            try {
                console.log("CREATE_ROOM", data);
                const { targetUserIds, accessToken } = data;

                // userId là người đang muốn nhắn tin với => targetUserIds
                const { userId } = tokenService.verifyAccessToken(accessToken);

                // gom dữ liệu theo dạng Set để unique
                const userIdSet = new Set([...targetUserIds, userId]);

                // chuyển dữ liệu từ Set => array
                // => uniqueUserIds là một mảng unique
                const uniqueUserIds = Array.from(userIdSet);

                // Xử lý với chat 1 - 1
                // không được có nhóm trùng tại vì chat 1 - 1 chỉ có 1 nhóm 2 người duy nhất
                if (uniqueUserIds.length === 2) {
                    // kiểm tra xem là 2 người dùng này đã tồn tại nhóm chat trước đó chưa
                    const chatOneGroupExist = await prisma.chatGroups.findFirst({
                        where: {
                            ChatGroupMembers: {
                                every: {
                                    userId: {
                                        in: uniqueUserIds,
                                    },
                                },
                            },
                        },
                    });

                    if (!chatOneGroupExist) {
                        // tạo nhóm chat mới
                        await prisma.chatGroups.create({
                            data: {
                                name: null,
                                ownerId: userId,

                                // đồng thời di chuyển vào ChatGroupMembers để tạo 2 thành viên
                                ChatGroupMembers: {
                                    createMany: {
                                        data: uniqueUserIds.map((userId) => {
                                            return { userId: userId };
                                        }),
                                    },
                                },
                            },
                        });
                    }

                    // nếu code chạy tới đây, thì chatOneGroupExist sẽ luôn tồn tại
                    cb({
                        status: "succes",
                        message: "ok",
                        data: { chatGroupId: chatOneGroupExist.id },
                    });

                    return;
                }

                // Xử lý với chat nhóm
                // Tạo bao nhiêu nhóm trùng thành viên cũng được
                const chatManyGroupExist = await prisma.chatGroups.create({
                    data: {
                        name: null,
                        ownerId: userId,

                        // đồng thời di chuyển vào ChatGroupMembers để tạo 2 thành viên
                        ChatGroupMembers: {
                            createMany: {
                                data: uniqueUserIds.map((userId) => {
                                    return { userId: userId };
                                }),
                            },
                        },
                    },
                });

                // thành công
                cb({
                    status: "succes",
                    message: "ok",
                    data: { chatGroupId: chatManyGroupExist.id },
                });
            } catch (error) {
                // thất bại
                cb({
                    status: "error",
                    message: error?.message || "CREATE_ROOM Failed",
                    data: null,
                });
            }
        });
    });
};
