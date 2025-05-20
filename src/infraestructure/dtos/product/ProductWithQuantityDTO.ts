import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString, IsUUID, ValidateNested, IsArray, IsOptional } from 'class-validator';

export class ProductWithQuantityDTO {
  @IsUUID()
  @Expose()
  id!: string;

  @IsString()
  @Expose()
  name!: string;

  @IsString()
  @Expose()
  description!: string;

  @IsArray()
  @Expose()
  imageGallery!: string[]

  @IsString()
  @Expose()
  sku!: string;

  @IsOptional()
  @Expose()
  length!: string

  @IsOptional()
  @Expose()
  width!: string;

  @IsOptional()
  @Expose()
  height!: string;

  @IsNumber()
  @Expose()
  weight!: number;

  @IsNumber()
  @Expose()
  price!: number;

  @IsNumber()
  @Expose()
  stock!: number;

  @IsUUID()
  @Expose()
  categoryId!: string;

  @IsArray()
  @Expose()
  material!: string[]

  @IsBoolean()
  @Expose()
  isPaused!: boolean;

  @IsUUID()
  @Expose()
  userId!: string;

  @IsDate()
  @Expose()
  createdAt!: Date;

  @IsDate()
  @Expose()
  updatedAt!: Date;

  @IsNumber()
  @Expose()
  quantity!: number;
}