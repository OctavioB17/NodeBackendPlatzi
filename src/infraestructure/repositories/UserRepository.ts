import { inject, injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUsersRepository";
import UserModel from "../database/models/UserModel";
import IUserMapper from "../mappers/interfaces/IUserMapper";
import { USER_TYPES } from "../../types";
import User from "../../domain/entities/Users";
import { UserRolesEnum } from "../../domain/interfaces/user/UserRoles";

@injectable()
export default class UserRepository implements IUserRepository {

  private userMapper: IUserMapper

  constructor(@inject(USER_TYPES.IUserMapper) userMapper: IUserMapper) {
    this.userMapper = userMapper
  }
  // Post - User creation

  async createUser(user: User): Promise<boolean> {
    try {
      const userToModel = this.userMapper.userToModel(user)
      const newUser = await UserModel.create(userToModel.dataValues);
      return newUser ? true : false
    } catch (error) {
      throw new Error(`Error creating user in repository: ${error}`)
    }
  }

  // Get - Find user
  async findById(id: string): Promise<User | null> {
    try {
      const userModel = await UserModel.findByPk(id)
      if(!userModel) {
        return null
      }
      const user = this.userMapper.modelToUser(userModel.dataValues);
      return user
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }


  async findByEmail(email: string): Promise<User | null> {
    try {
      const userModel = await UserModel.findOne({ where: { email } });
      if (!userModel) {
        return null;
      } else {
        const user = this.userMapper.modelToUser(userModel.dataValues);
        return user
      }
    } catch (error) {
      throw new Error(`Error finding user: ${error}`);
    }
  }

  async findAll(limit: number, offset: number): Promise<User[] | null> {
    try {
      const usersModels = await UserModel.findAll({ limit: limit, offset: offset });
      if (!usersModels || usersModels.length === 0) {
        return null
      }
      const users = this.userMapper.modelToUserList(usersModels.map(user => user.dataValues));
      return users
    } catch (error) {
      throw new Error(`Error finding users: ${error}`)
    }
  }

  async findByIdSystem(id: string): Promise<UserModel | null> {
    try {
      const user = await UserModel.findByPk(id)
      if (!user) {
        throw new Error('User not found')
      }

      return user
    } catch (error) {
      throw new Error('Failed to find user')
    }
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const user = await UserModel.findOne({ where: { id: userId } });
    return user ? user.refreshToken : null;
  }


  // Patch - Update user
  async changePassword(newPassword: string, id: string): Promise<User | null> {
    try {
      const userModel = await this.findByIdSystem(id)
      if (userModel) {
        userModel.update(
          {password: newPassword},
        )
        const user = this.userMapper.modelToUser(userModel);
        return user
      } else {
        throw new Error("User not found")
      }
    } catch (error) {
      throw new Error(`Error changing password: ${error}`)
    }
  }


  async markUserAsAuthorized(id: string): Promise<User> {
    try {
      const user = await this.findByIdSystem(id)
      if (!user) {
        throw new Error('User not found')
      }

      const update = await user.update({
        authorized: true
      })

      return this.userMapper.modelToUser(update.dataValues)
    } catch (error) {
      throw new Error('Failed to authorize')
    }
  }

  async changeUserRole(id: string, newRole: keyof typeof UserRolesEnum): Promise<User> {
    try {
      const user = await this.findByIdSystem(id);

      if (!user) {
        throw new Error('User not found')
      }

      const userUpdate = await user.update({
        role: newRole
      })

      return this.userMapper.modelToUser(userUpdate.dataValues)
    } catch (error) {
      throw new Error('Failed to change role')
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await UserModel.update({ refreshToken }, { where: { id: userId } });
  }

  // Delete - Delete user
  async deleteUser(id: string): Promise<boolean> {
    try {
      const user = await UserModel.findByPk(id)
      if (user) {
        await user.destroy()
        return true
      }
      return false
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`)
    }
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await UserModel.update({ refreshToken: null }, { where: { id: userId } });
  }
}
