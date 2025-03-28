import { id } from "inversify";
import IProductRepository from "../../domain/repositories/IProductRepository";
import ProductModel from "../database/models/ProductsModel";
import { Op, where } from "sequelize";

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
  async findById(id: string): Promise<ProductModel | null> {
    try {
      const product = await ProductModel.findByPk(id);
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


  async findByName(name: string): Promise<ProductModel[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
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

  async findAllByUserId(userId: string): Promise<ProductModel[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          userId: userId
        }
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
        }
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