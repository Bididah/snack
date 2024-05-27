import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(private readonly dtoType: any) {}

  async transform(value: any) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    // Convert the plain JavaScript object to the specified DTO type
    const specificDto = plainToClass(this.dtoType, value);

    // Validate the specified DTO
    const errors = await validate(specificDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return specificDto;
  }
}
