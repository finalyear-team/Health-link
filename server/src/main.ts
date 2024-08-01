import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"
import * as CookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config()
  app.enableCors({
    origin: ['http://localhost:3000', "http://localhost:3001", "https://checkout.chapa.co"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  app.use(CookieParser())
  await app.listen(4000);
}
bootstrap();
