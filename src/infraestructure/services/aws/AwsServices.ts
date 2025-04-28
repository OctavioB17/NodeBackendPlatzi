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

    async uploadFile(userId: string, file: Buffer, fileName: string, mimetype: string): Promise<string> {
      try {
        const fileKey = `${userId}/${fileName}`

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
        Boom.internal(error)
        throw new Error(error)
      }
    }

    async deleteFile(userId: string, fileName: string): Promise<void> {
      try {
        const fileKey = `${userId}/${fileName}`;

        const command = new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: fileKey,
        });

        await s3Client.send(command);
      } catch (error: any) {
        Boom.internal(`Error to delete file`);
      }
    }


    async deleteFolder(userId: string): Promise<void> {
      try {
        const listCommand = new ListObjectsV2Command({
          Bucket: this.bucketName,
          Prefix: `${userId}/`,
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
        Boom.internal(`Error to delete ${userId}/ files: ${error.message}`);
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
      Boom.internal(error)
    }
  }
}
