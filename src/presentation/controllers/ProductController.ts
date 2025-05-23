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
import Product from "../../domain/entities/Products";
import UserJwtPayload from "../../infraestructure/dtos/users/UserJwtPayloadDTO";
import IFindAllRandomized from "../../app/interfaces/products/get/IFindAllRandomized";
import ProductDTO from "../../infraestructure/dtos/product/ProductDTO";
import IUpdatePhotos from "../../app/interfaces/products/patch/IUpdatePhotos";
import IDeleteProductPhoto from "../../app/interfaces/products/delete/IDeleteProductPhoto";
import { OrderType } from "../../domain/interfaces/OrderType";

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
    @inject(PRODUCT_TYPES.IProductMapper) private productMapper: IProductMapper,
    @inject(PRODUCT_TYPES.IFindAllRandomized) private findAllRandomized: IFindAllRandomized,
    @inject(PRODUCT_TYPES.IUpdatePhotos) private updatePhotos: IUpdatePhotos,
    @inject(PRODUCT_TYPES.IDeleteProductPhoto) private deleteProductPhoto: IDeleteProductPhoto
  ) {}

  async updatePhotoController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const product = req.body

    try {
      const update = await this.updatePhotos.execute(product.id, product.photos)
      if(!update) {
        res.status(500).json('Failed to update photos')
      }

      res.status(200).json(update)
    } catch (error) {
      next(error)
    }
  }

  async findAllRandomizedController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { limit, offset, maxPrice, minPrice, categoryId, nameOrder, priceOrder, createdAt } = req.query;

    try {
      const findRandomized = await this.findAllRandomized.execute(
        Number(limit),
        Number(offset),
        Number(maxPrice),
        Number(minPrice),
        false,
        categoryId as string,
        nameOrder as OrderType,
        priceOrder as OrderType,
        createdAt as OrderType
      )
      if (findRandomized) {
        res.status(200).json(findRandomized);
      } else {
        throw new BoomError({
          message: 'Products not found',
          type: ErrorType.NOT_FOUND,
          statusCode: 404
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async createProductController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userData = req.user as UserJwtPayload
    const files = req.files as Express.Multer.File[];

    const productDataParsed = {
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock, 10),
      sku: req.body.sku,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      weight: parseFloat(req.body.weight),
      categoryId: req.body.categoryId,
      isPaused: req.body.isPaused === "true",
      material: (() => {
          return typeof req.body.material === "string" ? JSON.parse(req.body.material) : req.body.material;
      })()
    } as ProductDTO
    try {
      if (!files || files.length === 0) {
        res.status(400).json({ message: 'File not uploaded' });
      }
      const createdProduct = await this.createProduct.execute(productDataParsed, userData.id, files);
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
    const files = req.files as Express.Multer.File[];

    const productDataParsed = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price ? parseFloat(req.body.price) : undefined,
      stock: req.body.stock ? parseInt(req.body.stock, 10) : undefined,
      sku: req.body.sku,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      weight: req.body.weight ? parseFloat(req.body.weight) : undefined,
      categoryId: req.body.categoryId,
      isPaused: req.body.isPaused === "true",
      material: (() => {
          return typeof req.body.material === "string" ? JSON.parse(req.body.material) : req.body.material;
      })()
    } as ProductDTO

    try {
      const updatedProduct = await this.updateProduct.execute(id, productDataParsed, files);
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
    const { limit, offset, maxPrice, minPrice, categoryId, createdAt, nameOrder, priceOrder } = req.query;
    const { id } = req.params;
    const user = req.user as UserJwtPayload | undefined;

    try {
      const showPaused = user?.id === id;

      const products = await this.findAllProductsByUser.execute(
        id,
        Number(limit),
        Number(offset),
        Number(maxPrice) || 999999999,
        Number(minPrice) || 0,
        showPaused || false,
        categoryId as string,
        createdAt as OrderType,
        nameOrder as OrderType,
        priceOrder as OrderType
      );
      if (products) {
        res.status(200).json(products);
      } else {
        throw new BoomError({
          message: 'Products not found',
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
    const { limit, offset, maxPrice, minPrice, categoryId, nameOrder, priceOrder, createdAt } = req.query
    try {
      const product = await this.findProductByName.execute(
        name,
        Number(limit),
        Number(offset),
        Number(maxPrice),
        Number(minPrice),
        categoryId as string,
        nameOrder as OrderType,
        priceOrder as OrderType,
        createdAt as OrderType
      );
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
    const { limit, offset, maxPrice, minPrice, nameOrder, priceOrder, createdAt } = req.query
    try {
      const products = await this.findAllProductByCategory.execute(
        id,
        Number(limit),
        Number(offset),
        Number(maxPrice),
        Number(minPrice),
        nameOrder as OrderType,
        priceOrder as OrderType,
        createdAt as OrderType
      );
      if (products && products.data.length > 0) {
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
    const { ids } = req.body;
    try {
      const toggledProducts = await this.toggleProductPause.execute(ids);
      if (toggledProducts.length > 0) {
        res.status(200).json(toggledProducts);
      } else {
        throw new BoomError({
          message: 'Failed to toggle product statuses',
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
    const { stock } = req.body;
    try {
      const updatedStock = await this.updateStock.execute(id, stock);
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
    const { ids } = req.body as { ids: string[] };
    const user = req.user as UserJwtPayload;
    try {
      const isDeleted = await this.deleteProduct.execute(user.id, ids);
      if (isDeleted) {
        res.status(204).json('Products deleted');
      } else {
        throw new BoomError({
          message: 'Failed to delete products',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteProductPhotoController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { productId, photoId } = req.params;
    const user = req.user as UserJwtPayload;

    try {
      await this.deleteProductPhoto.execute(user.id, `${productId}/${photoId}`);
      res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
