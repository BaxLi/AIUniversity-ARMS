import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Function to bootstrap the NestJS application
async function bootstrap() {
  const PORT = 3000;
  // Create an instance of the AppModule using NestFactory
  const app = await NestFactory.create(AppModule);
  // Start the server on the specified port
  await app.listen(PORT);
  console.log('🚀 ~ file: main.ts:6 Server started at port :', PORT);
}

// Call the bootstrap function to start the server
bootstrap();
