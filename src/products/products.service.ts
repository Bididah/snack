import { Injectable } from '@nestjs/common';
import { CrudService } from 'util/crud-service';
import { Product } from './entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductsService extends CrudService<Product> {
  constructor(
    @InjectRepository(Product) productRepo: Repository<Product>,
    @InjectDataSource() data: DataSource,
  ) {
    super(productRepo, data);
  }
}
