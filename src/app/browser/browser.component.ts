import {Component, OnInit} from '@angular/core';
import {FileController} from './file-controller.service';
import {File} from './domain';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.less']
})
export class BrowserComponent implements OnInit {

  files: File[];

  constructor(private browserService: FileController) {
  }

  ngOnInit() {
    this.browserService.browseRoot().then(home => this.files = home.children);
  }

}
