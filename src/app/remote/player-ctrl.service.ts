import {Injectable} from '@angular/core';
import {File} from "../browser/domain";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PlayerCtrlService {

  constructor(private http: HttpClient) {
  }

  public playMedia(path: string) {
    this.http.post('/api/player/play?media=' + encodeURI(path), null).subscribe();
  }

  public status(): Promise<PlayerStatus> {
    return this.http.get<PlayerStatus>('/api/player/status').toPromise()
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

  constructor(public hours: number, public minute: number, public seconds: number) {
  }

  addSeconds(seconds: number): TimePosition {
    const minutes = Math.floor(this.minute + (this.seconds + seconds) / 60);
    return new TimePosition(
      Math.floor(this.hours + minutes / 60),
      minutes % 60,
      Math.floor((this.seconds + seconds) % 60)
    )
  }

  inSeconds() {
    return this.hours * 3600 + this.minute * 60 + this.seconds;
  }

  public toString(): string {
    let hoursPrefix = this.hours > 0 ? this.hours + ':' : '';
    return hoursPrefix + this.minute + ':' + this.seconds;
  }

  lessThan(pos: TimePosition) {
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
