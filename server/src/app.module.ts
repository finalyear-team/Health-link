import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AgoraModule } from './agora/agora.module';
import { AuthService } from './auth/auth.service';
import { PaymentController } from './payment/payment.controller';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { MailService } from './mail/mail.service';
import { EventEmitter2, EventEmitterModule } from  "@nestjs/event-emitter"
import { MailModule } from './mail/mail.module';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    context:({req,res})=>({req,res}),
    playground: true,
  typePaths:["./**/*.graphql"],
    
  

  }),
  EventEmitterModule.forRoot()
  ,
  AgoraModule, UserModule, AuthModule,  MailModule],
  providers: [AppService, SocketGateway,AuthService, UserService,UserResolver, PrismaService, ],
  controllers: [PaymentController],
})
export class AppModule {
 
}
