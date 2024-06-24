import { Body, Controller, Get, HttpException, HttpStatus, Post, Redirect, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import * as crypto from 'crypto'
import { PaymentService } from './payment.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { ConfirmPaymentInput } from './dto/confirm-payment.input';

@Controller('payment')
export class PaymentController {
  private chapaWeebHookSecret = process.env.CHAPA_WEBHOOK_SECRET

  constructor(private readonly paymentService: PaymentService) {

  }

  @Post("/webhook")
  async Webhook(@Req() req: Request, @Res() res: Response) {
    try {
      const hash = crypto.createHmac('sha256', this.chapaWeebHookSecret).update(JSON.stringify(req.body)).digest('hex');
      if (hash == req.headers['x-chapa-signature']) {
        const event = req.body as any;
        console.log(event.status === "success")
        return
      }
    } catch (error) {
      throw new HttpException("unexpected error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }


  @Post("/pay")
  async acceptPayment(@Body() createPaymentInput: CreatePaymentInput, @Res() res: Response) {
    const payment = await this.paymentService.pendingPayment(createPaymentInput)
  }

  @Post("/confirm-payment")
  async confirmPayment(@Body() confirmPaymentInput: ConfirmPaymentInput, @Res() res: Response) {
    const payment = await this.paymentService.confirmPayment(confirmPaymentInput)
  }

}

