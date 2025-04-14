import { plainToInstance } from "class-transformer";
import PaginationResponse from "../dtos/PaginationResponse";

export default class PaginationMapper {
  static paginationResponseMapper<T>(data: T, limit: number, offset: number): PaginationResponse<T> {
    const dataTransform = {
      data: data,
      limit: limit,
      offset: offset
    }
    return plainToInstance(PaginationResponse<T>, dataTransform)
  }
}