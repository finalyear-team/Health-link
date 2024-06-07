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
import { EventEmitterModule } from "@nestjs/event-emitter"
// import { MailModule } from './mail/mail.module';
import { SocketGateway } from './socket/socket.gateway';
import { AccessControlService } from './access-control/access-control.service';
import { VideoCallModule } from './video-call/video-call.module';
import { StreamChatModule } from './stream-chat/stream-chat.module';
import { ClerkMiddleware } from './clerk.middleware';
import { JwtModule } from '@nestjs/jwt';
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


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    context: ({ req, res }) => ({ req, res }),
    playground: true,
    typePaths: ["./**/*.graphql"],
  }),
  nestSchedule.ScheduleModule.forRoot(),
  EventEmitterModule.forRoot()
    ,
    UserModule, AuthModule, VideoCallModule, StreamChatModule, JwtModule, AppointmentModule, ScheduleModule, SymptomCheckerModule, SocketModule, ForumModule, RedisModule, BlogModule, CommentModule, FeedbackModule, DoctorReviewModule, PaymentModule],
  providers: [AppService, SocketGateway, AuthService, UserService, UserResolver, PrismaService, AccessControlService, SocketService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(ClerkMiddleware).forRoutes('/video-call/*');
    // consumer.apply(ClerkMiddleware).forRoutes('/stream-chat/*');
  }

}
