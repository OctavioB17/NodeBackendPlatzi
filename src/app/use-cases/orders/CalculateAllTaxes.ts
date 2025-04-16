import { inject, injectable } from "inversify";
import { ITaxCalculator } from "../../interfaces/orders/ITaxCalculator";
import { ORDER_TYPES } from "../../../types";

@injectable()
export default class CalculatedAllTaxes implements ITaxCalculator {

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

  calculate(number: number): number | null {
    const iva = this.ivaCalculator.calculate(number);
    const salesTax = this.saleTaxCalculator.calculate(number);
    const specificProductTax = this.specificProductTaxCalculator.calculate(number);
    if (salesTax === null || specificProductTax === null || iva === null) {
      return null;
    }

    return number + iva + salesTax + specificProductTax
  }
}