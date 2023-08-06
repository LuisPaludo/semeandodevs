import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [{
  path: '', component: HomeComponent
}, {
  path: 'register', component:RegisterComponent
}, {
  path: 'login', component:LoginComponent
}, {
  path: 'como-jogar', component:HowtoplayComponent
}, {
  path: 'perfil-jogador', component: ProfileComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
