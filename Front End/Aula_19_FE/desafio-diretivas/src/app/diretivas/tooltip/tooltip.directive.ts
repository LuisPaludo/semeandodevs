import { Directive, ElementRef, Host, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

declare var bootstrap: any;

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {

  // Inputs que o usuário pode fornecer
  @Input() corTexto = '#fff';
  @Input() texto = '';
  @Input() corBackground = '#000';

  // Variável para mudar o tamanho da fonte
  cont: number = 12;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  // Host Bindings da cor de fundo e to tamanho da fonte
  @HostBinding('style.backgroundColor') backgroundColor!: string;
  @HostBinding('style.fontSize') fontSize!: string;

  // Evento para ouvir o mouse passando encima do elemento
  @HostListener('mouseover') onMouseOver(): void {
    // Inserção da marcação amarela
    this.backgroundColor = 'mark';

    // Adicionando o tooltip
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-bs-toggle', 'tooltip');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-bs-placement', 'top');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'title', this.texto);

    // Script para acionar o tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

  }

  // Evento para ouvir o mouse saindo de cima do elemento
  @HostListener('mouseleave') onMouseLeave(): void {
    // Setando a cor para o padrão após o mouse sair de cima
    this.backgroundColor = this.corBackground;

    // Removendo os atributos do tooltip
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'data-bs-toggle');
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'data-bs-placement');
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'title');
  }

  // Evento para ouvir a rodinha do mouse e aumentar ou diminuir a fonte
  @HostListener("wheel", ["$event"]) onScroll(event: any) {
    if (event.deltaY > 0) {
      this.cont = this.cont - 1;
      if (this.cont <= 1) {
        this.cont = 1;
      }
      this.fontSize = this.cont + 'px';
    } else if (event.deltaY < 0) {
      this.cont = this.cont + 1;
      this.fontSize = this.cont + 'px';
    }
  }

  ngOnInit(): void {
    this.backgroundColor = this.corBackground;
    this.elementRef.nativeElement.style.color = this.corTexto;    
  }

}
