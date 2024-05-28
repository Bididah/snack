import { Injectable } from '@nestjs/common';
import { CrudService } from 'util/crud-service';
import { User } from './entities/user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectDataSource() data: DataSource,
  ) {
    super(userRepo, data);
  }

  async create(createDto: DeepPartial<User>): Promise<User> {
    const user = this.userRepo.create(createDto);
    const saltOrRounds = 10;
    const hashed = await hash(createDto.password, saltOrRounds);
    Object.assign(user, { password: hashed });
    return super.create(user);
  }
}
