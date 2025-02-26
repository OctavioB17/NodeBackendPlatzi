export const USER_TYPES = {
  IUserRepository: Symbol.for('IUserRepository'),
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
