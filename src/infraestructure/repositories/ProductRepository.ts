import { id } from "inversify";
import IProductRepository from "../../domain/repositories/IProductRepository";
import ProductModel from "../database/models/ProductsModel";
import { Op, where } from "sequelize";
import IProductWithUserAndCategory from "../../domain/interfaces/user/IProductWithUserAndCategory";
import UserModel from "../database/models/UserModel";
import CategoriesModel from "../database/models/CategoriesModel";

export default class ProductRepository implements IProductRepository {
  async createProduct(product: ProductModel): Promise<boolean> {
    try {
      const newProduct = await ProductModel.create(product.dataValues)
      if (newProduct) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error('Failed to create product')
    }
  }
  async findById(id: string): Promise<IProductWithUserAndCategory | null> {
    try {
      const product = await ProductModel.findByPk(id, { include: ['users', 'categories'] });
      if (product) {
        return product.dataValues
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)

    }
  }

  async findByIdInSystem(id: string): Promise<ProductModel | null> {
    try {
      const product = await ProductModel.findByPk(id);
      if (product) {
        return product
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)

    }
  }


  async findByName(name: string): Promise<IProductWithUserAndCategory[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        include: ['users', 'categories']
      })
      if (products.length > 0) {
        return products
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAllByUserId(userId: string): Promise<IProductWithUserAndCategory[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          userId: userId
        },
        include: [
          { model: UserModel, as: 'user' },
          { model: CategoriesModel, as: 'categories' }
        ]
      })
      if (products.length > 0) {
        return products
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAllByCategory(categoryId: string): Promise<ProductModel[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          categoryId: categoryId
        },
        include: ['users', 'categories']
      })
      if (products.length > 0) {
        return products
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async updateProduct(productId: string, productData: Partial<Omit<ProductModel, "id">>): Promise<ProductModel | null> {
    try {
      const product = await this.findByIdInSystem(productId);

      if (!product) return null;

      const productUpdate = await product.update(productData instanceof ProductModel ? productData.dataValues : productData);

      return productUpdate.dataValues;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const product = await this.findByIdInSystem(id)
      if (product) {
        await product.destroy()
        return true
      } else {
        return false
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async updateStock(id: string, stock: number): Promise<ProductModel | null> {
    try {
      const product = await this.findByIdInSystem(id);
      if (!product) {
        return null
      }

      product.update({
        stock: stock
      })

      return product
    } catch (error: any) {
      throw new Error(error)
    }
  }

 async  toggleProductPause(id: string, status: boolean): Promise<ProductModel | null> {
    try {
      const product = await this.findByIdInSystem(id);
      if (!product) {
        return null
      }
      product.update({
        isPaused: !status
      })

      return product
    } catch (error: any) {
      throw new Error(error)
    }
  }
}