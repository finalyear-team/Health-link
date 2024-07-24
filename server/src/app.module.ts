import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

import { SocketGateway } from './socket/socket.gateway';
import { AccessControlService } from './access-control/access-control.service';
import { VideoCallModule } from './video-call/video-call.module';
import { StreamChatModule } from './stream-chat/stream-chat.module';
import { ClerkMiddleware } from './clerk.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppointmentModule } from './appointment/appointment.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SymptomCheckerModule } from './symptom-checker/symptom-checker.module';
import { SocketModule } from './socket/socket.module';
import * as nestSchedule from '@nestjs/schedule';
import { SocketService } from './socket/socket.service';
import { ForumModule } from './forum/forum.module';
import { RedisModule } from './redis/redis.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { DoctorReviewModule } from './doctor-review/doctor-review.module';
import { PaymentModule } from './payment/payment.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { JwtStrategy } from './auth/jwt.strategy ';
import { PassportModule } from '@nestjs/passport';
import { NotificationModule } from './notification/notification.module';
import { NotificationService } from './notification/notification.service';
import { PaymentService } from './payment/payment.service';
import { SharedModule } from './shared/shared.module';


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    context: ({ req, res }) => ({ req, res }),
    playground: true,
    typePaths: ["./**/*.graphql"],
  }),

  nestSchedule.ScheduleModule.forRoot(),
    PassportModule,

  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '15m' },

  }),
    ScheduleModule,
    UserModule, AuthModule, VideoCallModule, StreamChatModule, AppointmentModule, SymptomCheckerModule, SocketModule, ForumModule, RedisModule, BlogModule, CommentModule, FeedbackModule, DoctorReviewModule, PaymentModule, MailModule, NotificationModule, SharedModule,],
  providers: [AppService, AuthService, UserService, UserResolver, PrismaService, AccessControlService, MailService, JwtStrategy, JwtService, NotificationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(ClerkMiddleware).forRoutes('/video-call/*');
    // consumer.apply(ClerkMiddleware).forRoutes('/stream-chat/*');
  }

}
