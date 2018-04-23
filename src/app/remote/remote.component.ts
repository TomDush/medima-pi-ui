import {Component, OnInit} from '@angular/core';
import {File} from "../browser/domain";
import {PlayerCtrlService, PlayerStatus, TimePosition} from "./player-ctrl.service";
import {Observable} from 'rxjs/Rx';
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.less']
})
export class RemoteComponent implements OnInit {

  public playing: boolean = false;
  // derived and kept from status
  public status: PlayerStatus;

  public currentPosition$: Observable<TimePosition>;
  public progress$: Observable<number>;

  constructor(private playerCtrlService: PlayerCtrlService) {
  }

  ngOnInit() {
    this.playerCtrlService.status().then(status => {
      // MOCK
      status = new PlayerStatus();
      status.playing = true;
      status.media = new File();

      status.media.name = "Ironman II (2012)";
      status.media.realPath = "/data/Media/Movies/Avengers";
      status.position = new TimePosition(0, 0, 22);
      status.length = new TimePosition(0, 1, 0);
      // END MOCK

      // Update UI
      this.updateStatus(status);
    });

    this.startObservablesPipes()
  }

  private updateStatus(status) {
    this.status = status;
    this.playing = status.playing && status.media != null;
  }

  // Start pipes that will compute & update UI every seconds (current position)
  // TODO this.status is expected to be updated every time their is a change on the backend (stop, pause, ...) -- websockets?
  private startObservablesPipes() {
    this.currentPosition$ = Observable.interval(1000).pipe(
      // Tick all the time but do nothing if no media playing
      filter(_ => this.playing && this.status != null && !this.status.paused),

      // delta in milliseconds between last time server gave position and now
      map(_ => {
        return new Date().getTime() - this.status.updated.getTime();
      }),

      // recompute position - max to this.status.length
      map(delta => {
        let actualPosition = this.status.position.addSeconds(delta / 1000);
        return this.status.length == null || actualPosition.lessThan(this.status.length) ? actualPosition : this.status.length;
      })
    )
    ;

    this.progress$ = this.currentPosition$.pipe(
      map(current => this.status.length != null ? 100 * current.inSeconds() / this.status.length.inSeconds() : 50)
    );
  }

  public commandPlayer(command: string) {
    this.playerCtrlService.executeCommand(command).then(status => this.updateStatus(status));
  }
}
