import { Controller, Get, Post, UploadedFile, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ImageService } from './image.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imageService: ImageService,
  ) {}

/*   @Get(':numb')
  async getHello(@Param('numb') numb : number ): Promise<string> {
    console.log('numb: ', numb);
    return await this.appService.getHello(+numb);
  } */

  @Post('file')
  @UseInterceptors(FileInterceptor('file')) 
  async getPredict(@UploadedFile() file:Express.Multer.File): Promise<string> {
    console.log('file: ', file);
    const imagePath = await this.imageService.saveImage(file.buffer, file.originalname); //this line from code of Anastasia
    return await this.appService.getPredict(imagePath);
  }

}
