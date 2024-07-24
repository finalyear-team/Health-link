import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { getYear } from 'date-fns';
import { Token } from 'graphql';
// import { User } from 'src/user/entities/user.entity';



@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendVerificationEmail(Email: string, FirstName: string, otp: string) {
        try {
            const email = await this.mailerService.sendMail({
                to: Email,
                subject: 'Account Verification',
                template: './email-verification',
                context: {
                    FirstName,
                    otp,
                    currentYear: getYear(new Date())
                },
            });
            return email


        } catch (error) {
            throw error

        }

    }


    async sendResetPasswordEmail(payload: any) {
        const { email, FirstName, verificationLink } = payload
        console.log(email)
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Reset Password',
                template: './reset-password-email',
                context: {
                    FirstName,
                    email,
                    verificationLink
                },
            });

        } catch (error) {
            throw error

        }
    }




}
