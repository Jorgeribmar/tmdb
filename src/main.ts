import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only this origin to send requests
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
    credentials: true, // This is important for sending secure cookies
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port, () =>
    Logger.log(`App listening on port http://localhost:${port}/graphql`),
  );
}
bootstrap();
