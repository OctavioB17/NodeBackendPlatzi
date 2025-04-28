import IProductRepository from "../../domain/repositories/IProductsRepository";
import ProductModel from "../database/models/ProductsModel";
import { Op, Sequelize } from "sequelize";
import UserModel from "../database/models/UserModel";
import CategoriesModel from "../database/models/CategoriesModel";
import { PRODUCT_TYPES } from "../../types";
import IProductMapper from "../mappers/interfaces/IProductMapper";
import { inject, injectable } from "inversify";
import Product from "../../domain/entities/Products";
import ProductWithUserAndCategoryDTO from "../dtos/product/ProductWithUserAndCategoryDTO";

@injectable()
export default class ProductRepository implements IProductRepository {

  private productMapper: IProductMapper;

  constructor(@inject(PRODUCT_TYPES.IProductMapper) productMapper: IProductMapper) {
    this.productMapper = productMapper
  }


  async createProduct(product: Product): Promise<boolean> {
    try {
      const dtoToModel = this.productMapper.productToModel(product)
      const newProduct = await ProductModel.create(dtoToModel.dataValues)
      if (newProduct) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      throw new Error('Failed to create product')
    }
  }

  async findById(id: string): Promise<ProductWithUserAndCategoryDTO | null> {
      const productModel = await ProductModel.findByPk(id, {
        include: [
          { model: UserModel, as: 'user' },
          { model: CategoriesModel, as: 'categories' }
        ]
      });
      if (!productModel) {
        throw new Error(`Product with ID ${id} not found`);
      }
      const productWitUser = this.productMapper.iProductWithUserAndCategoryToProductWithUserAndCategoryDTO(productModel.dataValues)
      if (productWitUser) {
        return productWitUser
      } else {
        return null
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


  async findByName(name: string, limit: number, offset: number, maxPrice?: number, minPrice?: number): Promise<ProductWithUserAndCategoryDTO[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
          price: {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice
          }
        },
        include: [
          { model: UserModel, as: 'user' },
          { model: CategoriesModel, as: 'categories' }
        ],
        limit: limit,
        offset: offset
      })
      if (products && products.length > 0) {
        const productWithUserAndCategoryDTO = this.productMapper.iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(products)
        return productWithUserAndCategoryDTO
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAllByUserId(userId: string, limit: number, offset: number, maxPrice: number, minPrice: number): Promise<ProductWithUserAndCategoryDTO[] | null> {
    try {
      const products = await ProductModel.findAll({
        where: {
          userId: userId,
          price: {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice
          }
        },
        include: [
          { model: UserModel, as: 'user' },
          { model: CategoriesModel, as: 'categories' }
        ],
        limit: limit,
        offset: offset
      })
      if (products && products.length > 0) {
        const productWithUserAndCategoryDTO = this.productMapper.iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(products)
        return productWithUserAndCategoryDTO
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findAllRandomized(limit: number, offset: number, maxPrice: number, minPrice: number): Promise<Product[] | null> {
    try {
      const products: ProductModel[] = await ProductModel.findAll({
        where: {
          price: {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice
          }
        },
        order: Sequelize.literal('RANDOM()'),
        limit: limit,
        offset: offset
      });

      if (products.length > 0) {
        const modelDatavalues = products.map(product => product.dataValues)
        return this.productMapper.modelToProductList(modelDatavalues);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAllByCategory(categoryId: string, limit: number, offset: number, maxPrice: number, minPrice: number): Promise<ProductWithUserAndCategoryDTO[] | null> {
    try {

      const products = await ProductModel.findAll({
        where: {
          categoryId: categoryId,
          price: {
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice
          }
        },
        include: [
          { model: UserModel, as: 'user' },
          { model: CategoriesModel, as: 'categories' }
        ],
        limit: limit,
        offset: offset
      })
      if (products.length > 0) {
        const productWithUserAndCategoryDTO = this.productMapper.iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(products)
        return productWithUserAndCategoryDTO
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async updateProduct(productId: string, productData: Partial<Omit<Product, "id">>): Promise<Product | null> {
    try {
      const product = await this.findByIdInSystem(productId);
      if (!product) return null;
      const productModel = this.productMapper.productToModel(productData as Product)
      const productUpdate = await product.update(productModel.dataValues);
      const modelToProduct = this.productMapper.modelToProduct(productUpdate.dataValues)
      return modelToProduct;
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

  async updatePhotos(id: string, photos: string[]): Promise<Product | null> {
      try {
        const product = await this.findByIdInSystem(id)
        if (!product) {
          return null
        }

        const update = await product.update({
          imageGallery: photos
        })

        return this.productMapper.modelToProduct(update.dataValues)
      } catch (error) {
        return null
      }
  }

  async updateStock(id: string, stock: number): Promise<Product | null> {
    try {
      const product = await this.findByIdInSystem(id);
      if (!product) {
        return null
      }

      product.update({
        stock: stock
      })
      const productEntity = this.productMapper.modelToProduct(product)
      return productEntity
    } catch (error: any) {
      throw new Error(error)
    }
  }

 async  toggleProductPause(id: string): Promise<Product | null> {
    try {
      const product = await this.findByIdInSystem(id);
      if (!product) {
        return null
      }
      product.update({
        isPaused: !product.dataValues.isPaused
      })
      const productEntity = this.productMapper.modelToProduct(product)
      return productEntity
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
