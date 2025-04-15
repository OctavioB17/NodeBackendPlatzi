import Product from "../../../domain/entities/Products"
import { IProduct } from "../../../domain/interfaces/products/IProducts"
import { ProductWithJoin } from "../../../domain/interfaces/products/IProductWithQuantityDTO"
import IProductWithUserAndCategory from "../../../domain/interfaces/products/IProductWithUserAndCategory"
import ProductModel from "../../database/models/ProductsModel"
import ProductDTO from "../../dtos/product/ProductDTO"
import { ProductWithQuantityDTO } from "../../dtos/product/ProductWithQuantityDTO"
import ProductWithUserAndCategoryDTO from "../../dtos/product/ProductWithUserAndCategoryDTO"

export default interface IProductMapper {

  modelToProductWithQuantity(model: ProductWithJoin): ProductWithQuantityDTO;

  productModeltoDTO(productModel: ProductModel): ProductDTO

  productModeltoDTOList(productModels: ProductModel[]): ProductDTO[]

  productDtoToModel(productDto: ProductDTO): ProductModel

  dtoToProduct(productDto: ProductDTO): Product

  productToDTO(product: Product): ProductDTO

  productToDTOList(product: Product[]): ProductDTO[]

  dtoToProduct(product: ProductDTO): Product

  dtoToProductList(product: ProductDTO[]): Product[]

  productToModel(product: Product): ProductModel

  productToModelList(product: Product[]): ProductModel[]

  modelToProduct(model: ProductModel): Product

  modelToProductList(model: ProductModel[]): Product[]

  productDtoToModelList(productDtos: ProductDTO[]): ProductModel[]

  iProductDtoToModel(iProduct: IProduct): ProductModel

  iProductDtoToModelList(iProduct: IProduct[]): ProductModel[]

  partialProductDtoToModel(partialProductDto: Partial<ProductDTO>): Partial<ProductModel>

  partialProductModelToDto(partialProductModel: Partial<ProductModel>): Partial<ProductDTO>

  partialProductDtoToProduct(partialProductDto: Partial<ProductDTO>): Partial<Product>

  iProductWithUserAndCategoryToProductWithUserAndCategoryDTO(product: IProductWithUserAndCategory): ProductWithUserAndCategoryDTO

  iProductWithUserAndCategoryToProductWithUserAndCategoryDTOList(product: IProductWithUserAndCategory[]): ProductWithUserAndCategoryDTO[]
}
