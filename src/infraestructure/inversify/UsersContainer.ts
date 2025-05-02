import { Container } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUsersRepository";
import UserRepository from "../repositories/UserRepository";
import { ICreateUser } from "../../app/interfaces/users/post/ICreateUser";
import { AUTH_TYPES, AWS_TYPES, ENCRYPTION_TYPES, MAIL_TYPES, ORDER_TYPES, PRODUCT_TYPES, USER_TYPES, UTIL_TYPES } from "../../types";
import CreateUser from "../../app/use-cases/users/post/CreateUser";
import { IFindAllUsersNoPassword } from "../../app/interfaces/users/get/IFindAllUsersNoPassword";
import { IFindUserById } from "../../app/interfaces/users/get/IFindUserById";
import { IFindUserByIdNoPassword } from "../../app/interfaces/users/get/IFindUserByIdNoPassword";
import { IFindUserByEmail } from "../../app/interfaces/users/get/IFindUserByEmail";
import { IFindUserByEmailNoPassword } from "../../app/interfaces/users/get/IFindUserByEmailNoPassword";
import FindAllUsers from "../../app/use-cases/users/get/FindAll";
import FindAllNoPassword from "../../app/use-cases/users/get/FindAllNoPassword";
import FindUserById from "../../app/use-cases/users/get/FindUserById";
import FindUserIdNoPassword from "../../app/use-cases/users/get/FindUserByIdNoPassword";
import FindUserByMail from "../../app/use-cases/users/get/FindUserByMail";
import { IChangePassword } from "../../app/interfaces/users/patch/IChangePassword";
import ChangePassword from "../../app/use-cases/users/patch/ChangePassword";
import { IDeleteUser } from "../../app/interfaces/users/delete/IDeleteUser";
import DeleteUser from "../../app/use-cases/users/delete/DeleteUser";
import UserController from "../../presentation/controllers/UserController";
import IUserController from "../../presentation/controllers/interfaces/IUserController";
import FindUserByMailNoPassword from "../../app/use-cases/users/get/FindUserByMailNoPassword";
import { IFindAllUsers } from "../../app/interfaces/users/get/IFindAll";
import { IIdGenerator } from "../services/interfaces/IIdGenerator";
import IUserMapper from "../mappers/interfaces/IUserMapper";
import UserMapper from "../mappers/UserMapper";
import UuidGenerator from "../services/utils/UuidGenerator";
import IHashCode from "../../app/interfaces/encryption/IHashCode";
import HashCode from "../../app/use-cases/encryption/HashCode";
import EncryptionServices from "../services/encryption/EncryptionServices";
import IEncriptionServices from "../services/interfaces/IEncryptionServices";
import ICompareHash from "../../app/interfaces/encryption/ICompareHash";
import CompareHash from "../../app/use-cases/encryption/CompareHash";
import IAuthorizeUser from "../../app/interfaces/users/patch/IAuthorizeUser";
import AuthorizeUser from "../../app/use-cases/users/patch/AuthorizeUser";
import SendConfirmationEmail from "../../app/use-cases/users/mail/SendConfirmationEmail";
import ISendMail from "../../app/interfaces/mail/ISendMail";
import SendMail from "../../app/use-cases/mail/SendMail";
import INodeMailer from "../config/interfaces/INodeMailer";
import NodeMailer from "../config/NodeMailer";
import INodeMailerServices from "../services/interfaces/INodeMailerServices";
import NodeMailerServices from "../services/mail/NodeMailerServices";
import IChangeRole from "../../app/interfaces/users/patch/IChangeRole";
import ChangeRole from "../../app/use-cases/users/patch/ChangeRole";
import ISendConfirmationEmail from "../../app/interfaces/users/mail/ISendConfirmationEmail";
import ISendPasswordResetRequest from "../../app/interfaces/users/ISendPasswordResetRequest";
import SendPasswordResetRequest from "../../app/use-cases/users/mail/SendPasswordResetRequest";
import IJwtServices from "../services/interfaces/IJwtServices";
import JwtServices from "../services/auth/jwt/JwtServices";
import ISendPasswordResetMail from "../../app/interfaces/users/mail/ISendPasswordResetMail";
import SendPasswordResetMail from "../../app/use-cases/users/mail/SendPasswordResetMail";
import DeleteOrders from "../../app/use-cases/orders/delete/DeleteOrders";
import IDeleteOrder from "../../app/interfaces/orders/delete/IDeleteOrder";
import IOrdersRepository from "../../domain/repositories/IOrdersRepository";
import OrderRepository from "../repositories/OrderRepository";
import IOrdersMapper from "../mappers/interfaces/IOrdersMapper";
import OrdersMapper from "../mappers/OrdersMapper";
import IProductMapper from "../mappers/interfaces/IProductMapper";
import ProductMapper from "../mappers/ProductMapper";
import IDeleteProduct from "../../app/interfaces/products/delete/IDeleteProduct";
import FindAllProductsByUser from "../../app/use-cases/products/get/FindAllProductsByUser";
import IFindAllProductsByUser from "../../app/interfaces/products/get/IFindAllProductsByUser";
import IProductRepository from "../../domain/repositories/IProductsRepository";
import ProductRepository from "../repositories/ProductRepository";
import IFindAllOrdersByUserId from "../../app/interfaces/orders/get/IFindAllOrdersByUserId";
import FindAllOrdersByUserId from "../../app/use-cases/orders/get/FindAllOrdersByUserId";
import { ICreateUserFolder } from "../../app/interfaces/aws/ICreateUserFolder";
import CreateUserFolder from "../../app/use-cases/aws/CreateUserFolder";
import AwsServices from "../services/aws/AwsServices";
import { IAwsServices } from "../services/interfaces/IAwsServices";
import { IDeleteUserFolder } from "../../app/interfaces/aws/IDeleteUserFolder";
import DeleteUserFolder from "../../app/use-cases/aws/DeleteUserFolder";
import DeleteProduct from "../../app/use-cases/products/delete/DeleteProduct";
import DeleteProductFolder from "../../app/use-cases/aws/DeleteProductFolder";
import { IDeleteProductFolder } from "../../app/interfaces/aws/IDeleteProductFolder";
import ICreateFolderInS3 from "../../app/interfaces/aws/ICreateFolderInS3";
import IDeleteFolderInS3 from "../../app/interfaces/aws/IDeleteFolderInS3";
import CreateFolderInS3 from "../../app/use-cases/aws/CreateFolderInS3";
import DeleteFolderInS3 from "../../app/use-cases/aws/DeleteFolderInS3";


