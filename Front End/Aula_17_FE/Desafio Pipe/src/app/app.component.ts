import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FiltroArrayPipe } from './filtro-array.pipe';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DatePipe, FiltroArrayPipe],
})
export class AppComponent {
    dataAtual = new Date();
    json = { pdi: 'Angular', desafio: 'Pipes' };
    tecnologias = ['Angular', 'Python', 'Java', 'Kotlin'];
    tecnologias_filtro = [''];
    texto = '';
    data_nova = '';

    constructor(private datePipe: DatePipe, private filtroArray: FiltroArrayPipe) {}

    mostrarData(): void {
        let data_nova = this.datePipe.transform(this.dataAtual,'dd-MM-yyyy')
        alert(data_nova);
    }
}
