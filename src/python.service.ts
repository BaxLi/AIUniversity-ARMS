import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

// Define the PythonService class
@Injectable()
export class PythonService {
  // Define the runScript method to run the Python script with the input image data
  async runScript(imageData: Buffer): Promise<string> {
    // Construct the path to the Python script file
    const scriptPath = path.join(__dirname, '..', 'python_script.py');
    // Spawn a new Python process and pass the path to the script file as an argument
    const process = spawn('python3', [scriptPath]);

    // Pass the image data to the Python script using stdin
    process.stdin.write(imageData);
    process.stdin.end();

    // Initialize the output variable to store the output of the Python script
    let output = '';

    // Listen to the stdout and stderr streams of the Python process
    // to capture any output or error messages
    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    // Return a Promise that resolves with the output of the Python script
    // or rejects with an error if the Python process exits with a non-zero exit code
    // or encounters an error
    return new Promise<string>((resolve, reject) => {
      process.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Process exited with code ${code}`));
        } else {
          resolve(output);
        }
      });

      process.on('error', (err) => {
        reject(err);
      });
    });
  }
}
