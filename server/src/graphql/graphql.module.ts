import { Module } from '@nestjs/common';
import { GraphqlService } from './graphql.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
    }),
  ],
  providers: [GraphqlService]
})
export class GraphqlModule {}
