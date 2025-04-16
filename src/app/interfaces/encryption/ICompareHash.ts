export default interface ICompareHash {
  compare(toCompare: string, hash: string): Promise<boolean>
}