
export const UTIL_TYPES = {
  IIdGenerator: Symbol.for('IIdGenerator'),
}

export const USER_TYPES = {
  IUserRepository: Symbol.for('IUserRepository'),
  IUserController: Symbol.for('IUserController'),
  ICreateUser: Symbol.for('ICreateUser'),
  IFindAll: Symbol.for('IFindAll'),
  IFindAllNoPassword: Symbol.for('IFindAllNoPassword'),
  IFindUserByEmail: Symbol.for('IFindUserByEmail'),
  IFindUserByEmailNoPassword: Symbol.for('IFindUserByEmailNoPassword'),
  IFindUserById: Symbol.for('IFindUserById'),
  IFindUserByIdNoPassword: Symbol.for('IFindUserByIdNoPassword'),
  IDeleteUser: Symbol.for('IDeleteUser'),
  IChangePassword: Symbol.for('IChangePassword'),
  IChangeRole: Symbol.for('IChangeRole'),
  IAuthorizeUser: Symbol.for('IAuthorizeUser'),
  IUserMapper: Symbol.for('IUserMapper'),
  ISendPasswordResetRequest: Symbol.for('ISendPasswordResetRequest')
};

export const PRODUCT_TYPES = {
  IProductRepository: Symbol.for('IProductRepository'),
  IProductController: Symbol.for('IProductController'),
  IFindAllProductsByUser: Symbol.for('IFindAllProductsByUser'),
  IFindProductById: Symbol.for('IFindProductById'),
  IFindAllProductByCategory: Symbol.for('IFindAllProductByCategory'),
  IFindProductByName: Symbol.for('IFindProductByName'),
  IFindAllRandomized: Symbol.for('IFindAllRandomized'),
  IDeleteProduct: Symbol.for('IDeleteProduct'),
  ICreateProduct: Symbol.for('ICreateProduct'),
  IUpdateProduct: Symbol.for('IUpdateProduct'),
  IUpdateStock: Symbol.for('IUpdateStock'),
  IToggleProductPause: Symbol.for('IToggleProductPause'),
  IProductMapper: Symbol.for('IProductMapper'),
  IUploadProductPhoto: Symbol.for('IUploadProductPhoto'),
  IDeleteProductPhoto: Symbol.for('IDeleteProductPhoto')
}

export const CATEGORY_TYPES = {
  ICategoriesRepository: Symbol.for('ICategoryRepository'),
  ICategoriesController: Symbol.for('ICategoriesController'),
  IGetAllCategories: Symbol.for('IGetAllCategories'),
  IGetCategoryById: Symbol.for('IGetCategoryById'),
  IUpdateCategory: Symbol.for('IUpdateCategory'),
  ICreateCategory: Symbol.for('ICreateCategory'),
  IDeleteCategory: Symbol.for('IDeleteCategory'),
  IGetCategoryByName: Symbol.for('IGetCategoryByName'),
  ICategoryMapper: Symbol.for('ICategoryMapper')
}

export const ORDER_TYPES = {
  IOrdersMapper: Symbol.for('IOrderMapper'),
  IOrdersRepository: Symbol.for('IOrdersRepository'),
  ICreateOrder: Symbol.for('ICreateOrder'),
  IFindOrderById: Symbol.for('IFindOrderById'),
  IDeleteOrder: Symbol.for('IDeleteOrder'),
  IUpdateOrder: Symbol.for('IUpdateOrder'),
  IFindAllOrdersByUserId: Symbol.for('IFindAllOrdersByUserId'),
  IUpdateStatus: Symbol.for('IUpdateStatus'),
  IOrdersController: Symbol.for('IOrdersController'),
  IAddProductsToOrders: Symbol.for('IAddProductsToOrders'),
  IModifyQuantityInOrder: Symbol.for('IModifyQuantityInOrder'),
  IDeleteItemInOrder: Symbol.for('IDeleteItemInOrder'),
  IvaCalculator: Symbol.for('IvaCalculator'),
  SaleTaxCalculator: Symbol.for('SaleTaxCalculator'),
  SpecificProductTaxCalculator: Symbol.for('SpecificProductTaxCalculator'),
  CalculateAllTaxes: Symbol.for('CalculateAllTaxes'),
  IAddTaxesObject: Symbol.for('IAddTaxesObject'),
  ICalculateTotalProductPrices: Symbol.for('ICalculateTotalProductPrices')
}

export const ENCRYPTION_TYPES = {
  IEncryptionServices: Symbol.for('IEncryptionServices'),
  ICompareHash: Symbol.for('ICompareHash'),
  IHashCode: Symbol.for('IHashCode')
}

export const AUTH_TYPES = {
  ILocalLogin: Symbol.for('ILocalLogin'),
  ILocalStrategyServices: Symbol.for('ILocalStrategyServices'),
  IJwtStrategyServices: Symbol.for('IJwtStrategyServices'),
  IAuthAdapter: Symbol.for('IAuthAdapter'),
  IAuthController: Symbol.for('IAuthController'),
  PassportConfig: Symbol.for('PassportConfig'),
  IJwtServices: Symbol.for('IJwtServices'),
  ISignToken: Symbol.for('ISignToken')
}

export const MAIL_TYPES = {
  INodeMailer: Symbol.for('INodeMailer'),
  INodeMailerServices: Symbol.for('INodeMailerServices'),
  ISendConfirmationEmail: Symbol.for('ISendConfirmationEmail'),
  ISendMail: Symbol.for('ISendMail'),
  ISendPasswordResetMail: Symbol.for('ISendPasswordResetMail')
}

export const AWS_TYPES = {
  IAwsServices: Symbol.for('IAwsServices'),
  IUploadFileToS3: Symbol.for('IUploadFileToS3'),
  IDeleteFileInS3: Symbol.for('IDeleteFileInS3'),
  ICreateUserFolder: Symbol.for('ICreateUserFolder'),
  IDeleteUserFolder: Symbol.for('IDeleteUserFolder ')
}