import { Directive, TemplateRef, OnInit, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ehPar]'
})
export class EhParDirective{

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  @Input() set ehPar(numero: number){
    if(numero%2 == 0){
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
  
}
