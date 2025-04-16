export interface ITaxCalculator {
  calculate(amount: number): number | null;
}