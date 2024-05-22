import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UpdateMetadataComponent } from './update-metadata/update-metadata.component';
import {UploadFilmComponent} from "./upload-film/upload-film.component";
import {GetMetadataComponent} from "./get-metadata/get-metadata.component";

const routes: Routes = [
  { path: 'update-metadata', component: UpdateMetadataComponent },
  { path: 'upload-film', component: UploadFilmComponent },
  { path: 'get-metadata', component: GetMetadataComponent },
  // { path: '', redirectTo: '/update-metadata', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    UpdateMetadataComponent,
    GetMetadataComponent,
    UploadFilmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
