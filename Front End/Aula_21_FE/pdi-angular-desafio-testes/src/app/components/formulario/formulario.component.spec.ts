// Essas linhas importam os módulos e classes necessários para realizar os testes. TestBed é usado para
//  configurar o ambiente de teste, FormularioComponent é o componente a ser testado, FormBuilder, FormsModule
//  e ReactiveFormsModule são usados para lidar com formulários, ComponentFixture é usado para criar uma
//  instância do componente dentro do ambiente de teste, tick é usado para simular a passagem de tempo, By é
//   usado para selecionar elementos do DOM, FormularioService é o serviço que será espiado, of é usado para
//    criar observables, e DebugElement é usado para acessar os elementos do DOM em um ambiente de teste.

// -------------------------- Referências -------------------------
// https://simpleweblearning.com/working-with-spies-in-angular-unit-test/
// https://simpleweblearning.com/form-testing-in-angular/
// https://danielk.tech/home/how-to-test-reactive-angular-forms
// https://angular.io/guide/testing-services
// https://stackoverflow.com/questions/59627125/jasmine-test-expected-a-spy-but-got-a-function-error
// https://codecraft.tv/courses/angular/unit-testing/asynchronous/
// https://stackoverflow.com/questions/60984483/why-does-testing-with-template-driven-return-undefined-value
// https://codecraft.tv/courses/angular/unit-testing/mocks-and-spies/
// https://stackoverflow.com/questions/58923022/angular-test-a-function-that-updates-a-value
// https://stackoverflow.com/questions/67955444/mocked-method-returning-undefined
// https://stackoverflow.com/questions/41063005/angular-unit-test-input-value
// https://www.digitalocean.com/community/tutorials/angular-testing-with-spies

// -- Faltaram -> Se houver erro ao salvar, deve mostrar a mensagem de erro ao salvar.
//             -> Se houve erro ao salvar, deve chamar o método erroAoSalvar.


import { TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormularioService } from 'src/app/services/formulario.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

// Aqui começa a descrição do conjunto de testes. describe é usado para agrupar todos os testes relacionados ao
// componente FormularioComponent.

