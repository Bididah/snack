/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServicee: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userServicee.findOne({
      where: [{ email: username }, { phoneNumber: username }],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      userName: user.firstName + ' ' + user.lastName,
      userId: user.id,
    };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
