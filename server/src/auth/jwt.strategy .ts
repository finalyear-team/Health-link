import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Role } from "@prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static authSerivce: AuthService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    console.log(req.cookies["refresh_token"])
    if (req.cookies['access_token']) {
      return req.cookies['access_token'];
    }
    return null;
  }

  async validate(payload: any) {
    console.log(payload);
    return { UserID: payload.sub, Username: payload.username, Role: payload.role };
  }
}
