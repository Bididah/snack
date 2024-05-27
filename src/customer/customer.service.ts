import { Injectable } from '@nestjs/common';

import { CrudService } from 'util/crud-service';
import { Customer } from './entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerService extends CrudService<Customer> {
  constructor(
    @InjectRepository(Customer) customerRepo: Repository<Customer>,
    @InjectDataSource() data: DataSource,
  ) {
    super(customerRepo, data);
  }
}
