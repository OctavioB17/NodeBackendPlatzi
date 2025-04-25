import { ICreateUser } from './app/interfaces/users/post/ICreateUser'
import {AUTH_TYPES, CATEGORY_TYPES, ENCRYPTION_TYPES, MAIL_TYPES, ORDER_TYPES, PRODUCT_TYPES, USER_TYPES, UTIL_TYPES} from './types'
import { IIdGenerator } from './infraestructure/services/interfaces/IIdGenerator'
import { IUserRepository } from './domain/repositories/IUsersRepository'
import { IFindAllUsers } from './app/interfaces/users/get/IFindAll'
import { IFindAllUsersNoPassword } from './app/interfaces/users/get/IFindAllUsersNoPassword'
import { IFindUserByIdNoPassword } from './app/interfaces/users/get/IFindUserByIdNoPassword'
import { IFindUserByEmail } from './app/interfaces/users/get/IFindUserByEmail'
import { IFindUserByEmailNoPassword } from './app/interfaces/users/get/IFindUserByEmailNoPassword'
import { IDeleteUser } from './app/interfaces/users/delete/IDeleteUser'
import { IChangePassword } from './app/interfaces/users/patch/IChangePassword'
import IUserController from './presentation/controllers/interfaces/IUserController'
import userContainer from './infraestructure/inversify/UsersContainer'
import productContainer from './infraestructure/inversify/ProductsContainer'
import ICreateProduct from './app/interfaces/products/post/ICreateProduct'
import IProductRepository from './domain/repositories/IProductsRepository'
import IProductController from './presentation/controllers/interfaces/IUserController'
import IFindAllProductByCategory from './app/interfaces/products/get/IFindAllProductByCategory'
import IFindAllProductsByUser from './app/interfaces/products/get/IFindAllProductsByUser'
import IFindProductById from './app/interfaces/products/get/IFindProductById'
import IFindProductByName from './app/interfaces/products/get/IFindProductByName'
import IToggleProductPause from './app/interfaces/products/patch/IToggleProductPause'
import IUpdateProduct from './app/interfaces/products/patch/IUpdateProduct'
import categoriesContainer from './infraestructure/inversify/CategoriesContainer'
import { ICategoriesRepository } from './domain/repositories/ICategoryRepository'
import ICategoriesController from './presentation/controllers/interfaces/ICategoriesController'
import IDeleteCategory from './app/interfaces/categories/delete/IDeleteCategory'
import IGetAllCategories from './app/interfaces/categories/get/IGetAllCategories'
import IGetCategoryById from './app/interfaces/categories/get/IGetCategoryById'
import IUpdateCategory from './app/interfaces/categories/patch/IUpdateCategory'
import ICreateCategory from './app/interfaces/categories/post/ICreateCategory'
import utilContainer from './infraestructure/inversify/UtilsContainer'
import ordersContainer from './infraestructure/inversify/OrdersContainer'
import IOrdersMapper from './infraestructure/mappers/interfaces/IOrdersMapper'
import IDeleteOrder from './app/interfaces/orders/delete/IDeleteOrder'
import IFindAllOrdersByUserId from './app/interfaces/orders/get/IFindAllOrdersByUserId'
import IFindOrderById from './app/interfaces/orders/get/IFindOrderById'
import IUpdateOrder from './app/interfaces/orders/patch/IUpdateOrder'
import IUpdateStatus from './app/interfaces/orders/patch/IUpdateStatus'
import ICreateOrder from './app/interfaces/orders/post/ICreateOrder'
import IOrdersControllers from './presentation/controllers/interfaces/IOrdersController'
import IAddProductsToOrder from './app/interfaces/orders/post/IAddProductsToOrder'
import ICalculateTotalProductPrices from './app/interfaces/orders/ICalculateTotalProductPrices'
import { ITaxCalculator } from './app/interfaces/orders/ITaxCalculator'
import { IAddTaxesObject } from './app/interfaces/orders/IAddTaxObject'
import IHashCode from './app/interfaces/encryption/IHashCode'
import encryptionContainer from './infraestructure/inversify/EncryptionContainer'
import IEncriptionServices from './infraestructure/services/interfaces/IEncryptionServices'
import ICompareHash from './app/interfaces/encryption/ICompareHash'
import authContainer from './infraestructure/inversify/AuthContainer'
import ILocalLogin from './app/interfaces/auth/strategies/ILocalLogin'
import ILocalStrategyServices from './infraestructure/services/interfaces/auth/ILocalStrategyServices'
import IAuthController from './presentation/controllers/interfaces/IAuthController'
import PassportConfig from './infraestructure/config/PassportConfig'
import ISignToken from './app/interfaces/auth/ISignToken'
import IJwtServices from './infraestructure/services/interfaces/IJwtServices'
import IJwtStrategyServices from './infraestructure/services/interfaces/auth/IJwtStrategyServices'
import emailContainer from './infraestructure/inversify/EmailContainer'
import INodeMailer from './infraestructure/config/interfaces/INodeMailer'
import INodeMailerServices from './infraestructure/services/interfaces/INodeMailerServices'
import ISendMail from './app/interfaces/mail/ISendMail'
import IChangeRole from './app/interfaces/users/patch/IChangeRole'
import ISendConfirmationEmail from './app/interfaces/users/mail/ISendConfirmationEmail'
import ISendPasswordResetRequest from './app/interfaces/users/ISendPasswordResetRequest'
import ISendPasswordResetMail from './app/interfaces/users/mail/ISendPasswordResetMail'
import IFindAllRandomized from './app/interfaces/products/get/IFindAllRandomized'

