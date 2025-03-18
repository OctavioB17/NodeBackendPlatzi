import sequelize from "./sequelize";

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('DB Sync sucesfully');
    } catch (error) {
    console.error('Error to sync DB:', error);
  }
};

   export default syncDatabase;