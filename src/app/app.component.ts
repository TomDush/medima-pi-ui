import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <div id="content" class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}
