import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CrudService } from './crud-service';
import { BaseEntity } from './base-entity';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { GetUser } from './get-user.decorator';

export class GenericController<T extends BaseEntity & { id: number | string }> {
  constructor(private readonly genericService: CrudService<T>) {}

  @Post()
  create(@Body() createDto: any, @GetUser() user?: any) {
    return this.genericService.create({
      createdBy: user?.userId,
      ...createDto,
    } as unknown as DeepPartial<T>);
  }

  @Post('/find')
  @HttpCode(200)
  findAllWith(@Body() query: any) {
    const queryOptions = {
      where: query.options,
      relations: query?.relations,
      select: query?.select,
      withDeleted: query?.withDeleted,
    };
    return this.genericService.findAll(queryOptions);
  }

  @Get()
  findAll(options?) {
    return this.genericService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const options = { id: +id } as FindOptionsWhere<T>;
    return this.genericService.findOne({ where: options });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    const options = { id: +id } as FindOptionsWhere<T>;
    return this.genericService.update(updateDto as unknown as DeepPartial<T>, {
      where: options,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const options = { id: +id } as FindOptionsWhere<T>;
    return this.genericService.remove({ where: options });
  }
}
