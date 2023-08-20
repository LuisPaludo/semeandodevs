import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './user/profile/profile.component';
import { DataComponent } from './user/profile/data/data.component';
import { HistoryComponent } from './user/profile/history/history.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './locations/location/location.component';
import { ResendEmailComponent } from './user/login/resend-email/resend-email.component';
import { TokenInterceptor } from './interceptor/token-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowtoplayComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    DataComponent,
    HistoryComponent,
    LocationsComponent,
    LocationComponent,
    ResendEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
