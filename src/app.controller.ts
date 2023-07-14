import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PythonService } from './python.service';

// Define the AppController class
@Controller()
export class AppController {
  // Inject PythonService into the controller
  constructor(
    private readonly pythonService: PythonService,
  ) {}

  // Define the route for the processImage method
  @Post('process-image')
  // Use the FileInterceptor middleware to handle file uploads
  @UseInterceptors(FileInterceptor('image'))
  // Define the processImage method to handle POST requests
  async processImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log('file:', file);
    // Call the runScript method of the PythonService to process the image
    const result = await this.pythonService.runScript(file.buffer);
    // Return the result of the Python script as the response
    return result;
  }
}
