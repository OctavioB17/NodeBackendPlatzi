import { injectable } from "inversify";
import { ITaxCalculator } from "../../interfaces/orders/ITaxCalculator";
import { isNumber } from './isNumber'

@injectable()
export default class SaleTaxCalculator implements ITaxCalculator {

  private readonly rate: number;

  constructor(rate: number = 0.07) {
    this.rate = rate;
  }

  calculate(amount: number): number | null {
    try {
      if (!isNumber(amount)) {
        return null
      }
      return amount * this.rate
    } catch (error) {
      return null
    }
  }
}