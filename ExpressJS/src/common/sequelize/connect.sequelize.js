import { Sequelize } from "sequelize";

const sequelize = new Sequelize('mysql://root:1234@localhost:3307/db_cyber_community')

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize