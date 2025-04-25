import { inject, injectable } from "inversify";
import { IUserRepository } from "../../../../domain/repositories/IUsersRepository";
import { AWS_TYPES, ORDER_TYPES, PRODUCT_TYPES, USER_TYPES } from "../../../../types";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import { IDeleteUser } from "../../../interfaces/users/delete/IDeleteUser";
import IDeleteOrder from "../../../interfaces/orders/delete/IDeleteOrder";
import IDeleteProduct from "../../../interfaces/products/delete/IDeleteProduct";
import IFindAllProductsByUser from "../../../interfaces/products/get/IFindAllProductsByUser";
import IFindAllOrdersByUserId from "../../../interfaces/orders/get/IFindAllOrdersByUserId";
import { IDeleteUserFolder } from "../../../interfaces/aws/IDeleteUserFolder";

@injectable()
export default class DeleteUser implements IDeleteUser {
  constructor(
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(ORDER_TYPES.IDeleteOrder) private deleteOrder: IDeleteOrder,
    @inject(PRODUCT_TYPES.IDeleteProduct) private deleteProduct: IDeleteProduct,
    @inject(PRODUCT_TYPES.IFindAllProductsByUser) private findAllProductsByUserId: IFindAllProductsByUser,
    @inject(ORDER_TYPES.IFindAllOrdersByUserId) private findAllOrdersByUserId: IFindAllOrdersByUserId,
    @inject(AWS_TYPES.IDeleteUserFolder) private deleteUserFolderUseCase: IDeleteUserFolder
  ) {}

  async execute(id: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new BoomError({
          message: `User ID Not found`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404,
        });
      }

      const products = await this.findAllProductsByUserId.execute(id);
      if (products && products.data.length > 0) {
        for (const product of products.data) {
          await this.deleteProduct.execute(user.getId(), product.id);
        }
      }

      const orders = await this.findAllOrdersByUserId.execute(id);
      if (orders && orders.data.length > 0) {
        for (const order of orders.data) {
          await this.deleteOrder.execute(order.id);
        }
      }

      await this.deleteUserFolderUseCase.execute(id);

      const isUserDeleted = await this.userRepository.deleteUser(id);
      return isUserDeleted;
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }
      throw new BoomError({
        message: `Error deleting user`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500,
      });
    }
  }
}