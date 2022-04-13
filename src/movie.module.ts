import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({ load: [configuration] }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['**/*.graphql'],
    }),
    MovieModule,
  ],
  controllers: [],
  providers: [MovieService, MovieResolver],
  exports: [MovieService],
})
export class MovieModule {}
