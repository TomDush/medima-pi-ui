import {Component, Input} from '@angular/core';
import {File} from '../domain';
import {FileController} from '../file-controller.service';
import {PlayerCtrlService} from "../../remote/player-ctrl.service";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.less']
})
export class FileListComponent {

  @Input() files: File[];
  @Input() parentFile: string;
  @Input() withParentLink: boolean = false;

  constructor(private fileController: FileController,
              private playerCtrlService: PlayerCtrlService){}

  public isDir(file: File): boolean {
    return file.type == 'dir';
  }

  public isPlayable(file: File): boolean {
    return file.type == 'media' && file.playable;
  }

  public play(file: File) {
    this.playerCtrlService.playMedia(file.pathId);
  }
}
