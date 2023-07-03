import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
  async saveImage(imageData: Buffer, imageName: string): Promise<string> {
    const imagePath = path.join(__dirname, '..', 'uploads', imageName);
    await fs.promises.writeFile(imagePath, imageData);
    return imagePath;
  }
}
