import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodError, date } from 'zod';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from "crypto"
import { DoctorDetailsInputs, SignInDto, SignUpDto } from './dto/auth-input';
import axios from 'axios';
import { googleProfile, UserType } from 'src/utils/types';





@Injectable()
export class AuthService {
    private salt: string


    constructor(private readonly prisma: PrismaService, private readonly userService: UserService, private readonly jwtService: JwtService) {
        this.salt = process.env.HASH_KEY_SALT
    }

    async HashPassword(Password: string) {
        const newHash = await new Promise((resolve, reject) => {
            crypto.scrypt(Password, this.salt, 64, (err: Error | null, derivedKey: Buffer | null) => {
                if (err)
                    reject(err)
                resolve(derivedKey.toString("hex"))
            })
        })
        return newHash
    }


    async validatePassword(Password: string, hashedPassword: any) {
        const newHash = await this.HashPassword(Password)
        return (newHash === hashedPassword)
    };


    generateJWTToken(secretkey: string, payload: any, exp: string) {
        console.log(secretkey)
        return this.jwtService.sign(payload, {
            expiresIn: exp,
            secret: secretkey,
        });
    }


    validateToken(token: string, secret: string) {
        try {
            const decodedToken = this.jwtService.verify(token, {
                secret
            })
            return decodedToken
        } catch (error) {
            console.log(error)
        }

    }

    isTokenExpired(expirationTimestamp: number) {
        const now = Date.now() / 1000;
        return now >= expirationTimestamp;
    }



    async getNewGoogleAccessToken(refresh_token: string) {
        try {
            const response = await axios.post("https://accounts.google.com/o/oauth2/token", {
                client_id: process.env.GOOLGE_CLIENT_ID,
                client_secret: process.env.GOOLGE_CLIENT_SECRET,
                refresh_token: refresh_token,
                grant_type: 'refresh_token',
            })
            return response.data.access_token
        } catch (error) {
            throw new Error('Failed to refresh the access token.');
        }
    }

    async revokeGoogleToken(token: string) {
        try {
            await axios.get(
                `https://accounts.google.com/o/oauth2/revoke?token=${token}`,
            );
        } catch (error) {
            console.log("Failed to revoke the token")
        }
    }



    async googleLogin(profile: googleProfile) {
        const { FirstName, LastName, ProfilePicture, Email } = profile
        try {
            let user = await this.prisma.users.findUnique({
                where: {
                    Email: profile.Email
                }
            })

            if (!user)
                user = await this.userService.RegisterUser({ FirstName, LastName, ProfilePicture, Email, Role: UserType.PATIENT })
            

            return user

        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong please try again!!", HttpStatus.INTERNAL_SERVER_ERROR)

        }

    }



    async Login({ Email, Password }: SignInDto) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { Email: Email },
            })
            if (!user)
                throw new UnauthorizedException("Invalid credentials.check your Email or password!!")
            if (user && !user.Verified)
                throw new UnauthorizedException("user not verified")

            if (!this.validatePassword(Password, user.Password))
                throw new UnauthorizedException("Invalid credentials .please check your username or password!!")

            const updatedUser = await this.prisma.users.update({
                where: {
                    UserID: user.UserID
                },
                data: {
                    LastLogin: new Date(Date.now())
                }
            })


            const { Password: userPassword, CreatedAt, UpdatedAt, LastLogin, ...others } = updatedUser
            const payload = {
                sub: updatedUser.UserID,
                username: updatedUser.FirstName,
                role: updatedUser.Role,
                status: updatedUser.Status
            }


            const access_token = this.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "15m")
            const refresh_token = this.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "7d")

            return {
                access_token: access_token,
                refresh_token: refresh_token,
                user: { ...others }
            }

        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map(issue => issue.message);
                throw new BadRequestException(errorMessages.join(', '));
            }
            if (error instanceof UnauthorizedException)
                throw error
            else {
                throw new HttpException("An Unexpected error occurred.Please try again!!!", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    }


    async Register(registerInput: SignUpDto) {
        try {
            const { Password, ...others } = registerInput
            const hashedPassword = await this.HashPassword(Password || "")
            const user = await this.prisma.users.create({
                data: {
                    Password: hashedPassword as string,
                    ...others

                }
            })
        } catch (error) {

        }

    }




    async resetEmail(email: string) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    Email: email
                }
            })
            if (!user)
                throw new HttpException("Email not registered", HttpStatus.NOT_FOUND)
            const verificationToken = this.generateJWTToken(process.env.PASSWORD_RESET_SECRET, { sub: user.UserID, username: user.FirstName, email: user.Email }, "15m")
            const verificationLink = `${process.env.API}/auth/reset-password?token=${verificationToken}`

            return { token: verificationToken }


        } catch (error) {
            throw error

        }


    }


}
