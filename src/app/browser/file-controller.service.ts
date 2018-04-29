import {Injectable} from '@angular/core';
import {File} from './domain';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";

@Injectable()
export class FileController {

  constructor(private http: HttpClient) {
  }

  /** load available roots */
  public browseRoot(): Promise<File> {
    return this.http.get<File>('/api/browser').toPromise();
  }

  /** load content of a path, or details of a media */
  public browseFile(path: string): Promise<File> {
    return this.http.get<File>('/api/browser/' + encodeURI(path)).toPromise();
  }

  public search(pattern: string): Observable<File[]> {
    return this.http.get<File[]>('/api/search?pattern=' + encodeURI(pattern));
  }
}
