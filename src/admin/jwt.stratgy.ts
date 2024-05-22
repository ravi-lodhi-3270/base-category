import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWTSECRECT@123',
    });
  }

  async validate(payload) {
    return {
      adminId: payload.adminId,
      name: payload.name,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
    };
  }
}
