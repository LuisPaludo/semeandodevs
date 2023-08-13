import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DataComponent } from './user/profile/data/data.component';
import { HistoryComponent } from './user/profile/history/history.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './locations/location/location.component';
import { ResendEmailComponent } from './user/login/resend-email/resend-email.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'como-jogar',
    component: HowtoplayComponent,
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    children: [
      {
        path: 'dados',
        component: DataComponent,
      },
      {
        path: 'historico',
        component: HistoryComponent,
      },
    ],
  },
  {
    path: 'locais',
    component: LocationsComponent,
    children: [
      {
        path: ':id',
        component: LocationComponent,
      },
    ],
  },
  {
    path: 'reenviar-email-verificacao',
    component: ResendEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LocationComponent,]
