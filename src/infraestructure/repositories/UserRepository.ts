import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserModel } from "../database/models/UserModel";
import { userMapper } from "../mappers/UserMapper";
import { IUserModel } from "../../domain/interfaces/user/IUserModel";
import { IUser } from "../../domain/interfaces/user/IUser";
import { UserNoPasswordDTO } from "../../app/dtos/UserDTO";

@injectable()
export default class UserRepository implements IUserRepository {

  // Post - User creation

  async createUser(user: IUser): Promise<IUser> {
    try {
      const newUser = await UserModel.create(userMapper.map(user, {} as IUserModel))
      return userMapper.map(newUser, {} as IUser)
    } catch (error) {
      throw new Error(`Error creating user in repository: ${error}`)
    }
  }

  // Get - Find user
  async findById(id: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findByPk(id)
      return user ? userMapper.map(user, {} as IUser) : null
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }


  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ where: { email } })
      return user ? userMapper.map(user, {} as IUser) : null
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }

  async findAll(): Promise<IUser[] | null> {
    try {
      const users = await UserModel.findAll();
      if (users) {
        return userMapper.mapCollection(users, {} as IUser)
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`Error finding users: ${error}`)
    }
  }

  async findByIdNoPassword(id: string): Promise<UserNoPasswordDTO | null> {
    try {
      const user = await UserModel.findByPk(id)
      return user ? userMapper.map(user, {} as UserNoPasswordDTO) : null
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }


  async findByEmailNoPassword(email: string): Promise<UserNoPasswordDTO | null> {
    try {
      const user = await UserModel.findOne({ where: { email } })
      return user ? userMapper.map(user, {} as UserNoPasswordDTO) : null
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }

  async findAllNoPassword(): Promise<UserNoPasswordDTO[] | null> {
    try {
      const users = await UserModel.findAll();
      if (users) {
        return userMapper.mapCollection(users, {} as UserNoPasswordDTO)
      } else {
        return null
      }
    } catch (error) {
      throw new Error(`Error finding users: ${error}`)
    }
  }

  // Patch - Change user
  async changePassword(password: string, email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        user.update(
          {password: password},
          {where: { email }}
        )
        return userMapper.map(user, {} as IUser)
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
