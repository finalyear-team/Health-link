import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PaymentController } from './payment/payment.controller';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { EventEmitterModule } from  "@nestjs/event-emitter"
// import { MailModule } from './mail/mail.module';
import { SocketGateway } from './socket/socket.gateway';
import { AccessControlService } from './access-control/access-control.service';
import { VideoCallModule } from './video-call/video-call.module';
import { StreamChatModule } from './stream-chat/stream-chat.module';
import { ClerkMiddleware} from './clerk.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AppointmentModule } from './appointment/appointment.module';
import { ScheduleModule } from './schedule/schedule.module';
import * as nestSchedule from '@nestjs/schedule';


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    context:({req,res})=>({req,res}),
    playground: true,
    typePaths:["./**/*.graphql"],
  }),
  nestSchedule.ScheduleModule.forRoot(),
  EventEmitterModule.forRoot()
  ,
   UserModule, AuthModule, VideoCallModule, StreamChatModule,JwtModule, AppointmentModule, ScheduleModule],
  providers: [AppService, SocketGateway,AuthService, UserService,UserResolver, PrismaService, AccessControlService],
  controllers: [PaymentController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(ClerkMiddleware).forRoutes('/video-call/*');
    consumer.apply(ClerkMiddleware).forRoutes('/stream-chat/*');
  }
 
}
