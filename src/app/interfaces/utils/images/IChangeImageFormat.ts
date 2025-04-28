export default interface IChangeImageFormat {
  execute(image: Buffer, format: "jpeg" | "png" | "webp" | "avif"): Promise<Buffer | null>
}