export function initContainers() {
  authContainer.get<PassportConfig>(AUTH_TYPES.PassportConfig);
  utilContainer.get<IIdGenerator>(UTIL_TYPES.IIdGenerator);
  userContainer.get<ICreateUser>(USER_TYPES.ICreateUser);
  userContainer.get<IUserRepository>(USER_TYPES.IUserRepository);
  userContainer.get<IFindAllUsers>(USER_TYPES.IFindAll);
  userContainer.get<IFindAllUsersNoPassword>(USER_TYPES.IFindAllNoPassword);
  userContainer.get<IFindUserByIdNoPassword>(USER_TYPES.IFindUserByIdNoPassword);
  userContainer.get<IFindUserByEmail>(USER_TYPES.IFindUserByEmail);
  userContainer.get<IFindUserByEmailNoPassword>(USER_TYPES.IFindUserByEmailNoPassword);
  userContainer.get<IChangePassword>(USER_TYPES.IChangePassword);
  userContainer.get<IChangeRole>(USER_TYPES.IChangeRole);
  userContainer.get<IDeleteUser>(USER_TYPES.IDeleteUser);
  userContainer.get<IUserController>(USER_TYPES.IUserController);
  userContainer.get<ISendPasswordResetRequest>(USER_TYPES.ISendPasswordResetRequest)
  productContainer.get<IProductRepository>(PRODUCT_TYPES.IProductRepository);
  productContainer.get<IProductController>(PRODUCT_TYPES.IProductController);
  productContainer.get<ICreateProduct>(PRODUCT_TYPES.ICreateProduct);
  productContainer.get<IFindAllProductByCategory>(PRODUCT_TYPES.IFindAllProductByCategory);
  productContainer.get<IFindAllProductsByUser>(PRODUCT_TYPES.IFindAllProductsByUser);
  productContainer.get<IFindProductById>(PRODUCT_TYPES.IFindProductById);
  productContainer.get<IFindProductByName>(PRODUCT_TYPES.IFindProductByName);
  productContainer.get<IToggleProductPause>(PRODUCT_TYPES.IToggleProductPause);
  productContainer.get<IUpdateProduct>(PRODUCT_TYPES.IUpdateProduct);
  productContainer.get<IFindAllRandomized>(PRODUCT_TYPES.IFindAllRandomized)
  categoriesContainer.get<ICategoriesRepository>(CATEGORY_TYPES.ICategoriesRepository);
  categoriesContainer.get<ICategoriesController>(CATEGORY_TYPES.ICategoriesController);
  categoriesContainer.get<ICreateCategory>(CATEGORY_TYPES.ICreateCategory);
  categoriesContainer.get<IDeleteCategory>(CATEGORY_TYPES.IDeleteCategory);
  categoriesContainer.get<IGetAllCategories>(CATEGORY_TYPES.IGetAllCategories);
  categoriesContainer.get<IGetCategoryById>(CATEGORY_TYPES.IGetCategoryById);
  categoriesContainer.get<IUpdateCategory>(CATEGORY_TYPES.IUpdateCategory);
  ordersContainer.get<IOrdersMapper>(ORDER_TYPES.IOrdersMapper);
  ordersContainer.get<IFindOrderById>(ORDER_TYPES.IFindOrderById);
  ordersContainer.get<ICreateOrder>(ORDER_TYPES.ICreateOrder);
  ordersContainer.get<IAddProductsToOrder>(ORDER_TYPES.IAddProductsToOrders);
  ordersContainer.get<IDeleteOrder>(ORDER_TYPES.IDeleteOrder);
  ordersContainer.get<IUpdateOrder>(ORDER_TYPES.IUpdateOrder);
  ordersContainer.get<IFindAllOrdersByUserId>(ORDER_TYPES.IFindAllOrdersByUserId);
  ordersContainer.get<IUpdateStatus>(ORDER_TYPES.IUpdateStatus);
  ordersContainer.get<IOrdersControllers>(ORDER_TYPES.IOrdersController);
  ordersContainer.get<ITaxCalculator>(ORDER_TYPES.IvaCalculator);
  ordersContainer.get<ITaxCalculator>(ORDER_TYPES.SaleTaxCalculator);
  ordersContainer.get<ITaxCalculator>(ORDER_TYPES.SpecificProductTaxCalculator);
  ordersContainer.get<ITaxCalculator>(ORDER_TYPES.CalculateAllTaxes);
  ordersContainer.get<IAddTaxesObject>(ORDER_TYPES.IAddTaxesObject);
  ordersContainer.get<ICalculateTotalProductPrices>(ORDER_TYPES.ICalculateTotalProductPrices);
  encryptionContainer.get<IEncriptionServices>(ENCRYPTION_TYPES.IEncryptionServices);
  encryptionContainer.get<IHashCode>(ENCRYPTION_TYPES.IHashCode);
  encryptionContainer.get<ICompareHash>(ENCRYPTION_TYPES.ICompareHash);
  authContainer.get<IAuthController>(AUTH_TYPES.IAuthController);
  authContainer.get<ILocalLogin>(AUTH_TYPES.ILocalLogin);
  authContainer.get<ILocalStrategyServices>(AUTH_TYPES.ILocalStrategyServices);
  authContainer.get<IJwtServices>(AUTH_TYPES.IJwtServices);
  authContainer.get<ISignToken>(AUTH_TYPES.ISignToken);
  authContainer.get<IJwtStrategyServices>(AUTH_TYPES.IJwtStrategyServices);
  emailContainer.get<INodeMailer>(MAIL_TYPES.INodeMailer);
  emailContainer.get<INodeMailerServices>(MAIL_TYPES.INodeMailerServices);
  emailContainer.get<ISendConfirmationEmail>(MAIL_TYPES.ISendConfirmationEmail)
  emailContainer.get<ISendMail>(MAIL_TYPES.ISendMail)
  emailContainer.get<ISendPasswordResetMail>(MAIL_TYPES.ISendPasswordResetMail)
}
