export default interface IChangeDimensionsAndFormat {
  execute(image: Buffer, width: number, height: number, format: "jpeg" | "png" | "webp" | "avif"): Promise<Buffer | null>
}