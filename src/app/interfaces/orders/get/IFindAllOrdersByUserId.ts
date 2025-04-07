import Orders from "../../../../domain/entities/Orders";


export default interface IFindAllOrdersByUserId {
  execute(userId: string): Promise<Orders[] | null>
}