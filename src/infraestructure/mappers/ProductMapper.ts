import { plainToInstance } from "class-transformer";
import ProductModel from "../database/models/ProductsModel";
import ProductDTO from "../dtos/ProductDTO";
import { IProduct } from "../../domain/interfaces/products/IProducts";

export default class ProductMapper {
  static productModeltoDTO(productModel: ProductModel): ProductDTO {
    return plainToInstance(ProductDTO, productModel);
  }

  static productModeltoDTOList(productModels: ProductModel[]): ProductDTO[] {
    return productModels.map(user => this.productModeltoDTO(user.dataValues))
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

  static iUserDtoToModelList(iProduct: IProduct[]): ProductModel[] {
    return iProduct.map(product => this.iProductDtoToModel(product))
  }

  static partialProductDtoToModel(partialProductDto: Partial<ProductDTO>): Partial<ProductModel> {
    return plainToInstance(ProductModel, partialProductDto);
  }

  static partialProductModelToDto(partialProductModel: Partial<ProductModel>): Partial<ProductDTO> {
    return plainToInstance(ProductDTO, partialProductModel);
  }
}