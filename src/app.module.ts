import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PythonService } from './python.service';

// Define the AppModule, which is the root module of the application
@Module({
  // Import any necessary modules
  imports: [],
  // Declare the controllers used in the module
  controllers: [AppController],
  // Declare the services used in the module
  providers: [PythonService],
})
export class AppModule {}
