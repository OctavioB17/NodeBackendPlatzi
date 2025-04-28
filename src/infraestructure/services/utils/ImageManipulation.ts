import { inject, injectable } from "inversify";
import IImageManipulation from "../interfaces/IImageManipulation";
import sharp from "sharp";

@injectable()
export default class ImageManipulation implements IImageManipulation {

  async changeImageDimensions(image: Buffer, width: number, height: number): Promise<Buffer | null> {
    try {
      const processedBuffer = await sharp(image)
      .resize({ width, height })
      .toBuffer()

      return processedBuffer
    } catch (error) {
      return null
    }
  }

  async changeImageFormat(image: Buffer, format: "jpeg" | "png" | "webp" | "avif"): Promise<Buffer | null> {
    try {
      const processedBuffer = await sharp(image)
      .toFormat(format)
      .toBuffer()

      return processedBuffer
    } catch (error) {
      return null
    }
  }

  async changeDimensionsAndFormat(image: Buffer, width: number, height: number, format: "jpeg" | "png" | "webp" | "avif"): Promise<Buffer | null> {
    try {
      const processedBuffer = await sharp(image)
      .resize({ width, height })
      .toFormat(format)
      .toBuffer()

      return processedBuffer
    } catch (error) {
      return null
    }
  }

}