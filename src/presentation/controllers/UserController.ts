import { inject, namedConstraint } from "inversify";
import { ICreateUser } from "../../app/interfaces/users/post/ICreateUser";
import { Response, Request, NextFunction } from "express";
import { USER_TYPES } from "../../types";
import { IFindAllUsers } from "../../app/interfaces/users/get/IFindAll";
import { IFindAllUsersNoPassword } from "../../app/interfaces/users/get/IFindAllUsersNoPassword";
import { IFindUserById } from "../../app/interfaces/users/get/IFindUserById";
import { IFindUserByIdNoPassword } from "../../app/interfaces/users/get/IFindUserByIdNoPassword";
import { IFindUserByEmail } from "../../app/interfaces/users/get/IFindUserByEmail";
import { IDeleteUser } from "../../app/interfaces/users/delete/IDeleteUser";
import { IChangePassword } from "../../app/interfaces/users/patch/IChangePassword";
import { BoomError } from "../../domain/entities/DomainError";
import { validate as validateUUID } from 'uuid';
import { ErrorType } from "../../domain/interfaces/Error";
import IUserController from "./interfaces/IUserController";
import { IFindUserByEmailNoPassword } from "../../app/interfaces/users/get/IFindUserByEmailNoPassword";
import IUserMapper from "../../infraestructure/mappers/interfaces/IUserMapper";
import IAuthorizeUser from "../../app/interfaces/users/patch/IAuthorizeUser";
import IChangeRole from "../../app/interfaces/users/patch/IChangeRole";
import ISendPasswordResetRequest from "../../app/interfaces/users/ISendPasswordResetRequest";
export default class UserController implements IUserController {
  constructor(
    @inject(USER_TYPES.ICreateUser) private createUser: ICreateUser,
    @inject(USER_TYPES.IFindAll) private findAll: IFindAllUsers,
    @inject(USER_TYPES.IFindAllNoPassword) private findAllNoPassword: IFindAllUsersNoPassword,
    @inject(USER_TYPES.IFindUserById) private findUserById: IFindUserById,
    @inject(USER_TYPES.IFindUserByIdNoPassword) private findUserByIdNoPassword: IFindUserByIdNoPassword,
    @inject(USER_TYPES.IFindUserByEmail) private findUserByEmail: IFindUserByEmail,
    @inject(USER_TYPES.IFindUserByEmailNoPassword) private findUserByEmailNoPassword: IFindUserByEmailNoPassword,
    @inject(USER_TYPES.IDeleteUser) private deleteUser: IDeleteUser,
    @inject(USER_TYPES.IChangePassword) private changePassword: IChangePassword,
    @inject(USER_TYPES.IChangeRole) private changeRole: IChangeRole,
    @inject(USER_TYPES.IAuthorizeUser) private authorizeUser: IAuthorizeUser,
    @inject(USER_TYPES.IUserMapper) private userMapper: IUserMapper,
    @inject(USER_TYPES.ISendPasswordResetRequest) private sendPassResetRequest: ISendPasswordResetRequest
  ) {}

  async sendPassResetRequestController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body
    try {
      const passRequest = await this.sendPassResetRequest.execute(body.email)
      if (passRequest) {
        res.status(200).json({ message: "Password request send" })
      } else {
        throw new BoomError({
          message: 'Error to request a password reset',
          type: ErrorType.BAD_REQUEST,
          statusCode: 400
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async changeRoleController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const role = req.body
    try {
      const userUpdate = await this.changeRole.execute(id, role.role)
      if (userUpdate) {
        res.status(200).json({ message: "User role changed" })
      } else {
        throw new BoomError({
          message: 'Can not confirm user',
          type: ErrorType.BAD_REQUEST,
          statusCode: 400
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async authorizeUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      const userUpdate = await this.authorizeUser.execute(id)
      if (userUpdate) {
        res.status(200).json({ message: "User authorized" })
      } else {
        throw new BoomError({
          message: 'Can not confirm user',
          type: ErrorType.BAD_REQUEST,
          statusCode: 400
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO = req.body;
      const user = await this.createUser.execute(userDTO);
      if (user) {
        res.status(201).json({ message: 'User registration successful' })
      } else {
        throw new BoomError({
          message: 'Can not create user',
          type: ErrorType.BAD_REQUEST,
          statusCode: 400
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async findAllUsers(req: Request, res: Response, next: NextFunction) {
    const { limit, offset } = req.query
    try {
      const users = await this.findAll.execute(Number(limit), Number(offset))
      if (users) {
        const usersDtos = this.userMapper.userWPaginationToDtoList(users)
        res.status(200).json(usersDtos)
      } else {
        throw new BoomError({
          message: 'No users found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async findUserByMail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params
    try {
      const user = await this.findUserByEmail.execute(email)
      if (user) {
        const userToDto = this.userMapper.userToDto(user)
        res.status(200).json(userToDto)
      } else {
        throw new BoomError({
          message: 'No users found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      if (!validateUUID(id)) {
        throw new BoomError({
          message: `Invalid UUID format`,
          type: ErrorType.BAD_REQUEST,
          statusCode: 400
        });
      }

      const user = await this.findUserById.execute(id)
      if (user) {
        const userToDto = this.userMapper.userToDto(user)
        res.status(200).json(userToDto)
      } else {
        throw new BoomError({
          message: 'No users found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async findAllUsersNoPassword(req: Request, res: Response, next: NextFunction) {
    const { limit, offset } = req.query
    try {
      const users = await this.findAllNoPassword.execute(Number(limit), Number(offset))
      if (users) {
        res.status(200).json(users)
      } else {
        throw new BoomError({
          message: 'No users found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async findUserByMailNoPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params
      try {
        const user = await this.findUserByEmailNoPassword.execute(email)
        if (user) {
          res.status(200).json(user)
        } else {
          throw new BoomError({
            message: 'No users found',
            type: ErrorType.NOT_FOUND,
            statusCode: 404
          });
        }
      } catch (error) {
        next(error)
    }
  }

  async getUserByIdNoPassword(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      if (!validateUUID(id)) {
        throw new BoomError({
          message: `Invalid UUID format`,
          type: ErrorType.BAD_REQUEST,
          statusCode: 400
        });
      }

      const user = await this.findUserByIdNoPassword.execute(id)
      if (user) {
        res.status(200).json(user)
      } else {
        throw new BoomError({
          message: 'No users found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async changeUserPassword(req: Request, res: Response, next: NextFunction) {
    const { token, userId } = req.query
    const body = req.body
    try {
      if (!token || !userId) {
        throw new BoomError({
          message: 'No token or user granted',
          type: ErrorType.BAD_REQUEST,
          statusCode: 404
        });
      }
      const changePass = await this.changePassword.execute(body.password, token.toString(), userId.toString())
      if (changePass) {
        res.status(200).json('Password changed')
      } else {
        throw new BoomError({
          message: 'No users found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async userDelete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const isUserDeleted = await this.deleteUser.execute(id);
      if (isUserDeleted) {
        res.status(204).json('User deleted')
      } else {
        throw new BoomError({
          message: 'Failed to delete user',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    } catch (error) {
      next(error)
    }
  }
}
