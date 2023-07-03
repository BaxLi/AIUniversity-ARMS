import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { PythonService } from './python.service';

@Controller()
export class AppController {
  constructor(
    private readonly imageService: ImageService,
    private readonly pythonService: PythonService,
  ) {}

  @Post('process-image')
  @UseInterceptors(FileInterceptor('image'))
  async processImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log('file:', file);
    const imagePath = await this.imageService.saveImage(file.buffer, file.originalname);
    const result = await this.pythonService.runScript(imagePath);
    return result;
  }
}