const userContainer = new Container();

userContainer.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
userContainer.bind<IUserMapper>(USER_TYPES.IUserMapper).to(UserMapper)
userContainer.bind<IIdGenerator>(UTIL_TYPES.IIdGenerator).to(UuidGenerator);
userContainer.bind<ICreateUser>(USER_TYPES.ICreateUser).to(CreateUser);
userContainer.bind<IFindAllUsers>(USER_TYPES.IFindAll).to(FindAllUsers)
userContainer.bind<IFindAllUsersNoPassword>(USER_TYPES.IFindAllNoPassword).to(FindAllNoPassword)
userContainer.bind<IFindUserById>(USER_TYPES.IFindUserById).to(FindUserById)
userContainer.bind<IFindUserByIdNoPassword>(USER_TYPES.IFindUserByIdNoPassword).to(FindUserIdNoPassword)
userContainer.bind<IFindUserByEmail>(USER_TYPES.IFindUserByEmail).to(FindUserByMail)
userContainer.bind<IFindUserByEmailNoPassword>(USER_TYPES.IFindUserByEmailNoPassword).to(FindUserByMailNoPassword)
userContainer.bind<IChangePassword>(USER_TYPES.IChangePassword).to(ChangePassword)
userContainer.bind<IChangeRole>(USER_TYPES.IChangeRole).to(ChangeRole)
userContainer.bind<IDeleteUser>(USER_TYPES.IDeleteUser).to(DeleteUser)
userContainer.bind<IUserController>(USER_TYPES.IUserController).to(UserController)
userContainer.bind<IEncriptionServices>(ENCRYPTION_TYPES.IEncryptionServices).to(EncryptionServices)
userContainer.bind<IHashCode>(ENCRYPTION_TYPES.IHashCode).to(HashCode)
userContainer.bind<ICompareHash>(ENCRYPTION_TYPES.ICompareHash).to(CompareHash)
userContainer.bind<IAuthorizeUser>(USER_TYPES.IAuthorizeUser).to(AuthorizeUser)
userContainer.bind<ISendConfirmationEmail>(MAIL_TYPES.ISendConfirmationEmail).to(SendConfirmationEmail)
userContainer.bind<ISendMail>(MAIL_TYPES.ISendMail).to(SendMail)
userContainer.bind<INodeMailer>(MAIL_TYPES.INodeMailer).to(NodeMailer)
userContainer.bind<INodeMailerServices>(MAIL_TYPES.INodeMailerServices).to(NodeMailerServices)
userContainer.bind<ISendPasswordResetRequest>(USER_TYPES.ISendPasswordResetRequest).to(SendPasswordResetRequest)
userContainer.bind<IJwtServices>(AUTH_TYPES.IJwtServices).to(JwtServices)
userContainer.bind<ISendPasswordResetMail>(MAIL_TYPES.ISendPasswordResetMail).to(SendPasswordResetMail)
userContainer.bind<IDeleteOrder>(ORDER_TYPES.IDeleteOrder).to(DeleteOrders)
userContainer.bind<IOrdersRepository>(ORDER_TYPES.IOrdersRepository).to(OrderRepository)
userContainer.bind<IOrdersMapper>(ORDER_TYPES.IOrdersMapper).to(OrdersMapper)
userContainer.bind<IProductMapper>(PRODUCT_TYPES.IProductMapper).to(ProductMapper)
userContainer.bind<IDeleteProduct>(PRODUCT_TYPES.IDeleteProduct).to(DeleteProduct)
userContainer.bind<IDeleteFolderInS3>(AWS_TYPES.IDeleteFolderInS3).to(DeleteFolderInS3)
userContainer.bind<ICreateFolderInS3>(AWS_TYPES.ICreateFolderInS3).to(CreateFolderInS3)
userContainer.bind<IDeleteProductFolder>(PRODUCT_TYPES.IDeleteProductFolder).to(DeleteProductFolder)
userContainer.bind<IFindAllProductsByUser>(PRODUCT_TYPES.IFindAllProductsByUser).to(FindAllProductsByUser)
userContainer.bind<IProductRepository>(PRODUCT_TYPES.IProductRepository).to(ProductRepository)
userContainer.bind<IFindAllOrdersByUserId>(ORDER_TYPES.IFindAllOrdersByUserId).to(FindAllOrdersByUserId)
userContainer.bind<ICreateUserFolder>(AWS_TYPES.ICreateUserFolder).to(CreateUserFolder)
userContainer.bind<IAwsServices>(AWS_TYPES.IAwsServices).to(AwsServices);
userContainer.bind<IDeleteUserFolder>(AWS_TYPES.IDeleteUserFolder).to(DeleteUserFolder)

export default userContainer
