import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-browser></app-browser>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
