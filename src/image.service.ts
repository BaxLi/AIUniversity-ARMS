import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  // No need to save the image to disk
  async saveImage(imageData: Buffer, imageName: string): Promise<string> {
    return imageData.toString('base64');
  }
}
