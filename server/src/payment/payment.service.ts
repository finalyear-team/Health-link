import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import * as crypto from "crypto"
import * as puppeteer from "puppeteer"
import { elementAt } from 'rxjs';
import { ConfirmPaymentInput } from './dto/confirm-payment.input';
import { UserService } from 'src/user/user.service';
import { string } from 'zod';
import { AppointmentService } from 'src/appointment/appointment.service';

@Injectable()
export class PaymentService {
    private CHAPA_SECRET = process.env.CHAPA_SECRET
    constructor(private readonly prisma: PrismaService, private readonly userService: UserService) { }

    chapaPaymentBody(user: any, amount: number) {
        const tx_ref = `chapaPay_${crypto.randomBytes(5).toString("hex")}`
        return JSON.stringify({
            "amount": `${amount}`,
            "currency": "ETB",
            "email": user.Email,
            "first_name": user.FirstName,
            "last_name": user.LastName,
            "phone_number": user.phone_number,
            "tx_ref": tx_ref,
            "callback_url": " https://1ff7-197-156-97-73.ngrok-free.app/payment/webhook",
            "return_url": "https://localhost:3000/dashboard",
            "customization[title]": "Payment for my favourite merchant",
            "customization[description]": "I love online payments"
        })

    }

    async chapaTransactionIntialize(user: any, amount: number) {
        try {
            const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${this.CHAPA_SECRET}`,
                    'Content-Type': 'application/json'
                },
                body: this.chapaPaymentBody(user, amount)
            })
            const data = await response.json()
            console.log(data.data)
            const checkout = await this.chapaCheckoutConfrim(data.data.checkout_url)
            console.log("from checkout")
            console.log(checkout)
        } catch (error) {
            throw error

        }

    }

    async chapaCheckoutConfrim(url: string) {
        console.log(url)
        try {
            console.log(url)
            console.log("come on man")

            if (!url)
                return
            const browser = await puppeteer.launch({ headless: true });

            const page = await browser.newPage();
            await page.goto(url);
            // Fill the input field with the given selector
            await page.type('#test-number', "0900123456");
            await page.click('button.mt-3.bg-primary.text-white.py-3.w-full.poppins-600.rounded-lg');
            const nextpage = await page.waitForNavigation({ waitUntil: 'networkidle2' });
            console.log(page.url())
            const result = await page.evaluate(() => {
                const element = document.querySelector('#downloadableContainer');
                console.log(element)
                return element ? element.innerHTML : null;
            });

            await browser.close();

            return result;

        } catch (error) {
            console.log(error)

        }
    }



    async pendingPayment(paymentInput: CreatePaymentInput) {
        const { AppointmentID, DoctorID, PatientID } = paymentInput
        try {
            const appointment = await this.prisma.appointments.findUnique({
                where: {
                    AppointmentID,
                    PatientID,
                    DoctorID
                },
                include: {
                    Doctor: {
                        select: {
                            DoctorDetails: {
                                select: {
                                    ConsultationFee: true
                                }
                            }
                        }
                    }

                }
            })




            console.log(appointment)




        } catch (error) {
            console.log(error)

        }




    }
    async updatePayment(PaymentID: string, Amount: number) {
        try {
            const payment = await this.prisma.payment.update({
                where: {
                    PaymentID
                },
                data: {
                    Amount,
                    PaymentStatus: "completed"
                }
            })
        } catch (error) {
            throw error

        }
    }

    async confirmPayment(confirmPaymentInput: ConfirmPaymentInput) {
        const { PatientID, DoctorID, AppointmentID, Duration } = confirmPaymentInput
        try {
            const patient = await this.userService.getUserDetails(PatientID)
            const doctor = await this.userService.getUserDetails(DoctorID)

            if (!doctor)
                throw new HttpException("request faild unexpectedly", HttpStatus.INTERNAL_SERVER_ERROR)

            const fee = doctor.ConsultationFee

            const amount = parseFloat(fee.toString()) * Duration


            const payment = await this.prisma.payment.findFirst({
                where: {
                    DoctorID,
                    PatientID,
                    AppointmentID,
                    PaymentStatus: "pending"
                }
            })

            const checkout = await this.chapaTransactionIntialize(patient, amount)
            console.log(checkout)



        } catch (error) {
            console.log(error)

        }

    }




}
