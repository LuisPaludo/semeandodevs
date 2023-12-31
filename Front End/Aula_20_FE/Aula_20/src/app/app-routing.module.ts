import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AgradecimentoComponent } from './agradecimento/agradecimento.component';

const routes: Routes = [{
  path: 'cadastro', component: CadastroComponent,  
}, {
  path: 'obrigado', component: AgradecimentoComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
