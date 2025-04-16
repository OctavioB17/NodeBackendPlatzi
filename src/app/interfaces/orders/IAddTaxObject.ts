import { Taxes } from "../../../domain/interfaces/orders/IOrders"

export interface IAddTaxesObject {
  addTaxesObject(number: number): Taxes[] | null
}