import { inject, injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUsersRepository";
import UserModel from "../database/models/UserModel";
import UserMapper from "../mappers/UserMapper";
import UserDTO from "../dtos/users/UserDTO";
import IUserMapper from "../mappers/interfaces/IUserMapper";
import { USER_TYPES } from "../../types";
import User from "../../domain/entities/Users";

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
      const newUser = await UserModel.create(userToModel);
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

  async findAll(): Promise<User[] | null> {
    try {
      const usersModels = await UserModel.findAll();
      if (!usersModels || usersModels.length === 0) {
        return null
      }
      const users = this.userMapper.modelToUserList(usersModels.map(user => user.dataValues));
      return users
    } catch (error) {
      throw new Error(`Error finding users: ${error}`)
    }
  }

  // Patch - Update user
  async changePassword(password: string, email: string): Promise<User | null> {
    try {
      const userModel = await this.findByEmail(email)
      if (userModel) {
        const userToModel = this.userMapper.userToModel(userModel)
        userToModel.update(
          {password: password},
        )
        const user = this.userMapper.modelToUser(userToModel);
        return user
      } else {
        throw new Error("User not found")
      }
    } catch (error) {
      throw new Error(`Error changing password: ${error}`)
    }
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
}
