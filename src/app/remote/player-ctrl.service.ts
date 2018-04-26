import {Injectable} from '@angular/core';
import {File} from "../browser/domain";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class PlayerCtrlService {

  constructor(private http: HttpClient) {
  }

  public playMedia(path: string) {
    this.http.post('/api/player/play?media=' + encodeURI(path), null).subscribe();
  }

  public status(): Promise<PlayerStatus> {
    return this.http.get<PlayerStatus>('/api/player/status')
      .pipe(
        map(st => {
          st.updated = new Date();
          if (!(st.position instanceof TimePosition)) {
            st.position = null;
          }
          if (!(st.length instanceof TimePosition)) {
            st.length = null;
          }

          return st;
        })
      ).toPromise()
  }

  public executeCommand(command: string): Promise<PlayerStatus> {
    return new Promise<PlayerStatus>((resolve, reject) => {

      this.http.post("/api/player/" + command, null).subscribe(_ => {
          // Let some time to backend to proceed previous command
          setTimeout(() => {
            this.status().then(status => resolve(status)).catch(err => reject(err))
          }, 200);
        },
        err => reject(err));

    });
  }
}

export class TimePosition {
  public hours: number;
  public minutes: number;
  public seconds: number;

  public static fromTime(hours: number, minutes: number, seconds: number): TimePosition {
    let pos = new TimePosition();
    pos.hours = hours;
    pos.minutes = minutes;
    pos.seconds = seconds;

    return pos
  }

  public addSeconds(seconds: number): TimePosition {
    const minutes = Math.floor(this.minutes + (this.seconds + seconds) / 60);
    return TimePosition.fromTime(
      Math.floor(this.hours + minutes / 60),
      minutes % 60,
      Math.floor((this.seconds + seconds) % 60)
    )
  }

  public inSeconds() {
    return this.hours * 3600 + this.minutes * 60 + this.seconds;
  }

  public toString(): string {
    let hoursPrefix = this.hours > 0 ? this.hours + ':' : '';
    return hoursPrefix + this.minutes + ':' + this.seconds;
  }

  public lessThan(pos: TimePosition) {
    return this.inSeconds() <= pos.inSeconds();
  }
}

export class PlayerStatus {
  public playing: boolean;
  public paused: boolean = false;
  public media: File;

  public position: TimePosition;
  public length: TimePosition;

  // This do not come from server
  public updated: Date = new Date();
}
