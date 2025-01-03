import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodError, date } from 'zod';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from "crypto"
import { DoctorDetailsInputs, SignInDto, SignUpDto } from './dto/auth-input';
import axios from 'axios';
import { googleProfile, UserType } from 'src/utils/types';
import * as OTPAuth from "otpauth"
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';





@Injectable()
export class AuthService {
    private salt: string



    constructor(private readonly prisma: PrismaService, private readonly userService: UserService, private readonly jwtService: JwtService,) {
        this.salt = process.env.HASH_KEY_SALT
    }

    async HashPassword(Password: string) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(Password, salt);
        return hash
    }


    async validatePassword(Password: string, hashedPassword: any) {
        return await bcrypt.compare(Password, hashedPassword);
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
            throw new Error(error.message)
        }

    }


    isTokenExpired(expirationTimestamp: number) {
        const now = Date.now() / 1000;
        return now >= expirationTimestamp;
    }


    encryptSecret = (secret: string, password: string): string => {
        try {
            const iv = crypto.randomBytes(16);
            const salt = crypto.randomBytes(16).toString('hex');
            const key = crypto.scryptSync(password, salt, 32);

            const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
            const encrypted = Buffer.concat([cipher.update(secret, 'utf8'), cipher.final()]);

            return `${salt}:${iv.toString('hex')}:${encrypted.toString('hex')}`;
        } catch (error) {
            throw new Error(`Encryption failed: ${error.message}`);
        }
    };

    decryptSecret = (encrypted: string, password: string): string => {
        try {
            const [salt, ivHex, encryptedData] = encrypted.split(':');
            if (!salt || !ivHex || !encryptedData) {
                throw new Error('Invalid encrypted data format');
            }

            const iv = Buffer.from(ivHex, 'hex');
            const key = crypto.scryptSync(password, salt, 32);

            const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
            const decrypted = Buffer.concat([
                decipher.update(Buffer.from(encryptedData, 'hex')),
                decipher.final(),
            ]);

            return decrypted.toString('utf8');
        } catch (error) {
            throw new Error(`Decryption failed: ${error.message}`);
        }
    };


    generateOtpSecret = () => {
        const secret = new OTPAuth.Secret({ size: 20 })
        return secret.base32
    }

    generateTOTP = (secret: string) => {
        console.log()
        const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromBase32(secret),
            algorithm: 'SHA1',
            digits: 6,
            period: 900,
        });
        console.log(totp.generate())
        return totp.generate();
    }

    validateTOTP(token: string, secret: string): boolean {
        console.log(secret)
        console.log(token)
        const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromBase32(secret),
            algorithm: 'SHA1',
            digits: 6,
            period: 900,
        });

        const delta = totp.validate({ token, window: 1 });
        console.log(totp.secret)
        return delta !== null;
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
            let user = await this.userService.getUserByEmail(Email)

            const redirect = (() => {
                if (!user)
                    return true;
                return user.isSocialAccount

            })();

            const registeredUser = user ? user : await this.userService.RegisterUser({ FirstName, LastName, ProfilePicture, Email, Role: UserType.PATIENT, isSocialAccount: true })


            return { user: registeredUser, redirect }

        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong please try again!!", HttpStatus.INTERNAL_SERVER_ERROR)

        }

    }



    async Login({ Email, Password }: SignInDto) {
        try {
            const user = await this.userService.getUserByEmail(Email)

            if (!user)
                throw new UnauthorizedException("Invalid credentials.check your Email or password!!")

            if (user && !this.validatePassword(Password, user.Password))
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

            return { ...others }


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

            const OTPSecret = this.encryptSecret(this.generateOtpSecret(), process.env.OTP_ENCRYPTION_KEY);

            const user = await this.userService.RegisterUser({
                Password: hashedPassword as string,
                OTPSecret,
                ...others

            })
            return user
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)

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