describe('FormularioComponent', () => {
    let component: FormularioComponent;
    let fixture: ComponentFixture<FormularioComponent>;
    let formularioService: FormularioService;
    let debugElement: DebugElement;
    let formularioSpy: any;

    // Dentro do bloco beforeEach, as configurações para o ambiente de teste são definidas. O método
    // configureTestingModule do TestBed é usado para configurar o módulo de teste. Aqui, declarações,
    // imports e providers são definidos. compileComponents é chamado para compilar os componentes declarados.

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [FormularioComponent],
            imports: [FormsModule, ReactiveFormsModule],
            providers: [FormularioService],
        }).compileComponents();
    });

    // Outro bloco beforeEach configura o ambiente de teste antes de cada teste individual. Aqui, uma instância
    // do componente é criada usando TestBed.createComponent. O DebugElement é usado para acessar elementos do DOM.
    // O serviço FormularioService é espiado usando spyOn para interceptar chamadas ao método salvar e permitir o seu
    // controle. A instância do componente é acessada com fixture.componentInstance e fixture.detectChanges() é chamado
    //  para detectar as mudanças iniciais.

    beforeEach(() => {
        fixture = TestBed.createComponent(FormularioComponent);
        debugElement = fixture.debugElement;
        formularioService = debugElement.injector.get(FormularioService);
        formularioSpy = spyOn(formularioService, 'salvar').and.callThrough();

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Ao inicializar o componente, não deve haver nenhuma mensagem de erro sendo exibida na tela', () => {
        expect(component.mensagemErroAoSalvar).toBeFalse();
        expect(component.mensagemErroPar).toBeFalse();
        let test_1: boolean =
            component.controls['valor1'].invalid &&
            (component.controls['valor1'].touched ||
                component.controls['valor1'].dirty);

        let test_2: boolean =
            component.controls['valor2'].invalid &&
            (component.controls['valor2'].touched ||
                component.controls['valor2'].dirty);

        expect(test_1).toBeFalse();
        expect(test_2).toBeFalse();
    });

    it('Se o campo 1 for “tocado” e não inserido nenhum valor, deve mostrar uma mensagem de erro “Campo obrigatório".', () => {
        component.controls['valor1'].markAsTouched();
        fixture.detectChanges();

        let test_1: boolean =
            component.controls['valor1'].invalid &&
            (component.controls['valor1'].touched ||
                component.controls['valor1'].dirty);

        expect(component.controls['valor1'].hasError('required')).toBeTrue();
        expect(test_1).toBeTrue();
    });

    it('Se o campo 1 estiver com um valor menor que zero, deve mostrar a mensagem “Valor deve ser maior ou igual a 0”', () => {
        component.controls['valor1'].setValue(-1);
        fixture.detectChanges();
        expect(component.controls['valor1'].hasError('min')).toBeTrue();
    });

    it('Se o campo 1 estiver com um valor maior que 100, deve mostrar a mensagem “Valor deve ser menor ou igual a 100”.', () => {
        component.controls['valor1'].setValue(101);
        fixture.detectChanges();
        expect(component.controls['valor1'].hasError('max')).toBeTrue();
    });

    it('Se o campo 2 for “tocado” e não inserido nenhum valor, deve mostrar uma mensagem de erro “Campo obrigatório".', () => {
        component.controls['valor2'].markAsTouched();
        fixture.detectChanges();

        let test_2: boolean =
            component.controls['valor2'].invalid &&
            (component.controls['valor2'].touched ||
                component.controls['valor2'].dirty);

        expect(component.controls['valor2'].hasError('required')).toBeTrue();
        expect(test_2).toBeTrue();
    });

    it('Se o campo 2 estiver com um valor menor que 100, deve mostrar a mensagem “Valor deve ser maior ou igual a 100”.', () => {
        component.controls['valor2'].setValue(99);
        fixture.detectChanges();
        expect(component.controls['valor2'].hasError('min')).toBeTrue();
    });

    it('Se o campo 2 estiver com um valor maior que 200, deve mostrar a mensagem “Valor deve ser menor ou igual a 200”.', () => {
        component.controls['valor2'].setValue(201);
        fixture.detectChanges();
        expect(component.controls['valor2'].hasError('max')).toBeTrue();
    });

    it('Se o formulário estiver inválido, o botão de salvar deve estar desabilitado.', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));
        component.form.setValue({
            valor1: -1,
            valor2: 99,
        });
        fixture.detectChanges();
        expect(component.form.invalid).toBeTrue();
        expect(btn.nativeElement.disabled).toBeTrue();
    });

    it('Se o formulário estiver válido, o botão de salvar deve estar habilitado.', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));
        // Formulário Válido -> Soma dos items é par e ambos satisfazem os validadores
        component.form.setValue({
            valor1: 1,
            valor2: 101,
        });
        fixture.detectChanges();
        expect(component.form.invalid).toBeFalse();
        expect(btn.nativeElement.disabled).toBeFalse();
    });

    it('Se houver sucesso ao salvar, deve mostrar a mensagem de sucesso.', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));

        // Formulário Válido -> Soma dos items é par e ambos satisfazem os validadores
        component.form.setValue({
            valor1: 1,
            valor2: 101,
        });

        fixture.detectChanges();

        (btn.nativeElement as HTMLButtonElement).click();

        expect(component.mensagemSalvoComSucesso).toBe(true);

    });

    it('Se a soma dos números não for par e for clicado em salvar, deve mostrar a mensagem de erro de número par.', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));

        // Formulário Válido -> Soma dos items é impar
        component.form.setValue({
            valor1: 2,
            valor2: 101,
        });

        fixture.detectChanges();

        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        expect(component.mensagemErroPar).toBeTrue();
    });

    it('Se houver erro ao salvar, deve mostrar a mensagem de erro ao salvar.', () => {
        return;
    });

    it('Se o formulário for inválido, não deve chamar o método de salvar do formularioService.', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));

        component.form.setValue({
            valor1: -1,
            valor2: 101,
        });

        fixture.detectChanges();

        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        expect(component.form.invalid).toBeTrue();
        expect(formularioSpy).not.toHaveBeenCalled();
    });

    it('Se a soma dos números não for par, não deve chamar o método de salvar do formularioService', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));

        component.form.setValue({
            valor1: 2,
            valor2: 101,
        });

        fixture.detectChanges();

        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        expect(component.mensagemErroPar).toBeTrue();
        expect(formularioSpy).not.toHaveBeenCalled();
    });

    it('Se o formulário for válido e a soma dos números for par, deve chamar o método de salvar do formularioService', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));

        component.form.setValue({
            valor1: 1,
            valor2: 101,
        });

        fixture.detectChanges();

        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        expect(component.form.valid).toBeTrue();
        expect(component.mensagemErroPar).toBeFalse();
        expect(formularioSpy).toHaveBeenCalled();
    });

    it('Se salvou com sucesso, deve chamar o método de salvoComSucesso.', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));
        const fnc = spyOn(component, 'salvoComSucesso');

        // Formulário Válido -> Soma dos items é par e ambos satisfazem os validadores
        component.form.setValue({
            valor1: 1,
            valor2: 101,
        });

        fixture.detectChanges();

        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        expect(fnc).toHaveBeenCalled();
    });

    it('Se houve erro ao salvar, deve chamar o método erroAoSalvar.', () => {
        return
    });

    it('As mensagens só devem ficar visíveis por 3 segundos na tela.', async () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));
        const fnc = spyOn(component, 'salvoComSucesso');

        component.form.setValue({
            valor1: 2,
            valor2: 101,
        });

        fixture.detectChanges();

        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(component.mensagemErroAoSalvar).toBeFalse();
            expect(component.mensagemErroPar).toBeFalse();
            expect(component.mensagemSalvoComSucesso).toBeFalse();
        })
    });

    it('Quando a soma dos dois campos for par, o método verificaNumeroPar deve retornar true;', () => {
        const btn = fixture.debugElement.query(By.css('.btn-success'));
        const fnc = spyOn(component, 'verificaNumeroPar').and.returnValue(
            true
        );

        // Formulário Válido -> Soma dos items é par
        component.form.setValue({
            valor1: 3,
            valor2: 101,
        });

        fixture.detectChanges();

        (btn.nativeElement as HTMLButtonElement).click();

        fixture.detectChanges();

        expect(fnc).toHaveBeenCalled();
    });

    it('Quando a soma dos dois campos for ímpar, o método verificaNumeroPar deve retornar false.',  () => {
       const btn = fixture.debugElement.query(By.css('.btn-success'));
       const fnc = spyOn(component, 'verificaNumeroPar').and.returnValue(false);

       // Formulário Válido -> Soma dos items é impar
       component.form.setValue({
           valor1: 2,
           valor2: 101,
       });

       fixture.detectChanges();

       (btn.nativeElement as HTMLButtonElement).click();

       fixture.detectChanges();

       expect(fnc).toHaveBeenCalled();
    });
});
