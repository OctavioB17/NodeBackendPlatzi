import { Container } from "inversify";
import { AWS_TYPES } from "../../types";
import AwsServices from "../services/aws/AwsServices";
import { ICreateUserFolder } from "../../app/interfaces/aws/ICreateUserFolder";
import CreateUserFolder from "../../app/use-cases/aws/CreateUserFolder";
import { IAwsServices } from "../services/interfaces/IAwsServices";
import { IDeleteUserFolder } from "../../app/interfaces/aws/IDeleteUserFolder";
import DeleteUserFolder from "../../app/use-cases/aws/DeleteUserFolder";
import IDeleteFileInS3 from "../../app/interfaces/aws/IDeleteFileInS3";
import IUploadFileToS3 from "../../app/interfaces/aws/IUploadFileToS3";
import DeleteFileInS3 from "../../app/use-cases/aws/DeleteFileInS3";
import UploadFileToS3 from "../../app/use-cases/aws/UploadFileToS3";

const awsContainer = new Container()

awsContainer.bind<IAwsServices>(AWS_TYPES.IAwsServices).to(AwsServices);
awsContainer.bind<ICreateUserFolder>(AWS_TYPES.ICreateUserFolder).to(CreateUserFolder)
awsContainer.bind<IDeleteUserFolder>(AWS_TYPES.IDeleteUserFolder).to(DeleteUserFolder)
awsContainer.bind<IUploadFileToS3>(AWS_TYPES.IUploadFileToS3).to(UploadFileToS3)
awsContainer.bind<IDeleteFileInS3>(AWS_TYPES.IDeleteFileInS3).to(DeleteFileInS3)

export default awsContainer