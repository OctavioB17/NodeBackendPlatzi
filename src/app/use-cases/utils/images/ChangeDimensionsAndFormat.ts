import { inject, injectable } from "inversify";
import { UTIL_TYPES } from "../../../../types";
import IImageManipulation from "../../../../infraestructure/services/interfaces/IImageManipulation";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IChangeDimensionsAndFormat from "../../../interfaces/utils/images/IChangeDimensionsAndFormat";

@injectable()
export default class ChangeDimensionsAndFormat implements IChangeDimensionsAndFormat {
  private imageManipulation: IImageManipulation

  constructor (@inject(UTIL_TYPES.IImageManipulation) imageManipulation: IImageManipulation) {
      this.imageManipulation = imageManipulation
  }

  async execute(image: Buffer, width: number, height: number, format: "jpeg" | "png" | "webp" | "avif"): Promise<Buffer | null> {
    try {
      const imageChanged = await this.imageManipulation.changeDimensionsAndFormat(image, width, height, format)
      if (!imageChanged) {
        throw new BoomError({
          message: 'Failed to change image dimensions',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        })
      }

      return imageChanged
    } catch (error) {
      if (error instanceof BoomError) {
        throw error;
      }

      throw new BoomError({
        message: 'Failed to change image dimensions',
        type: ErrorType.INTERNAL_ERROR,
        statusCode: 500
      })
    }
  }
}