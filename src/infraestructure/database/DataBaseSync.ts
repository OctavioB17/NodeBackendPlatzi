import sequelize from "./sequelize";

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};
