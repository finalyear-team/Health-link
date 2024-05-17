import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodError, date } from 'zod';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from "crypto"
import { EventEmitter2 } from '@nestjs/event-emitter';
import clerkClient from '@clerk/clerk-sdk-node';
import { ClerkAuthGuard } from './auth.guard';

@Injectable()
export class AuthService {
    private salt:string

    constructor(private readonly prisma: PrismaService, private readonly userService: UserService, private readonly jwtService: JwtService,private  eventEmitter:EventEmitter2) { 
    this.salt=process.env.HASH_KEY_SALT

        
    }

    // @UseGuards(ClerkAuthGuard)

    // async clerkUser(){
    //     return clerkClient.users.getUserList()
    
    // }
   
    //   validatePassword (Password:string,hashedPassword:any)  {
    //      const hashedInputPassword =  this.HashPassword(Password)
    //     console.log(hashedInputPassword === hashedPassword)
    //     return hashedInputPassword === hashedPassword;
    //   };

    //  HashPassword(Password: string) {
    //     const hashedPassword = crypto.pbkdf2Sync(Password, this.salt, 1000, 64, "sha512").toString('hex');
    //     return  hashedPassword    
        
    // }

    // generateJWTToken(secretkey: string, payload: any, exp: string) {
    //     console.log(secretkey)
    //     return this.jwtService.sign(payload, {
    //         expiresIn: exp,
    //         secret: secretkey,
    //     });


    // }

    // validateToken(token: string,secret:string) {
    //     console.log("come on man")
    //     try {
            
    //         const decodedToken= this.jwtService.verify(token,{
    //            secret
    //         })
    //         return decodedToken
    //     } catch (error) {
    //         console.log(error)
            
    //     }

    // }
    //  isTokenExpired(expirationTimestamp: number) {
    //     const now = Date.now() / 1000;
    //     return now >= expirationTimestamp;
    //   }



    // async Login({ UsernameOrEmail, Password }: LoginInput){      

    //     try {
    //         const validatedUser = LoginSchema.parse({ UsernameOrEmail, Password })
    //         const userByEmail = await this.prisma.users.findUnique({
    //             where: {
                    
    //                      Email: UsernameOrEmail
                            
                        
    //             },
    //             include: {
    //                 UserDetails: true
    //             }

    //         })
    //         const userByUsername=await this.prisma.users.findUnique({
    //             where: {
                    
    //                      Username: UsernameOrEmail
                            
                        
    //             },
    //             include: {
    //                 UserDetails: true
    //             }

    //         })
    //         if (!userByEmail && !userByUsername)
    //             throw new UnauthorizedException("Invalid credentials.check your username or password!!")
    //         const user=userByEmail?userByEmail:userByUsername
    //         if (!await this.validatePassword(Password, user.Password))
    //             throw new UnauthorizedException("Invalid credentials .please check your username or password!!")
    //       const updatedUser= await this.prisma.users.update({
    //             where:{
    //                 UserID:user.UserID
    //             },
    //             data:{
    //                 LastLogin:new Date(Date.now())
    //             }
    //         })
    //         const { UserDetailID, LastLogin, Password: userPassword, CreatedAt, UpdatedAt, ...others } = { ...user, ...user.UserDetails }
    //         const payload = {
    //             sub: user.UserID,
    //             username: user.Username,
    //             role: user.Role,
    //             status: user.Status
    //         }
    //         const access_token = this.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "15m")
    //         const refresh_token = this.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "30d")

    //         return {
    //             access_token: access_token,
    //             refresh_token: refresh_token,
    //             user: { ...others }

    //         }

    //     } catch (error) {
    //         if (error instanceof ZodError) {
    //             const errorMessages = error.issues.map(issue => issue.message);
    //             console.log(errorMessages); // This will log an array of error messages
    //             throw new BadRequestException(errorMessages.join(', '));
    //         }
    //         if (error instanceof UnauthorizedException)
    //             throw error
    //         else {
    //             throw new HttpException("An Unexpected error occurred.Please try again!!!", HttpStatus.INTERNAL_SERVER_ERROR)
    //         }
    //     }
    //     finally {
    //         this.prisma.$disconnect()
    //     }
    // }

    // async Register({ Username, Email, Password, Role, UserDetails }: RegisterInput) {
    //     console.log(Password)
    //     try {
    //         RegisterSchema.parse({ Username, Email, Password, Role })

    //         const userByEmail = await this.prisma.users.findUnique({
    //             where: {
    //                 Email: Email
    //             }
    //         }) 
    //         const userByUsername = await this.prisma.users.findUnique({
    //             where: {
    //                 Username: Username
    //             }
    //         })
    //         if (userByEmail)
    //             throw new HttpException("User already exist.Please use different email", HttpStatus.BAD_REQUEST)
    //         if (userByUsername)
    //             throw new HttpException("User already exist.Please use different username", HttpStatus.BAD_REQUEST)

                
    //         const hashedPassword = await this.HashPassword(Password)
            
    //         const newUser = await this.prisma.users.create({
    //             data: {
    //                 Username, Email,
    //                 Password: hashedPassword,
    //                 Status: "active",
    //                 Role,
    //                 LastLogin:new Date(Date.now())
    //             }
    //         })
    //         const userId = newUser.UserID;
    //         const newUserDetails = await this.prisma.userDetails.create({
    //             data: {
    //                 User: {
    //                     connect: {
    //                         UserID: userId
    //                     }
    //                 },
    //                 ...UserDetails
    //             }

    //         })
            
    //         const payload = {
    //             sub: newUser.UserID,
    //             username: newUser.Username,
    //             role: newUser.Role,
    //             status: newUser.Status
    //         }


    //         const access_token = this.generateJWTToken(process.env.JWT_SECRET_KEY, payload, "15m")
    //         const refresh_token = this.generateJWTToken(process.env.JWT_REFRESH_KEY, payload, "30d")
    //         const { UserDetailID, LastLogin, Password: userPassword, CreatedAt, UpdatedAt, ...others } = { ...newUser, ...newUserDetails }

    //         return {
    //             access_token: access_token,
    //             refresh_token: refresh_token,
    //             user: { ...others }

    //         }

    //     } catch (error) {
    //         console.log(error)
    //         if (error instanceof ZodError) {
    //             const errorMessages = error.issues.map(issue => issue.message);
    //             console.log(errorMessages);
    //             throw new BadRequestException(errorMessages.join(', '));
    //         }
    //         if (error instanceof HttpException)
    //             throw error
    //         else {
    //             throw new HttpException("An Unexpected error occurred.Please try again!!!", HttpStatus.INTERNAL_SERVER_ERROR)
    //         }

    //     } finally {
    //         this.prisma.$disconnect()
    //     }
    // }

    // async resetEmail(email:string) {
    //     try {
    //         const user=await this.prisma.users.findUnique({
    //             where:{
    //                 Email:email
    //             }
    //         })
    //       if(!user)
    //       throw new HttpException("Email not registered",HttpStatus.NOT_FOUND)
    //     const verificationToken=this.generateJWTToken(process.env.PASSWORD_RESET_SECRET,{sub:user.UserID,username:user.Username,email:user.Email},"15m")  
    //     const verificationLink=`${process.env.API}/auth/reset-password?token=${verificationToken}`
    //     this.eventEmitter.emit("Reset-password",{
    //         username:user.Username,
    //         email:user.Email,
    //         verificationLink
    //                 })  
    //     return {token:verificationToken} 
        
            
    //     } catch (error) {
    //         throw error
            
    //     }


    // }
    

}
