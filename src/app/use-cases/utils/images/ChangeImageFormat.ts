import { inject, injectable } from "inversify";
import { UTIL_TYPES } from "../../../../types";
import IImageManipulation from "../../../../infraestructure/services/interfaces/IImageManipulation";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";
import IChangeImageFormat from "../../../interfaces/utils/images/IChangeImageFormat";

@injectable()
export default class ChangeImageFormat implements IChangeImageFormat {
  private imageManipulation: IImageManipulation

  constructor (@inject(UTIL_TYPES.IImageManipulation) imageManipulation: IImageManipulation) {
      this.imageManipulation = imageManipulation
  }

  async execute(image: Buffer, format: "jpeg" | "png" | "webp" | "avif"): Promise<Buffer | null> {
    try {
      const imageChanged = await this.imageManipulation.changeImageFormat(image, format)
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