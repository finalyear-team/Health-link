import { Controller, Post, Redirect, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import { Cipher } from 'crypto';

@Controller('payment')
export class PaymentController {

    @Post("/webhook")
    async Webhook(@Req() req:Request,@Res() res:Response){
        console.log("payment success")
        console.log(req.body)         

    }

    @Post("/callback")
    async callback(@Req() req:Request,@Res() res:Response){       
    }

    @Post("/pay")
    async acceptPayment(@Req() req:Request,@Res() res:Response){
        const data = JSON.stringify({
            "amount": "100",
            "currency": "ETB",
            "email": "dawitgem@gmail.com",
            "first_name": "dawit",
            "last_name": "wondwosen",
            "phone_number": "0913176534",
            "tx_ref": "alskjdflkajsldfkjalskdjf-hf669",
            "callback_url": "http://localhost:4000/payment/webhook",
            "customization[title]": "Payment for my favourite merchant",
            "customization[description]": "I love online payments",
            "subaccounts[id]": "ac2e6b5b-0e76-464a-8c20-2d441fbaca6c"
          });
          console.log(data)
       try {
        const response=await fetch('https://api.chapa.co/v1/transaction/initialize',{
            method:"POST",
            headers:{
                'Authorization': 'Bearer CHASECK_TEST-lRFRXTl0wl4tJPelQGAA0Cq4rjSxviYA',
                'Content-Type': 'application/json'
            },
            body:data


        })
        console.log(response.status)
        const {data:response_data}=await response.json()
        console.log(response_data)
        if(response_data)
        res.send(response_data.checkout_url)
        
       } catch (error) {
        console.log(error.errors)
        
       }
    }
    
}
