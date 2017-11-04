import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FileController} from './browser/file-controller.service';
import {BrowserComponent} from './browser/browser.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import { FileListComponent } from './browser/file-list/file-list.component';

// TODO Understand this annotation
@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    NavbarComponent,
    FileListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    FileController
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
