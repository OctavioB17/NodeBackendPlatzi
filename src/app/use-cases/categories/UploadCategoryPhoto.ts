export default class UploadCategoryPhoto implements IUploadCategoryPhoto {
  constructor(
    @inject(AWS_TYPES.IUploadFileToS3) private uploadFileToS3: IUploadFileToS3
  ) {}
}


