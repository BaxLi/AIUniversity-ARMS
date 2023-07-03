import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImageService } from './image.service';
import { PythonService } from './python.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ImageService, PythonService],
})
export class AppModule {}
