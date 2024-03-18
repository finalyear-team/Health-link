import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { GraphqlModule } from './cats/graphql/graphql.module';
import { AgoraModule } from './agora/agora.module';
import { SocketGateway } from './socket/socket.gateway';
import { JwtModule } from './jwt/jwt.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [GraphqlModule, AgoraModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway, AuthService],
})
export class AppModule {}
