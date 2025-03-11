import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserModel } from "../database/models/UserModel";
import { IUser } from "../../domain/interfaces/user/IUser";
import { plainToInstance } from "class-transformer";

@injectable()
export default class UserRepository implements IUserRepository {

  // Post - User creation

  async createUser(user: IUser): Promise<boolean> {
    try {
      const userModel = plainToInstance(UserModel, user)
      const newUser = await UserModel.create(userModel);
      return newUser ? true : false
    } catch (error) {
      throw new Error(`Error creating user in repository: ${error}`)
    }
  }

  // Get - Find user
  async findById(id: string): Promise<UserModel | null> {
    try {
      const user = await UserModel.findByPk(id)
      if(!user) {
        return null
      }
      return user
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }


  async findByEmail(email: string): Promise<UserModel | null> {
    try {
      const user = await UserModel.findOne({ where: { email } })
      if (!user) {
        return null
      }
      return user
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }

  async findAll(): Promise<UserModel[] | null> {
    try {
      const users = await UserModel.findAll();

      if (!users || users.length === 0) {
        return null
      }

      return users
    } catch (error) {
      throw new Error(`Error finding users: ${error}`)
    }
  }

  // Patch - Update user
  async changePassword(password: string, email: string): Promise<UserModel | null> {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        user.update(
          {password: password},
          {where: { email }}
        )
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
