import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserComponent} from './browser/browser.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/browser',
    pathMatch: 'full'
  },
  {
    path: 'browser',
    component: BrowserComponent
  },
  {
    path: 'browser/:file',
    component: BrowserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
