import { Injectable } from '@nestjs/common';
import { CrudService } from 'util/crud-service';
import { User } from './entities/user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User) userRepo: Repository<User>,
    @InjectDataSource() data: DataSource,
  ) {
    super(userRepo, data);
  }
}
