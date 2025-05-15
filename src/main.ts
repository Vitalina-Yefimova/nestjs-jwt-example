import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.json());

  app.setBaseViewsDir(join(__dirname, '..', 'views')); // установка директории с шаблонами
  app.setViewEngine('hbs') // установка движка шаблонов

  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
