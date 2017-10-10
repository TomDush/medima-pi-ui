import {Injectable} from '@angular/core';
import {File} from './domain';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FileController {

  constructor(private http: HttpClient) {
  }

  browseRoot(): Promise<File> {
    return this.http.get<File>('/api/browser').toPromise();
  }

  browseFile(path: string): Promise<File> {
    return this.http.get<File>('/api/browser/' + encodeURI(path)).toPromise();
  }
}
