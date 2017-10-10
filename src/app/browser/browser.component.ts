import {Component, OnInit} from '@angular/core';
import {FileController} from './file-controller.service';
import {File} from './domain';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.less']
})
export class BrowserComponent implements OnInit {

  file: File;

  constructor(private browserService: FileController,
              private route: ActivatedRoute,
              private location: Location) {
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

  browseTo(pathId: string) {
    this.browserService.browseFile(pathId).then(file => this.file = file);
  }

  previous(): void {
    this.location.back();
  }
}
