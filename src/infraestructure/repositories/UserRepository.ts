import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import UserModel from "../database/models/UserModel";
import { IUser } from "../../domain/interfaces/user/IUser";
import { plainToInstance } from "class-transformer";
import UserMapper from "../mappers/UserMapper";
import UserDTO from "../dtos/UserDTO";

@injectable()
export default class UserRepository implements IUserRepository {

  // Post - User creation

  async createUser(user: IUser): Promise<boolean> {
    try {
      const userModel = plainToInstance(UserModel, user)
      const newUser = await UserModel.create(userModel.dataValues);
      return newUser ? true : false
    } catch (error) {
      throw new Error(`Error creating user in repository: ${error}`)
    }
  }

  // Get - Find user
  async findById(id: string): Promise<UserDTO | null> {
    try {
      const user = await UserModel.findByPk(id)
      if(!user) {
        return null
      }
      return UserMapper.userModelToDTO(user);
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }


  async findByEmail(email: string): Promise<UserDTO | null> {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return null;
      } else {
        return UserMapper.userModelToDTO(user.dataValues);
      }
    } catch (error) {
      throw new Error(`Error finding user: ${error}`);
    }
  }

  async findAll(): Promise<UserDTO[] | null> {
    try {
      const users = await UserModel.findAll();

      if (!users || users.length === 0) {
        return null
      }

      return UserMapper.userModelToDTOList(users)
    } catch (error) {
      throw new Error(`Error finding users: ${error}`)
    }
  }

  // Patch - Update user
  async changePassword(password: string, email: string): Promise<UserDTO | null> {
    try {
      const user = await UserModel.findOne({ where: { email } });

      if (user) {
        user.update(
          {password: password},
          {where: { email }}
        )
        return UserMapper.userModelToDTO(user.dataValues);
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
