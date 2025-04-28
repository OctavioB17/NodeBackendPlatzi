export default interface IImageManipulation {
  changeImageDimensions(image: Buffer, width: number, height: number): Promise<Buffer | null>
  changeImageFormat(image: Buffer, format: "jpeg" | "png" | "webp" | "avif"): Promise<Buffer | null>
  changeDimensionsAndFormat(image: Buffer, width: number, height: number, format: "jpeg" | "png" | "webp" | "avif"): Promise<Buffer | null>
}