import { Strategy } from "passport-local";

export default interface ILocalStrategyServices {
  getStrategy(): Promise<Strategy>;
}