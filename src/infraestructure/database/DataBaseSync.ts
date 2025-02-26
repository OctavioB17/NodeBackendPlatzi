import sequelize from "./sequelize";

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Cambia a true si quieres forzar la sincronización
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};
