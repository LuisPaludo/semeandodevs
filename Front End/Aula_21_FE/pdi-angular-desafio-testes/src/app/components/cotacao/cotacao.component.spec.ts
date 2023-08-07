// CRIE SEUS TESTES AQUI
import { TestBed } from '@angular/core/testing';
import { CotacaoComponent } from './cotacao.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CotacaoService } from 'src/app/services/cotacao.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { waitForAsync } from '@angular/core/testing';

describe('FormularioComponent', () => {
    let component: CotacaoComponent;
    let fixture: ComponentFixture<CotacaoComponent>;
    let cotacaoService: CotacaoService;
    let debugElement: DebugElement;
    let cotacaoSpy: any;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [CotacaoComponent],
            imports: [HttpClientModule],
            providers: [CotacaoComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CotacaoComponent);
        debugElement = fixture.debugElement;
        cotacaoService = debugElement.injector.get(CotacaoService);
        cotacaoSpy = spyOn(cotacaoService, 'buscarCotacao').and.callThrough();

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Quando clicar no botão, deve chamar o método buscarCotacao do cotacaoService.', () => {
        const btn = fixture.debugElement.query(By.css('.btn-primary'));

        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        expect(cotacaoSpy).toHaveBeenCalled();
    });

    it('Se o valor do dólar 5.00 deve ser exibida a mensagem na tela: “Valor do dólar para hoje: R$ 5,00”', () => {
        return;
    });

    it('Se não houver cotação, não deve exibir o “container-cotacao”.”', () => {
        return;
    });

    it('Se houver cotação, deve exibir o “container-cotacao”.”', waitForAsync( () => {
        const btn = fixture.debugElement.query(By.css('.btn-primary'));


        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const containerCotacao = fixture.debugElement.query(
                By.css('#cotacao-container')
            );
            expect(containerCotacao).toBeTruthy();
        });
    }));
});
