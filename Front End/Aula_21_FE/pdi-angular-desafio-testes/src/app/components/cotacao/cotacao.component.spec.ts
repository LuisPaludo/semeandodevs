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
        cotacaoSpy = spyOn(
            cotacaoService,
            'buscarCotacao'
        ).and.callThrough();

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

      it('should create the app', () => {
        expect(component).toBeTruthy();
      });

      it('Quando clicar no botão, deve chamar o método buscarCotacao do cotacaoService.', () => {
          const btn = fixture.debugElement.query(By.css('.btn-primary'));

          (btn.nativeElement as HTMLButtonElement).click();

          fixture.detectChanges();

          expect(cotacaoSpy).toHaveBeenCalled();
      });
});
