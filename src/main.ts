import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
const appEnvironment = process.env.NODE_ENV || 'local';
dotenv.config({ path: `../${appEnvironment}.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
