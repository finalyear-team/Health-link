import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodError, date } from 'zod';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from "crypto"
import { EventEmitter2 } from '@nestjs/event-emitter';
import clerkClient, { User } from '@clerk/clerk-sdk-node';
import { ClerkAuthGuard } from './auth.guard';
import { DoctorDetailsInputs, SignInDto, SignUpDto } from './dto/auth-input';
import { DoctorDetailInput } from 'src/user/dto/create-user.input';





@Injectable()
export class AuthService {
    private salt: string

    constructor(private readonly prisma: PrismaService, private readonly userService: UserService, private readonly jwtService: JwtService) {
        this.salt = process.env.HASH_KEY_SALT


    }


    validatePassword(Password: string, hashedPassword: any) {
        const hashedInputPassword = this.HashPassword(Password)
        console.log(hashedInputPassword === hashedPassword)
        return hashedInputPassword === hashedPassword;
    };

    HashPassword(Password: string) {
        const hashedPassword = crypto.pbkdf2Sync(Password, this.salt, 1000, 64, "sha512").toString('hex');
        return hashedPassword

    }

    generateJWTToken(secretkey: string, payload: any, exp: string) {
        console.log(secretkey)
        return this.jwtService.sign(payload, {
            expiresIn: exp,
            secret: secretkey,
        });


    }

    validateToken(token: string, secret: string) {
        console.log("come on man")
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



    async Login({ Email, Password }: SignInDto) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { Email: Email },
            })
            if (!user)
                throw new UnauthorizedException("Invalid credentials.check your username or password!!")
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
                username: updatedUser.Username,
                role: updatedUser.Role,
                status: updatedUser.Status
            }


            const access_token = this.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "15m")
            const refresh_token = this.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "30d")

            return {
                access_token: access_token,
                refresh_token: refresh_token,
                user: { ...others }
            }

        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map(issue => issue.message);
                console.log(errorMessages); // This will log an array of error messages
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
        const { Email, Password, Username, Role, ...otherDetails } = registerInput

        try {
            const userByEmail = await this.prisma.users.findUnique({
                where: {
                    Email: Email
                }
            })
            // const userByUsername = await this.prisma.users.findUnique({
            //     where: {
            //         Username: Username
            //     }
            // })
            if (userByEmail)
                throw new HttpException("User already exist.Please use different email", HttpStatus.BAD_REQUEST)
            // if (userByUsername)
            //     throw new HttpException("User already exist.Please use different username", HttpStatus.BAD_REQUEST)

            const hashedPassword = await this.HashPassword(Password)

            const newUser = await this.prisma.users.create({
                data: {
                    Username, Email,
                    Password: hashedPassword,
                    Status: "active",
                    Role,
                    ...otherDetails,
                    LastLogin: new Date(Date.now())
                }
            })

            const payload = {
                sub: newUser.UserID,
                username: newUser.Username,
                role: newUser.Role,
                status: newUser.Status
            }


            const access_token = this.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "15m")
            const refresh_token = this.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "30d")

            const { LastLogin, Password: userPassword, CreatedAt, UpdatedAt, ...others } = newUser
            return {
                access_token: access_token,
                refresh_token: refresh_token,
                user: { ...others }
            }

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map(issue => issue.message);
                console.log(errorMessages);
                throw new BadRequestException(errorMessages.join(', '));
            }
            if (error instanceof HttpException)
                throw error
            else {
                throw new HttpException("An Unexpected error occurred.Please try again!!!", HttpStatus.INTERNAL_SERVER_ERROR)
            }

        } finally {
            this.prisma.$disconnect()
        }
    }


    async DoctorDetailsRegister(doctorDetailsInput: DoctorDetailsInputs) {
        try {
            console.log(doctorDetailsInput)
            const { UserID, EducationalBackground, ...others } = doctorDetailsInput
            const { DoctorDetails, ...userDetails } = await this.prisma.users.update({
                where: {
                    UserID,
                },
                data: {
                    DoctorDetails: {
                        create: {
                            ...others,
                            EducationalBackground: JSON.stringify(EducationalBackground)

                        }
                    }
                },
                include: {
                    DoctorDetails: true
                }
            })

            return { userDetails, ...DoctorDetails }

        } catch (error) {
            throw error

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
            const verificationToken = this.generateJWTToken(process.env.PASSWORD_RESET_SECRET, { sub: user.UserID, username: user.Username, email: user.Email }, "15m")
            const verificationLink = `${process.env.API}/auth/reset-password?token=${verificationToken}`

            return { token: verificationToken }


        } catch (error) {
            throw error

        }


    }


}
