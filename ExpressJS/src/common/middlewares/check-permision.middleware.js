// chức năng phân quyền này chỉ sử dụng được khi trước nó là middleware protect

import { BadRequestException } from "../helpers/exception.helper.js";
import prisma from "../prisma/connect.prisma.js";

// phải có protect ở trước để biết được ai gọi API này và họ có quyền gì
export const checkPermision = async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new BadRequestException("Không có user ở Protect, thêm protect ở trước");
    }

    if (user.roleId === 1) {
        next();
        return;
    }

    const method = req.method;
    const endpoint = req.baseUrl + req.route?.path;

    const rolePermission = await prisma.rolePermission.findFirst({
        where: {
            roleId: user.roleId,
            Permissions: {
                method: method,
                endpoint: endpoint,
            },
            isActive: true,
        },
    });

    if (!rolePermission) {
        console.log("check-permission", {
            method: method,
            endpoint,
            roleId: user.roleId,
        });
        throw new BadRequestException("Người dùng không đủ quyền");
    }

    // console.log(`checkPermision`, { user: user, method, endpoint });
    next();
};
