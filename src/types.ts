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

export const CATEGORY_TYPES = {
  ICategoriesRepository: Symbol.for('ICategoryRepository'),
  ICategoriesController: Symbol.for('ICategoriesController'),
  IGetAllCategories: Symbol.for('IGetAllCategories'),
  IGetCategoryById: Symbol.for('IGetCategoryById'),
  IUpdateCategory: Symbol.for('IUpdateCategory'),
  ICreateCategory: Symbol.for('ICreateCategory'),
  IDeleteCategory: Symbol.for('IDeleteCategory'),
  IGetCategoryByName: Symbol.for('IGetCategoryByName')
}