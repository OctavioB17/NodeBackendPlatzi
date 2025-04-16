export default interface IEncriptionServices {
  hash(toHash: string, saltRounds: number): Promise<string>

  compare(toCompare: string, hash: string): Promise<boolean>
}