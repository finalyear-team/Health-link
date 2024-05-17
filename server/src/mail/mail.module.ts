// import { Module } from '@nestjs/common';
// import { MailService } from './mail.service';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { join } from 'path';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// console.log(process.env.EMAIL_USER)

// @Module({
//   imports:[
//     MailerModule.forRoot({
//       transport:{
//         host:"smtp.gmail.com",
//         secure:true,
//         auth:{
//           user:process.env.EMAIL_USER,
//           pass:process.env.EMAIL_PASSWORD

//         },
//       },
//       defaults: {
//         from: '"No Reply" <noreply@gmail.com>',
//       },
//       template: {
//         dir: join(__dirname, 'templates'),
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     }),

//   ],
//   providers: [MailService,EventEmitter2]
// })
// export class MailModule {}
