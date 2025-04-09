import OrderHasProductsModel from "../../../infraestructure/database/models/OrdersHasProducts";
import OrdersModel from "../../../infraestructure/database/models/OrdersModel";
import ProductModel from "../../../infraestructure/database/models/ProductsModel";
import UserModel from "../../../infraestructure/database/models/UserModel";
import OrderDTO from "../../../infraestructure/dtos/orders/OrderDTO";
import OrderHasProductsDTO from "../../../infraestructure/dtos/orders/OrderHasProductsDTO";

export interface IOrders {
  id: string;
  userId: string;
  status: string;
  totalPrice: number;
  paymentMethod: string;
  taxes: Taxes[]
}

export interface Taxes {
  type: string;
  number: number
}

export interface CreateOrderRequest {
  order: OrderDTO;
  orderHasProducts: OrderHasProductsDTO;
}

export interface OrdersModelWithUserAndProductRelations extends OrdersModel {
  user?: UserModel
  products?: (ProductModel & {
    OrderHasProductsModel?: {
      quantity: number
    }
  })[]
}

export interface OrderWithUserAndProducts {
  id: string
  userId: string
  status: string
  totalPrice: string
  paymentMethod: string
  taxes: { type: string; number: number }[]
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string
    surname: string
    email: string
    role: string
    password: string
    createdAt: Date
    updatedAt: Date
  }
  products: {
    id: string
    name: string
    description: string
    imageUrl: string
    sku: string
    dimensions: {length: string, width: string, heigth: string} | {length: string, width: string, heigth: string}[] | null
    weight: number
    price: number
    stock: number
    categoryId: string
    material: string[]
    isPaused: boolean
    userId: string
    createdAt: Date
    updatedAt: Date
    quantity: number
  }[]
}

export type OrderWithUserAndProductsModel = OrdersModel & { user: UserModel; products: (ProductModel & { OrderHasProductsModel: OrderHasProductsModel })[];}