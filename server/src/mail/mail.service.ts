import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/user/entities/user.entity';



@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    @OnEvent("Email-verification")         
    async sendVerificationEmail(user:any,VerificationToken:string){
       const  verificationLink=`${process.env.API}/verify`
        try {
            await this.mailerService.sendMail({
                to: user.Email,
                subject: 'Account Verification',
                template: './confirmation',
                context: {
                  username: user.FullName,
                  verificationLink,
                },
              });
            
            } catch (error) {
            throw error
            
        }

    }
    

    @OnEvent("Reset-password")
    async sendResetPasswordEmail(payload:any){
        console.log(" event  !!!")
        const {email,username,verificationLink}=payload
        console.log(email)
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Reset Password',
                template: './reset-password-email',
                context: {
                    username,
                    email,
                    verificationLink                  
                },
              });          
            
        } catch (error) {
            throw error
            
        }
            }
 

   

}
