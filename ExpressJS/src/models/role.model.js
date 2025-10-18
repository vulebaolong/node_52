import { DataTypes } from "sequelize";
import sequelize from "../common/sequelize/connect.sequelize.js";

// modelName: sử dụng nội bộ bên trong sequqlize
// tableName: là tên thật bên trong DB

// CODE FIRST:
const Role = sequelize.define(
    "Role",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
        deletedBy: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        deletedAt: {
            type: "TIMESTAMP",
            allowNull: true,
            defaultValue: null,
        },
        createdAt: {
            type: "TIMESTAMP",
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            type: "TIMESTAMP",

            // chỉ mở khi muốn tạo table, tạo xong rồi thì tắt đi để tránh lỗi khi create INSERT
            // allowNull: false,
            // defaultValue: sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
        },
    },
    {
        tableName: "Roles",
        timestamps: false,
    }
);

// CODE FIRST

// tạo table
await Role.sync();

// roleId: 1 - ADMIN
// roleId: 2 - USER

const roleAdmin = await Role.findByPk(1);

if (!roleAdmin) {
    await Role.create({
        id: 1,
        name: "ROLE_ADMIN",
        description: "Quản trị viên",
    });
}

export default Role;
