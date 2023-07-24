import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EhParDirective } from './diretivas/eh-par/eh-par.directive';
import { TooltipDirective } from './diretivas/tooltip/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    EhParDirective,
    TooltipDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
