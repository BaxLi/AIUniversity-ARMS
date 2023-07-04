import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

const i = 10

@Injectable()
export class AppService {
  async getPredict(filepath: string): Promise<string> {
    let res = '';
    const pr = new Promise((resolve, reject) => {
      let pythonprocess = exec(`python testpy.py ${filepath}`, (error, stdout, stderr) => {
        console.log('from exec: ', stderr);
        //if (stdout) resolve(stdout);
        //resolve('error');
      });
      pythonprocess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res += data;
      })
      pythonprocess.stdout.on('end', () => {
        resolve(res);
      })
    });
    return (await pr) as Promise<string>;
  }
}
