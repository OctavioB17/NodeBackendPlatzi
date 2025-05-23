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
import { OrderType } from "../../domain/interfaces/OrderType";

@injectable()
export default class ProductRepository implements IProductRepository {

  private productMapper: IProductMapper;

  constructor(@inject(PRODUCT_TYPES.IProductMapper) productMapper: IProductMapper) {
    this.productMapper = productMapper
  }

  private getOrderClause(orderType?: string): any[] {
    switch (orderType) {
      case OrderType.PRICE_ASC:
        return [['price', 'ASC']];
      case OrderType.PRICE_DESC:
        return [['price', 'DESC']];
      case OrderType.NEWEST:
        return [['createdAt', 'DESC']];
      case OrderType.OLDEST:
        return [['createdAt', 'ASC']];
      case OrderType.ALPHABETICAL_ASC:
        return [['name', 'ASC']];
      case OrderType.ALPHABETICAL_DESC:
        return [['name', 'DESC']];
      default:
        return [['createdAt', 'DESC']];
    }
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
    } catch (error: any) {
      throw new Error('Failed to create product:', error)
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


  async findByName(name: string, limit: number, offset: number, maxPrice?: number, minPrice?: number, categoryId?: string, nameOrder?: string, priceOrder?: string, createdAt?: string): Promise<ProductWithUserAndCategoryDTO[] | null> {
    try {
      const whereClause: any = {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        price: {
          [Op.between]: [minPrice || 0, maxPrice || 999999999]
        }
      };

      if (categoryId) {
        whereClause.categoryId = categoryId;
      }

      const orderClause = this.getOrderClause(nameOrder || createdAt || priceOrder);

      const products = await ProductModel.findAll({
        where: whereClause,
        include: [
          { model: UserModel, as: 'user' },
          { model: CategoriesModel, as: 'categories' }
        ],
        limit,
        offset,
        order: orderClause
      });

      if (!products || products.length === 0) {
        return null;
      }

      return this.productMapper.iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(products);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAllByUserId(userId: string, limit: number, offset: number, maxPrice: number, minPrice: number, showPaused: boolean, categoryId?: string, createdAt?: string, nameOrder?: string, priceOrder?: string): Promise<ProductWithUserAndCategoryDTO[]> {
    const whereClause: any = {
      userId,
      price: {
        [Op.between]: [minPrice, maxPrice]
      }
    };

    if (!showPaused) {
      whereClause.isPaused = false;
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const orderClause = this.getOrderClause(nameOrder || createdAt || priceOrder);

    const products = await ProductModel.findAll({
      where: whereClause,
      limit,
      offset,
      order: orderClause,
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: { exclude: ['password'] }
        },
        {
          model: CategoriesModel,
          as: 'categories',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    });

    if (!products || products.length === 0) {
      return [];
    }

    return this.productMapper.iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(products);
  }

  async findAllRandomized(limit: number, offset: number, maxPrice: number, minPrice: number, showPaused: boolean = false, categoryId?: string, nameOrder?: string, priceOrder?: string, createdAt?: string): Promise<Product[] | null> {
    try {
      const whereClause: any = {
        price: {
          [Op.between]: [minPrice, maxPrice]
        }
      };

      if (!showPaused) {
        whereClause.isPaused = false;
      }

      if (categoryId) {
        whereClause.categoryId = categoryId;
      }

      const orderClause = nameOrder || createdAt || priceOrder
        ? this.getOrderClause(nameOrder || createdAt || priceOrder)
        : Sequelize.literal('RANDOM()');

      const products = await ProductModel.findAll({
        where: whereClause,
        limit,
        offset,
        order: orderClause
      });

      if (!products || products.length === 0) {
        return null;
      }

      const modelDatavalues = products.map(product => product.dataValues);
      return this.productMapper.modelToProductList(modelDatavalues);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAllByCategory(categoryId: string, limit: number, offset: number, maxPrice: number, minPrice: number, nameOrder?: string, priceOrder?: string, createdAt?: string): Promise<ProductWithUserAndCategoryDTO[] | null> {
    try {
      const whereClause: any = {
        categoryId,
        price: {
          [Op.between]: [minPrice, maxPrice]
        }
      };

      const orderClause = this.getOrderClause(nameOrder || createdAt || priceOrder);

      const products = await ProductModel.findAll({
        where: whereClause,
        include: [
          { model: UserModel, as: 'user' },
          { model: CategoriesModel, as: 'categories' }
        ],
        limit,
        offset,
        order: orderClause
      });

      if (!products || products.length === 0) {
        return null;
      }

      return this.productMapper.iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(products);
    } catch (error: any) {
      throw new Error(error);
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
