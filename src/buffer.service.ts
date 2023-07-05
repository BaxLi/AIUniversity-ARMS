import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path'; 

@Injectable()
export class ImageB {
  saveImage(imageData: Buffer, imageName: string): Promise<Buffer> {
    return Promise.resolve(Buffer.from(imageData));
  }
}
