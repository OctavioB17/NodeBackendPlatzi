import { inject, injectable } from "inversify";
import IDeleteCategory from "../../../interfaces/categories/delete/IDeleteCategory";
import { AWS_TYPES, CATEGORY_TYPES, PRODUCT_TYPES } from "../../../../types";
import { ICategoriesRepository } from "../../../../domain/repositories/ICategoryRepository";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IFindAllProductByCategory from "../../../interfaces/products/get/IFindAllProductByCategory";
import IDeleteProduct from "../../../interfaces/products/delete/IDeleteProduct";
import IDeleteFolderInS3 from "../../../interfaces/aws/IDeleteFolderInS3";

@injectable()
export default class DeleteCategory implements IDeleteCategory {
  constructor(
    @inject(CATEGORY_TYPES.ICategoriesRepository) private categoryRepository: ICategoriesRepository,
    @inject(PRODUCT_TYPES.IFindAllProductByCategory) private findProductBycategory: IFindAllProductByCategory,
    @inject(PRODUCT_TYPES.IDeleteProduct) private deleteProduct: IDeleteProduct,
    @inject(AWS_TYPES.IDeleteFolderInS3) private deleteFolderInS3: IDeleteFolderInS3
  ) {}

  async execute(categoryId: string): Promise<boolean | null> {
    try {
      const products = await this.findProductBycategory.execute(categoryId, 1000, 0, Number.MAX_VALUE, 0);
      if (products && products.data && products.data.length > 0) {
        for (const product of products.data) {
          console.log(product.id)
          await this.deleteProduct.execute(product.userId, product.id);
        }
      }

      await this.deleteFolderInS3.execute(categoryId)

      const deleteCategory = await this.categoryRepository.deleteCategory(categoryId);
      if (!deleteCategory) {
        throw new BoomError({
          message: `Categories not found or unable to delete`,
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }

      return deleteCategory
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: `Error creating category`,
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      });
    }
  }
}
