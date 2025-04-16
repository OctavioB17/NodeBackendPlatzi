import { inject, injectable } from "inversify";
import { ITaxCalculator } from "../../interfaces/orders/ITaxCalculator";
import { ORDER_TYPES } from "../../../types";
import { IAddTaxesObject } from "../../interfaces/orders/IAddTaxObject";
import { Taxes } from "../../../domain/interfaces/orders/IOrders";


@injectable()
export default class AddTaxesObject implements IAddTaxesObject {

  private ivaCalculator: ITaxCalculator;
  private saleTaxCalculator: ITaxCalculator;
  private specificProductTaxCalculator: ITaxCalculator;

  constructor(
    @inject(ORDER_TYPES.IvaCalculator) ivaCalculator: ITaxCalculator,
    @inject(ORDER_TYPES.SaleTaxCalculator) saleTaxCalculator: ITaxCalculator,
    @inject(ORDER_TYPES.SpecificProductTaxCalculator) specificProductTaxCalculator: ITaxCalculator
  ) {
    this.ivaCalculator = ivaCalculator,
    this.saleTaxCalculator = saleTaxCalculator,
    this.specificProductTaxCalculator = specificProductTaxCalculator
  }

  addTaxesObject(number: number): Taxes[] | null {
    const iva = this.ivaCalculator.calculate(number);
    const salesTax = this.saleTaxCalculator.calculate(number);
    const specificProductTax = this.specificProductTaxCalculator.calculate(number);

    if (salesTax === null || specificProductTax === null || iva === null) {
      return null;
    }

    return [
      {
        type: 'iva',
        number: iva
      },
      {
        type: 'salesTax',
        number: salesTax,
      },
      {
        type: 'specificProductTax',
        number: specificProductTax,
      }
    ]
  }
}
