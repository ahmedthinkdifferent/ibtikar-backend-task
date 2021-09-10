import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envLoader from './envLoader';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

envLoader().then(() => {
  bootstrap();
});

