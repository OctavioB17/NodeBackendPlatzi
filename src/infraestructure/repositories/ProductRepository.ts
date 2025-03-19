import { plainToInstance } from "class-transformer";
import { IProduct } from "../../domain/interfaces/products/IProducts";
import IProductRepository from "../../domain/repositories/IProductRepository";
import ProductModel from "../database/models/ProductsModel";
import ProductDTO from "../dtos/ProductDTO";
import ProductMapper from "../mappers/ProductMapper";
import { Op } from "sequelize";

export default class ProductRepository implements IProductRepository {
  async createProduct(product: IProduct): Promise<boolean> {
    try {
      const userModel = ProductMapper.iProductDtoToModel(product)
      const newProduct = await ProductModel.create(userModel)
      if (newProduct) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error('Failed to create product')
    }
  }
  async findById(id: string): Promise<ProductDTO | null> {
    try {
      const product = await ProductModel.findByPk(id);
      if (product) {
        return ProductMapper.productModeltoDTO(product)
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)

    }
  }

  async findByName(name: string): Promise<ProductDTO[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        }
      })
      if (products.length > 0) {
        return ProductMapper.productModeltoDTOList(products)
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAllByUserId(userId: string): Promise<ProductDTO[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          userId: userId
        }
      })
      if (products.length > 0) {
        return ProductMapper.productModeltoDTOList(products)
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async findAllByCategory(categoryId: string): Promise<ProductDTO[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          categoryId: categoryId
        }
      })
      if (products.length > 0) {
        return ProductMapper.productModeltoDTOList(products)
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  updateProduct(product: IProduct): Promise<ProductDTO | null> {
    try {
      const userModel = plainToInstance(ProductModel, product)

    } catch (error) {

    }
  }
  deleteProduct(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateStock(id: string, stock: number): Promise<ProductDTO | null> {
    throw new Error("Method not implemented.");
  }
  toggleProductPause(id: string): Promise<ProductDTO | null> {
    throw new Error("Method not implemented.");
  }

}