export default interface IHashCode {
  hash(toHash: string): Promise<string>
}