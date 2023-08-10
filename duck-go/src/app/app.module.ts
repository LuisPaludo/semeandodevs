import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './user/profile/profile.component';
import { DataComponent } from './user/profile/data/data.component';
import { HistoryComponent } from './user/profile/history/history.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
