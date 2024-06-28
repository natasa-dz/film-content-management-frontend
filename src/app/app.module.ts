import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UpdateMetadataComponent } from './update-film/update-metadata.component';
import {UploadFilmComponent} from "./upload-film/upload-film.component";
import {GetMetadataComponent} from "./get-metadata/get-metadata.component";
import {RegistrationComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {SearchComponent} from "./search/search.component";
import {SubmitReviewComponent} from "./submit-review/submit-review.component";
import {DisplayReviewsComponent} from "./display-reviews/display-reviews.component";

const routes: Routes = [
  { path: 'update/:film_id', component: UpdateMetadataComponent },
  { path: 'submit-review/:film_id', component: SubmitReviewComponent },
  { path: 'upload-film', component: UploadFilmComponent },
  { path: 'get-metadata', component: GetMetadataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'search', component: SearchComponent},
  { path: 'display-reviews', component: DisplayReviewsComponent},



  // { path: '', redirectTo: '/update-film', pathMatch: 'full' }
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
