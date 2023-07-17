import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'

import { AppComponent } from './app.component';
import { CentopeiaPipe } from './centopeia.pipe';
import { ExpPipe } from './exp.pipe';
import { FiltroArrayPipe } from './filtro-array.pipe';

registerLocaleData(ptBr);

@NgModule({
    declarations: [AppComponent, CentopeiaPipe, ExpPipe, FiltroArrayPipe],
    imports: [BrowserModule, FormsModule],
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }, DatePipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
