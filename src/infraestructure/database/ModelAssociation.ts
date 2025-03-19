import CategoriesModel from "./models/CategoriesModel";
import ProductModel from "./models/ProductsModel";
import UserModel from "./models/UserModel";

ProductModel.belongsTo(UserModel, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
UserModel.hasMany(ProductModel, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })

ProductModel.belongsTo(CategoriesModel, { foreignKey: 'categoryId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
CategoriesModel.hasMany(ProductModel, { foreignKey: 'categoryId', onUpdate: 'CASCADE', onDelete: 'CASCADE'});