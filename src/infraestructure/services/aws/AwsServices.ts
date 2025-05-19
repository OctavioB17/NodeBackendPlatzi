import { config } from "dotenv";
import { IAwsServices } from "../interfaces/IAwsServices";
import { injectable } from "inversify";
import { DeleteObjectCommand, DeleteObjectsCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../../config/aws/s3Config";
import Boom from "@hapi/boom";

config()

@injectable()
export default class AwsServices implements IAwsServices {

  private bucketName: string

  constructor() {
    this.bucketName = process.env.AWS_ASSETS_BUCKET!
  }

    async uploadFile(file: Buffer, fileKey: string, mimetype: string): Promise<string> {
      try {

        const command = new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileKey,
          Body: file,
          ContentType: mimetype,
        })

        await s3Client.send(command)

        const fileUrl = `https://${this.bucketName}.s3.amazonaws.com/${fileKey}`;
        return fileUrl;
      } catch (error: any) {
        throw Boom.internal(error)
      }
    }

    async deleteFile(fileKey: string): Promise<void> {
      try {
        console.log(`Intentando eliminar archivo con key: ${fileKey}`);

        const command = new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: fileKey,
        });

        const response = await s3Client.send(command);

        if (response.$metadata.httpStatusCode !== 204) {
          console.error(`Error al eliminar archivo. Status code: ${response.$metadata.httpStatusCode}`);
          throw Boom.internal(`Error al eliminar archivo. Status code: ${response.$metadata.httpStatusCode}`);
        }

        console.log(`Archivo eliminado exitosamente: ${fileKey}`);
      } catch (error: any) {
        console.error('Error detallado al eliminar archivo:', {
          message: error.message,
          code: error.code,
          requestId: error.$metadata?.requestId,
          fileKey
        });

        if (error.code === 'NoSuchKey') {
          throw Boom.notFound(`El archivo no existe en S3: ${fileKey}`);
        }

        throw Boom.internal(`Error al eliminar archivo: ${error.message}`);
      }
    }


    async deleteFolder(folderName: string): Promise<void> {
      try {
        const listCommand = new ListObjectsV2Command({
          Bucket: this.bucketName,
          Prefix: `${folderName}`,
        });

        const listedObjects = await s3Client.send(listCommand);

        if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
          Boom.notFound(`Not files found`);
          return;
        }

        const deleteCommand = new DeleteObjectsCommand({
          Bucket: this.bucketName,
          Delete: {
            Objects: listedObjects.Contents.map((obj) => ({ Key: obj.Key! })),
          },
        });

        await s3Client.send(deleteCommand);
      } catch (error: any) {
        throw Boom.internal(`Error to delete files: ${error.message}`);
      }
    }


  async createFolder(folderName: string): Promise<void> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `${folderName}/`
      })

      await s3Client.send(command)
    } catch (error: any) {
      throw Boom.internal(error)
    }
  }
}
