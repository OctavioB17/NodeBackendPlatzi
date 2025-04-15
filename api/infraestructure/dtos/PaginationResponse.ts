import { Expose } from "class-transformer";

export default class PaginationResponse<T> {
  @Expose()
  data!: T

  @Expose()
  limit!: number

  @Expose()
  offset!: number

  constructor(data: T, limit: number, offset: number) {
    this.data = data;
    this.limit = limit;
    this.offset = offset;
  }
}