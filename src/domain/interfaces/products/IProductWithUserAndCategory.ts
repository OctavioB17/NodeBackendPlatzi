import CategoriesModel from "../../../infraestructure/database/models/CategoriesModel";
import ProductModel from "../../../infraestructure/database/models/ProductsModel";
import UserModel from "../../../infraestructure/database/models/UserModel";

export default interface IProductWithUserAndCategory extends ProductModel {
  user?: UserModel;
  categories?: CategoriesModel
}