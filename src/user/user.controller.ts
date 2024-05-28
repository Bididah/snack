import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { GenericController } from 'util/generic.controller';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController extends GenericController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return super.update(id, updateUserDto);
  }
}
