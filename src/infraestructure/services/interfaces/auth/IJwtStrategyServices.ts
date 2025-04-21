import { Strategy } from "passport-jwt";

export default interface IJwtStrategyServices {
  getStrategy(): Strategy;
}