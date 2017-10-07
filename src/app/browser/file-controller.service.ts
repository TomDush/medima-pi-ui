import {Injectable} from '@angular/core';
import {File} from './domain';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FileController {

  constructor(private http: HttpClient) {
  }

  browseRoot(): Promise<File> {
    return new Promise(resolve => {
        this.http.get<File>('/api/browser').subscribe(data => {

          console.log('Got answer from browser: ' + data.name + ' with ' + data.children.length + ' children');
          resolve(data);
        });
      }
    );
  }
}


const files: File[] = [
  {name: 'Foo', children: []},
  {name: 'Bar', children: []}
];
