import Orders from "../../../../domain/entities/Orders";

export default interface IFindOrderById {
  execute(id: string): Promise<Orders>
}