import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserComponent} from './browser/browser.component';
import {RemoteComponent} from "./remote/remote.component";
import {SearchComponent} from "./search/search.component";

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
  },
  {
    path: 'remote',
    component: RemoteComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
