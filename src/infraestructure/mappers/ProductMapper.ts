import { plainToInstance } from "class-transformer";
import ProductModel from "../database/models/ProductsModel";
import ProductDTO from "../dtos/ProductDTO";
import { IProduct } from "../../domain/interfaces/products/IProducts";
import ProductWithUserAndCategoryDTO from "../dtos/ProductWithUserAndCategoryDTO";
import UserNoPasswordDTO from "../dtos/UserNoPasswordDTO";
import IProductWithUserAndCategory from "../../domain/interfaces/user/IProductWithUserAndCategory";

export default class ProductMapper {
  static productModeltoDTO(productModel: ProductModel): ProductDTO {
    return plainToInstance(ProductDTO, productModel);
  }

  static productModeltoDTOList(productModels: ProductModel[]): ProductDTO[] {
    return productModels.map(product => this.productModeltoDTO(product.dataValues))
  }

  static productDtoToModel(productDto: ProductDTO): ProductModel {
    return plainToInstance(ProductModel, productDto)
  }

  static productDtoToModelList(productDtos: ProductDTO[]): ProductModel[] {
    return productDtos.map(product => this.productDtoToModel(product))
  }

  static iProductDtoToModel(iProduct: IProduct): ProductModel {
    return plainToInstance(ProductModel, iProduct)
  }

  static iProductDtoToModelList(iProduct: IProduct[]): ProductModel[] {
    return iProduct.map(product => this.iProductDtoToModel(product))
  }

  static partialProductDtoToModel(partialProductDto: Partial<ProductDTO>): Partial<ProductModel> {
    return plainToInstance(ProductModel, partialProductDto);
  }

  static partialProductModelToDto(partialProductModel: Partial<ProductModel>): Partial<ProductDTO> {
    return plainToInstance(ProductDTO, partialProductModel);
  }

  static iProductWithUserAndCategoryToProductWithUserAndCategoryDTO(product: IProductWithUserAndCategory): ProductWithUserAndCategoryDTO {
    return plainToInstance(ProductWithUserAndCategoryDTO, {
      ...product,
      user: product.user ? plainToInstance(UserNoPasswordDTO, product.user.get({ plain: true })) : null,
    });
  }

      static iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(product: IProductWithUserAndCategory[]): ProductWithUserAndCategoryDTO[] {
        return product.map(product => this.iProductWithUserAndCategoryToProductWithUserAndCategoryDTO(product.dataValues))
      }
}
