export const USER_TYPES = {
  IUserRepository: Symbol.for('IUserRepository'),
  IUserController: Symbol.for('IUserController'),
  IIdGenerator: Symbol.for('IIdGenerator'),
  ICreateUser: Symbol.for('ICreateUser'),
  IFindAll: Symbol.for('IFindAll'),
  IFindAllNoPassword: Symbol.for('IFindAllNoPassword'),
  IFindUserByEmail: Symbol.for('IFindUserByEmail'),
  IFindUserByEmailNoPassword: Symbol.for('IFindUserByEmailNoPassword'),
  IFindUserById: Symbol.for('IFindUserById'),
  IFindUserByIdNoPassword: Symbol.for('IFindUserByIdNoPassword'),
  IDeleteUser: Symbol.for('IDeleteUser'),
  IChangePassword: Symbol.for('IChangePassword')
};

export const PRODUCT_TYPES = {
  IProductRepository: Symbol.for('IProductRepository'),
  IProductController: Symbol.for('IProductController'),
  IFindAllProductsByUser: Symbol.for('IFindAllProductsByUser'),
  IFindProductById: Symbol.for('IFindProductById'),
  IFindAllProductByCategory: Symbol.for('IFindAllProductByCategory'),
  IFindProductByName: Symbol.for('IFindProductByName'),
  IDeleteProduct: Symbol.for('IDeleteProduct'),
  ICreateProduct: Symbol.for('ICreateProduct'),
  IUpdateProduct: Symbol.for('IUpdateProduct'),
  IUpdateStock: Symbol.for('IUpdateStock'),
  IToggleProductPause: Symbol.for('IToggleProductPause')
}