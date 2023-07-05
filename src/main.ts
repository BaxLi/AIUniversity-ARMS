import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(PORT);
  console.log('🚀 ~ file: main.ts:6 Server started at port :', PORT);
}
bootstrap();
