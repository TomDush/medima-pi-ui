import {Component, OnInit} from '@angular/core';
import {FileController} from './file-controller.service';
import {File} from './domain';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {PlayerCtrlService} from "../remote/player-ctrl.service";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.less']
})
export class BrowserComponent implements OnInit {

  file: File;

  constructor(private browserService: FileController,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const pathId = params.get('file');
        if (!pathId) {
          return this.browserService.browseRoot();
        }

        return this.browserService.browseFile(pathId);
      })
      .subscribe(file => this.file = file);
  }

  isRoot(): boolean {
    return this.file && !this.file.pathId;
  }

  splitPath(): SubPath[] {
    if (!this.file || !this.file.pathId) {
      return [];
    }

    const paths = [];
    let parentId = '';
    for (const p of this.file.pathId.split('/')) {
      parentId += '/' + p;
      paths.push(new SubPath(p, parentId));
    }

    if (paths.length <= 1) {
      return [];
    }

    return paths.slice(0, paths.length - 1);
  }
}

class SubPath {
  constructor(public name: string,
              public pathId: string) {
  }
}
