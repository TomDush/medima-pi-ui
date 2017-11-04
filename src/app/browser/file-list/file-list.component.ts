import {Component, Input} from '@angular/core';
import {File} from '../domain';
import {FileController} from '../file-controller.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.less']
})
export class FileListComponent {

  @Input() files: File[];
  @Input() parentFile: string;

  constructor(private fileController: FileController){}

  public isFile(file: File): boolean {
    return !file.children && !this.isPlayable(file);
  }

  public isPlayable(file: File): boolean {
    const dots = file.name.split('.');
    const ext = dots[dots.length - 1].toLowerCase();

    return ['mkv', 'mp4', 'avi'].indexOf(ext) >= 0;
  }

  public play(file: File) {
    this.fileController.playMedia(file.pathId);
  }
}
