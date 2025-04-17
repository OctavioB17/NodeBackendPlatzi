import { Container } from "inversify";
import IAuthController from "../../presentation/controllers/interfaces/IAuthController";
import { AUTH_TYPES, ENCRYPTION_TYPES, USER_TYPES } from "../../types";
import AuthController from "../../presentation/controllers/AuthController";
import ILocalLogin from "../../app/interfaces/auth/strategies/ILocalLogin";
import LocalLogin from "../../app/use-cases/auth/LocalLogin";
import LocalStrategyServices from "../services/auth/strategies/LocalStrategyServices";
import ILocalStrategyServices from "../services/interfaces/ILocalStrategyServices";
import { IFindUserByEmail } from "../../app/interfaces/users/get/IFindUserByEmail";
import FindUserByMail from "../../app/use-cases/users/get/FindUserByMail";
import { IUserRepository } from "../../domain/repositories/IUsersRepository";
import UserRepository from "../repositories/UserRepository";
import IUserMapper from "../mappers/interfaces/IUserMapper";
import UserMapper from "../mappers/UserMapper";
import IHashCode from "../../app/interfaces/encryption/IHashCode";
import HashCode from "../../app/use-cases/encryption/HashCode";
import EncryptionServices from "../services/encryption/EncryptionServices";
import IEncriptionServices from "../services/interfaces/IEncryptionServices";
import ICompareHash from "../../app/interfaces/encryption/ICompareHash";
import CompareHash from "../../app/use-cases/encryption/CompareHash";
import PassportConfig from "../config/passportConfig";
import ISignToken from "../../app/interfaces/auth/ISignToken";
import SignToken from "../../app/use-cases/auth/SignToken";
import IJwtServices from "../services/interfaces/IJwtServices";
import JwtServices from "../services/auth/jwt/JwtServices";

const authContainer = new Container();

authContainer.bind<PassportConfig>(AUTH_TYPES.PassportConfig).to(PassportConfig)
authContainer.bind<IAuthController>(AUTH_TYPES.IAuthController).to(AuthController)
authContainer.bind<ILocalLogin>(AUTH_TYPES.ILocalLogin).to(LocalLogin)
authContainer.bind<ILocalStrategyServices>(AUTH_TYPES.ILocalStrategyServices).to(LocalStrategyServices)
authContainer.bind<IEncriptionServices>(ENCRYPTION_TYPES.IEncryptionServices).to(EncryptionServices)
authContainer.bind<IHashCode>(ENCRYPTION_TYPES.IHashCode).to(HashCode)
authContainer.bind<ICompareHash>(ENCRYPTION_TYPES.ICompareHash).to(CompareHash)
authContainer.bind<IUserMapper>(USER_TYPES.IUserMapper).to(UserMapper)
authContainer.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository)
authContainer.bind<IFindUserByEmail>(USER_TYPES.IFindUserByEmail).to(FindUserByMail)
authContainer.bind<IJwtServices>(AUTH_TYPES.IJwtServices).to(JwtServices)
authContainer.bind<ISignToken>(AUTH_TYPES.ISignToken).to(SignToken)

export default authContainer
