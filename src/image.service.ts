import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path'; 

@Injectable()
export class ImageService {
    saveImage (imageData:Buffer, imageName:string) : Promise<string> {
        const imagePath = path.join (__dirname, '..', 'uploads', imageName);
        return fs.promises.writeFile(imagePath, imageData).then(()=> {return imagePath;});
    }
}
