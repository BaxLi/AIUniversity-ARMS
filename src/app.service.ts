import { Injectable } from '@nestjs/common';
import{exec} from 'child_process';


const i = 10

@Injectable()
export class AppService {
  async getPredict(filepath: string): Promise<string> {
    let res = '';
    const pr = new Promise((resolve, rejects) => {
      let pythonprocess = exec ('python3 test.py ${filepath}', (error, stdout, stderr) =>{
        console.log('from exec:', stderr);
      });
      pythonprocess.stdout.on ('data', (data) =>{
        console.log('stdout:${data');
        res += data;
      })
      pythonprocess.stdout.on('end', ()=>{
        resolve(res);
      })
    });
    return(await pr) as Promise<string>;
  }
}
/*@Injectable()
export class AppServiceB {
  async getPredictB():Promise<string>{
    let res = '';
    const pr = new Promise((resolve, rejects) => {
      let pythonProcess = exec('python3 test.py', (error, stdout, stderr) => {
        console.log('from exec:', stderr);
    })
      pythonProcess.stdin.write(img);
      pythonProcess.stdin.end();
  }

}

    let pythonProcess = exec('python3 test.py', (error, stdout, stderr) => {
      if (error) {
        console.error(Ошибка выполнения скрипта: ${error});
        return;
      }
      console.log(Результат выполнения скрипта: ${stdout});
    });

    pythonProcess.stdin.write(imageData);
    pythonProcess.stdin.end();*/
