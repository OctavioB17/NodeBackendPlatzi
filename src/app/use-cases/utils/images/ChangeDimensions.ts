import { inject, injectable } from "inversify";
import IChangeImageDimensions from "../../../interfaces/utils/images/IChangeImageDimensions";
import { UTIL_TYPES } from "../../../../types";
import IImageManipulation from "../../../../infraestructure/services/interfaces/IImageManipulation";
import { BoomError } from "../../../../domain/entities/DomainError";
import { ErrorType } from "../../../../domain/interfaces/Error";

@injectable()
export default class ChangeDimensions implements IChangeImageDimensions {
  private imageManipulation: IImageManipulation

  constructor (@inject(UTIL_TYPES.IImageManipulation) imageManipulation: IImageManipulation) {
      this.imageManipulation = imageManipulation
  }

  async execute(image: Buffer, width: number, height: number): Promise<Buffer | null> {
    try {
      const imageChanged = await this.imageManipulation.changeImageDimensions(image, width, height)
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