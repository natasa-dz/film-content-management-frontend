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
import {ConfirmSignupComponent} from "./confirm-signup/confirm-signup.component";
import {UserNavComponent} from "./user-nav/user-nav.component";
import {AdminNavComponent} from "./admin-nav/admin-nav.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {ManageSubscriptionsComponent} from "./manage-subscriptions/manage-subscriptions.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";

const routes: Routes = [
  { path: 'update/:film_id', component: UpdateMetadataComponent },
  { path: 'submit-review/:film_id', component: SubmitReviewComponent },
  { path: 'upload-film', component: UploadFilmComponent },
  { path: 'get-metadata', component: GetMetadataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'search', component: SearchComponent},
  { path: 'display-reviews', component: DisplayReviewsComponent},
  { path: 'confirm', component: ConfirmSignupComponent},
  { path: 'admin-main', component: AdminNavComponent},
  { path: 'user-main', component: UserNavComponent},
  { path: 'subscribe', component: SubscriptionComponent },
  { path: 'manage-subscriptions', component: ManageSubscriptionsComponent },








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
    RouterModule.forRoot(routes),
    UserNavComponent,
    AdminNavComponent,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('JWT_TOKEN'); // Funkcija koja vraća JWT token iz localStorage-a
        }
      }
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
