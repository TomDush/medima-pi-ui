import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to Medima PI</h1>
    <!-- Template end... -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
