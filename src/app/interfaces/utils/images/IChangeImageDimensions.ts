export default interface IChangeImageDimensions {
  execute(image: Buffer, width: number, height: number): Promise<Buffer | null>
}