import { plainToInstance } from "class-transformer";
import ProductModel from "../database/models/ProductsModel";
import ProductDTO from "../dtos/ProductDTO";
import { IProduct } from "../../domain/interfaces/products/IProducts";
import ProductWithUserAndCategoryDTO from "../dtos/ProductWithUserAndCategoryDTO";
import UserNoPasswordDTO from "../dtos/UserNoPasswordDTO";
import IProductWithUserAndCategory from "../../domain/interfaces/user/IProductWithUserAndCategory";
import IProductMapper from "./interfaces/IProductMapper";
import Product from "../../domain/entities/Products";

export default class ProductMapper implements IProductMapper {

  partialProductDtoToProduct(partialProductDto: Partial<ProductDTO>): Partial<Product> {
    return plainToInstance(Product, partialProductDto);
  }

  productToDTO(product: Product): ProductDTO {
    return plainToInstance(ProductDTO, product);
  }

  productToDTOList(product: Product[]): ProductDTO[] {
    return product.map(product => this.productToDTO(product))
  }

  dtoToProduct(product: ProductDTO): Product {
    return plainToInstance(Product, product);
  }

  dtoToProductList(product: ProductDTO[]): Product[] {
    return product.map(product => this.dtoToProduct(product))
  }

  productToModel(product: Product): ProductModel {
    return plainToInstance(ProductModel, product);
  }

  productToModelList(product: Product[]): ProductModel[] {
    return product.map(product => this.productToModel(product))
  }

  modelToProduct(model: ProductModel): Product {
    return plainToInstance(Product, model);
  }

  modelToProductList(model: ProductModel[]): Product[] {
    return model.map(model => this.modelToProduct(model))
  }

  productModeltoDTO(productModel: ProductModel): ProductDTO {
    return plainToInstance(ProductDTO, productModel);
  }

  productModeltoDTOList(productModels: ProductModel[]): ProductDTO[] {
    return productModels.map(product => this.productModeltoDTO(product.dataValues))
  }

  productDtoToModel(productDto: ProductDTO): ProductModel {
    return plainToInstance(ProductModel, productDto)
  }

  productDtoToModelList(productDtos: ProductDTO[]): ProductModel[] {
    return productDtos.map(product => this.productDtoToModel(product))
  }

  iProductDtoToModel(iProduct: IProduct): ProductModel {
    return plainToInstance(ProductModel, iProduct)
  }

  iProductDtoToModelList(iProduct: IProduct[]): ProductModel[] {
    return iProduct.map(product => this.iProductDtoToModel(product))
  }

  partialProductDtoToModel(partialProductDto: Partial<ProductDTO>): Partial<ProductModel> {
    return plainToInstance(ProductModel, partialProductDto);
  }

  partialProductModelToDto(partialProductModel: Partial<ProductModel>): Partial<ProductDTO> {
    return plainToInstance(ProductDTO, partialProductModel);
  }

  iProductWithUserAndCategoryToProductWithUserAndCategoryDTO(product: IProductWithUserAndCategory): ProductWithUserAndCategoryDTO {
    return plainToInstance(ProductWithUserAndCategoryDTO, {
      ...product,
      user: product.user ? plainToInstance(UserNoPasswordDTO, product.user.get({ plain: true })) : null,
      categories: product.categories ? product.categories.dataValues : null
    });
}

  iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(product: IProductWithUserAndCategory[]): ProductWithUserAndCategoryDTO[] {
    return product.map(product => this.iProductWithUserAndCategoryToProductWithUserAndCategoryDTO(product.dataValues))
  }
}
