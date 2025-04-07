import { Request, Response, NextFunction } from "express";
import IProductController from "./interfaces/IProductController";
import { inject } from "inversify";
import { PRODUCT_TYPES } from "../../types";
import IFindAllProductsByUser from "../../app/interfaces/products/get/IFindAllProductsByUser";
import IFindProductById from "../../app/interfaces/products/get/IFindProductById";
import IFindAllProductByCategory from "../../app/interfaces/products/get/IFindAllProductByCategory";
import IFindProductByName from "../../app/interfaces/products/get/IFindProductByName";
import IToggleProductPause from "../../app/interfaces/products/patch/IToggleProductPause";
import IUpdateProduct from "../../app/interfaces/products/patch/IUpdateProduct";
import IUpdateStock from "../../app/interfaces/products/patch/IUpdateStock";
import { BoomError } from "../../domain/entities/DomainError";
import { ErrorType } from "../../domain/interfaces/Error";
import IDeleteProduct from "../../app/interfaces/products/delete/IDeleteProduct";
import ICreateProduct from "../../app/interfaces/products/post/ICreateProduct";
import IProductMapper from "../../infraestructure/mappers/interfaces/IProductMapper";
import ProductDTO from "../../infraestructure/dtos/ProductDTO";
import Product from "../../domain/entities/Products";

export default class ProductController implements IProductController {

  constructor(
    @inject(PRODUCT_TYPES.IFindAllProductByCategory) private findAllProductByCategory: IFindAllProductByCategory,
    @inject(PRODUCT_TYPES.IFindAllProductsByUser) private findAllProductsByUser: IFindAllProductsByUser,
    @inject(PRODUCT_TYPES.IFindProductById) private findProductById: IFindProductById,
    @inject(PRODUCT_TYPES.IFindProductByName) private findProductByName: IFindProductByName,
    @inject(PRODUCT_TYPES.IToggleProductPause) private toggleProductPause: IToggleProductPause,
    @inject(PRODUCT_TYPES.IUpdateProduct) private updateProduct: IUpdateProduct,
    @inject(PRODUCT_TYPES.IUpdateStock) private updateStock: IUpdateStock,
    @inject(PRODUCT_TYPES.IDeleteProduct) private deleteProduct: IDeleteProduct,
    @inject(PRODUCT_TYPES.ICreateProduct) private createProduct: ICreateProduct,
    @inject(PRODUCT_TYPES.IProductMapper) private productMapper: IProductMapper
  ) {}

  async createProductController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const productData = req.body;
    try {
      const createdProduct = await this.createProduct.execute(productData);
      if (createdProduct) {
        res.status(201).json({ message: 'Product created' });
      } else {
        throw new BoomError({
          message: 'Failed to create product',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateProductController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const productData = req.body;

    try {
      const updatedProduct = await this.updateProduct.execute(id, productData);
      if (updatedProduct) {
        const productDto = this.productMapper.productToDTO(updatedProduct as Product)
        res.status(200).json(productDto);
      } else {
        throw new BoomError({
          message: 'Failed to update product',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async findAllByUserIdController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const products = await this.findAllProductsByUser.execute(id);
      if (products && products.length > 0) {
        res.status(200).json(products);
      } else {
        throw new BoomError({
          message: 'No products found for this user',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async findByIdController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const product = await this.findProductById.execute(id);
      if (product) {
        res.status(200).json(product);
      } else {
        throw new BoomError({
          message: 'Product not found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async findByNameController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name } = req.params;
    try {
      const product = await this.findProductByName.execute(name);
      if (product) {
        res.status(200).json(product);
      } else {
        throw new BoomError({
          message: 'Product not found by name',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async findAllByCategoryController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const products = await this.findAllProductByCategory.execute(id);
      if (products && products.length > 0) {
        res.status(200).json(products);
      } else {
        throw new BoomError({
          message: 'No products found in this category',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async toggleProductPauseController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const isToggled = await this.toggleProductPause.execute(id, status);
      if (isToggled) {
        res.status(200).json('Product status toggled');
      } else {
        throw new BoomError({
          message: 'Failed to toggle product status',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateProductDetailsController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const productData = req.body;
    try {
      const updatedProduct = await this.updateProduct.execute(id, productData);
      if (updatedProduct) {
        const productDto = this.productMapper.productToDTO(updatedProduct as Product)
        res.status(200).json(productDto);
      } else {
        throw new BoomError({
          message: 'Failed to update product',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateStockController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const updatedStock = await this.updateStock.execute(id, quantity);
      if (updatedStock) {
        res.status(200).json('Stock updated');
      } else {
        throw new BoomError({
          message: 'Failed to update stock',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteProductController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const isDeleted = await this.deleteProduct.execute(id);
      if (isDeleted) {
        res.status(204).json('Product deleted');
      } else {
        throw new BoomError({
          message: 'Failed to delete product',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    } catch (error) {
      next(error);
    }
  }
}