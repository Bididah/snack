import { Injectable } from '@nestjs/common';

import { CrudService } from 'util/crud-service';
import { Customer } from './entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CustomerService extends CrudService<Customer> {
  constructor(
    @InjectRepository(Customer) customerRepo: Repository<Customer>,
    @InjectDataSource() data: DataSource,
  ) {
    super(customerRepo, data);
  }

  async create(createDto: DeepPartial<Customer>): Promise<Customer> {
    await this.uniqueFields(this.getUnique(createDto));
    return super.create(createDto);
  }

  async update(
    updateDto: DeepPartial<Customer>,
    options: FindOneOptions,
  ): Promise<Customer> {
    await this.uniqueFields(this.getUnique(updateDto));
    return super.update(updateDto, options);
  }
}
