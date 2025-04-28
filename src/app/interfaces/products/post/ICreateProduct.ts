import ProductDTO from "../../../../infraestructure/dtos/product/ProductDTO";

export default interface ICreateProduct {
  execute(productDto: ProductDTO, userId: string, file: Express.Multer.File | Array<Express.Multer.File> ): Promise<boolean | null>
}
