import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserModel } from "../database/models/UserModel";
import { userMapper } from "../mappers/UserMapper";
import { IUserModel } from "../../domain/interfaces/user/IUserModel";
import { IUser } from "../../domain/interfaces/user/IUser";

@injectable()
export default class UserRepository implements IUserRepository {

  async createUser(user: IUser): Promise<IUser> {
    try {
      const newUser = await UserModel.create(userMapper.map(user, {} as IUserModel))
      return userMapper.map(newUser, {} as IUser)
    } catch (error) {
      throw new Error(`Error creating user in repository: ${error}`)
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = UserModel.findOne({ where: { email } })
      return user ? userMapper.map(user, {} as IUser) : null
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }

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
