import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Role } from "@prisma/client";
import { Profile, VerifyCallback, Strategy } from "passport-google-oauth20";
import { profileEnd } from "console";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    private static authSerivce: AuthService;
    constructor() {
        super({
            clientID: process.env.GOOLGE_CLIENT_ID,
            clientSecret: process.env.GOOLGE_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/auth/google/callback',
            scope: ['email', 'profile', 'openid'],
        });
    }



    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        const { name, emails, photos } = profile;
        const user = {
            Email: emails[0].value,
            FirstName: name.givenName,
            LastName: name.familyName,
            ProfilePicture: photos[0].value,
            accessToken,
            refreshToken,
        };
        done(null, user);
    }
}
