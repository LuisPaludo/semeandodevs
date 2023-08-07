// Nesta seção, estamos importando classes e funções necessárias para realizar os testes.
// CotacaoComponent é o componente que queremos testar.
// CotacaoService é o serviço que fornecerá dados de cotação.
// of é uma função do RxJS para criar observáveis ​​que emitem valores específicos.
// Cotacao é a interface/modelo que representa os dados de cotação.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CotacaoComponent } from './cotacao.component';
import { CotacaoService } from 'src/app/services/cotacao.service';
import { of } from 'rxjs';
import { Cotacao } from 'src/app/models/cotacao';

// -------------------------- Referências -------------------------
// https://medium.com/angular-in-depth/how-to-test-observables-a00038c7faad
// https://stackoverflow.com/questions/39960146/testing-error-case-with-observables-in-services
// https://www.damirscorner.com/blog/posts/20210827-TestingFailingHttpRrequestsInAngular.html
// https://testing-angular.com/testing-services/
// CHAT-GPT

describe('CotacaoComponent', () => {
    let component: CotacaoComponent;
    let fixture: ComponentFixture<CotacaoComponent>;
    let cotacaoService: jasmine.SpyObj<CotacaoService>;

    //  O bloco beforeEach é executado antes de cada teste.
    //  cotacaoServiceSpy é um "espião" criado usando jasmine.createSpyObj, permitindo simular o serviço CotacaoService
    //  com métodos espiões.
    //  TestBed.configureTestingModule configura o módulo de teste e substitui o serviço real pelo espião.
    //  fixture é uma instância de ComponentFixture que permite interagir com o componente e o DOM.
    //  component é uma instância do CotacaoComponent que podemos usar para chamar métodos do componente.
    //  cotacaoService é o serviço espião que usaremos para verificar interações com o serviço real.

    beforeEach(() => {
        const cotacaoServiceSpy = jasmine.createSpyObj('CotacaoService', [
            'buscarCotacao',
        ]);

        TestBed.configureTestingModule({
            declarations: [CotacaoComponent],
            //          providers: Nesse array, fornecemos uma simulação (spy) do serviço real
            providers: [
                //          CotacaoService usando o objeto cotacaoServiceSpy. Isso é feito para substituir o serviço real
                //          por um serviço simulado, que nos permite controlar o comportamento do serviço durante os testes.
                //          provide: É a classe ou token de serviço que estamos substituindo.
                //          useValue: É o valor (nesse caso, o serviço simulado cotacaoServiceSpy) que será fornecido no lugar
                //          do serviço real.
                { provide: CotacaoService, useValue: cotacaoServiceSpy },
            ],
        });

        // fixture: Aqui, você está criando uma instância da classe ComponentFixture, que é fornecida pelo Angular
        // Testing para interagir com componentes e o DOM durante os testes. Ela é uma espécie de "ambiente de teste"
        // para o componente. O componente é carregado neste ambiente e você pode usá-lo para interagir com as propriedades
        // e métodos do componente.

        // TestBed.createComponent(CotacaoComponent): Este é o método que cria a instância do componente CotacaoComponent
        // dentro do ambiente de teste. Isso inclui a criação do elemento DOM e a associação do componente a ele. O
        // componente em si é armazenado em component.

        // component: Aqui, você está atribuindo o componente criado à variável component. Isso permite que você acesse
        // as propriedades e métodos do componente diretamente nos testes.

        // TestBed.inject(CotacaoService): Este é um método para injetar serviços dentro do ambiente de teste. Você está
        // injetando o serviço CotacaoService, que é necessário para o funcionamento do componente. O serviço real é substituído
        // pelo espião que foi configurado anteriormente.

        // as jasmine.SpyObj<CotacaoService>: Aqui, você está utilizando uma conversão de tipo (as) para dizer ao TypeScript
        // que o serviço injetado deve ser tratado como uma instância de jasmine.SpyObj<CotacaoService>. Isso é necessário
        // para que você possa chamar os métodos espiões configurados anteriormente no serviço.

        fixture = TestBed.createComponent(CotacaoComponent);
        component = fixture.componentInstance;
        cotacaoService = TestBed.inject(
            CotacaoService
        ) as jasmine.SpyObj<CotacaoService>;
    });

    it('Quando clicar no botão, deve chamar o método buscarCotacao do cotacaoService.', () => {
        // cotacaoService: É a variável que contém o serviço espião CotacaoService.

        // .buscarCotacao: Isso se refere ao método buscarCotacao dentro do serviço CotacaoService.
        //  Como você criou um espião para esse serviço, você pode manipular o comportamento desse
        //   método durante os testes.

        // .and.returnValue: É uma parte da configuração do espião que define o valor que o método espião
        // retornará quando for chamado.

        // of({ USDBRL: { bid: 5.0 } } as Cotacao): Aqui, você está criando um observable usando a função of
        // do RxJS. Um observable é uma sequência que emite valores ao longo do tempo. Nesse caso, você está
        // emitindo um único valor que é um objeto simulado de cotação.

        // USDBRL é uma propriedade do objeto simulado que representa a cotação do dólar em relação ao real.
        // { bid: 5.0 } é um objeto que contém o valor de cotação do dólar. Nesse caso, é 5.0.
        // as Cotacao: Isso é uma conversão de tipo (type assertion) para dizer ao TypeScript que o objeto
        // simulado é do tipo Cotacao. Isso pode ser necessário para evitar erros de tipagem.

        // Resumindo, essa linha de código configura o método espião buscarCotacao para retornar um observable
        // que emite um objeto simulado de cotação quando for chamado durante os testes. Isso é feito para simular
        // o comportamento do serviço e testar como o componente reage a diferentes valores de cotação.

        cotacaoService.buscarCotacao.and.returnValue(
            of({ USDBRL: { bid: 5.0 } } as Cotacao)
        );

        const button = fixture.debugElement.query(By.css('#btn-cotacao'));
        // button.triggerEventHandler('click', null) é mais apropriado ao testar componentes Angular,
        // pois integra-se bem com o ambiente de teste e é mais controlado.
        // (button.nativeElement as HTMLButtonElement).click() é mais semelhante a como você
        // interagiria com o DOM em JavaScript puro, mas pode não ser tão preciso ou integrado ao ambiente de teste.
        button.triggerEventHandler('click', null);

        expect(cotacaoService.buscarCotacao).toHaveBeenCalled();
    });

    it('Se o valor do dólar 5.00 deve ser exibida a mensagem na tela: “Valor do dólar para hoje: R$ 5,00”', () => {
        cotacaoService.buscarCotacao.and.returnValue(
            of({ USDBRL: { bid: 5.0 } } as Cotacao)
        );
        component.buscarCotacao();
        fixture.detectChanges();

        const valorDolarElement = fixture.debugElement.query(
            By.css('#valor-dolar')
        );
        expect(valorDolarElement.nativeElement.textContent).toContain(
            'Valor do dólar para hoje:  R$5.00 '
        );
    });

    it('Se houver cotação, deve exibir o “container-cotacao”', () => {
        cotacaoService.buscarCotacao.and.returnValue(
            of({ USDBRL: { bid: 5.0 } } as Cotacao)
        );
        component.buscarCotacao();
        fixture.detectChanges();

        const cotacaoContainer = fixture.debugElement.query(
            By.css('#cotacao-container')
        );
        expect(cotacaoContainer).toBeTruthy();
    });

    // it('Se não houver cotação, não deve exibir o “container-cotacao”.', () => {
    //     cotacaoService.buscarCotacao.and.returnValue(of(false));
    //     component.buscarCotacao();
    //     fixture.detectChanges();

    //     const cotacaoContainer = fixture.debugElement.query(
    //         By.css('#cotacao-container')
    //     );
    //     expect(cotacaoContainer).toBeFalsy();
    // });
});
