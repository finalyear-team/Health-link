import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
    constructor(private configService: ConfigService, private readonly authService: AuthService) {
        super({
            accessType: 'offline',
            prompt: 'consent',
        });
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const provider = request.query?.role;
        if (!provider) // 
            return super.canActivate(context) as Promise<boolean>;
        const state = this.authService.generateJWTToken(process.env.JWT_SECRET_KEY, { role: "provider" }, "10m")
        request.query.state = state

        return super.canActivate(context) as Promise<boolean>;
    }

}