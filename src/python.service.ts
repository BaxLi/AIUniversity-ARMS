import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class PythonService {
  async runScript(imagePath: string): Promise<string> {
    const scriptPath = path.join(__dirname, '..', 'python_script.py');

    const process = spawn('python3', [scriptPath, imagePath]);
    let output = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      console.error(data.toString());
    });

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
