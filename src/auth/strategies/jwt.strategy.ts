/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'MIIC4zCCAcsCAQAwgZ0xCzAJBgNVBAYTAk1BMRAwDgYDVQQIDAdURVRPVUFOMRAw',
    });
  }

  async validate(payload: any) {
    return {
      username: payload.userName,
      userId: payload.userId,
    };
  }
}
