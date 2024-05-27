import { Transform, Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class GenericDto<T> {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  updatedAt: Date;

  @IsOptional()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  updatedBy: string;

  @IsOptional()
  @IsInt()
  id: string;

  // Add more common properties as needed

  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
