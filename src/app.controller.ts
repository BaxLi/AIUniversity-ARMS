import { Controller, Get, Post, UploadedFile, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import {ImageService} from './image.service';
import { ImageB } from './buffer.service';
import{exec} from 'child_process';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imageService:ImageService,
    private readonly imageB:ImageB,) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async getPredict(@UploadedFile() file:Express.Multer.File):Promise<string> {
    console.log('file is: ', file);
    const imagePath=await this.imageService.saveImage(file.buffer, file.originalname);
    return await this.appService.getPredict(imagePath);
  }

  @Post('file1')
  @UseInterceptors(FileInterceptor('file'))
  async getPredictB(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const img = await this.imageB.saveImage(file.buffer, file.originalname);
    console.log(img);
    const pythonProcess = exec('python3 test.py', (error, stdout, stderr) => {
      if (error) {
        console.error('Ошибка выполнения скрипта:', {error});
        return;
      }
      console.log('Результат выполнения скрипта:', {stdout});
    });

    pythonProcess.stdin.write(img);
    pythonProcess.stdin.end();
    return 'Success';
  }
}

