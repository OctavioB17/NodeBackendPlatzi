export interface IPagination<T> {
  data: T,
  limit: number,
  offset: number
}