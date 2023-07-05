import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageService } from './image.service';
import {ImageB} from './buffer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ImageService, ImageB],
})
export class AppModule {}
