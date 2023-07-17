import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @ViewChild('newTitle', {static:true}) newTitle: ElementRef;
  @ViewChild('newContent', {static:true}) newContent: ElementRef;
  @ViewChild('newButtonContent', {static:true}) newButtonContent: ElementRef;
  @ViewChild('check') checkBox;

  @Output() clickedButton = new EventEmitter;

  cardToggle:boolean = false;
  hasError:boolean = false;
  cardTitle:string = '';
  errorTitle:string = '';
  errorContent:string = '';
  errorButtonContent:string = '';
  cardContent:string = '';
  cardButton:boolean = false;
  cardButtonContent:string = '';
  buttonCreatCard:string = 'Criar Cartão';

  toggle(cardTitle:string,cardContent:string,cardButtonContent:string){

    this.hasError = false;

    if(cardTitle === '' && this.cardToggle === false){
      this.errorTitle = 'Digite um título!'
      this.hasError = true;
    }
    else{
      this.errorTitle = '';
    }
    if(cardContent === '' && this.cardToggle === false){
      this.errorContent = 'Digite um Conteúdo!'
      this.hasError = true;
    }
    else{
      this.errorContent = '';
    }
    if(cardButtonContent === '' && this.checkBox.nativeElement.checked && this.cardToggle === false){
      this.errorButtonContent = 'Digite um Conteúdo para o Botão!'
      this.hasError = true;
    }
    else{
      this.errorButtonContent = '';
    }

    if(this.hasError){
      return;
    }
    this.cardTitle = cardTitle;
    this.cardContent = cardContent;
    this.cardButtonContent = cardButtonContent;
    this.buttonCreatCard === 'Criar Cartão' ? this.buttonCreatCard = 'Ocultar Cartão' : this.buttonCreatCard = 'Criar Cartão';
    this.cardToggle === false ? this.cardToggle = true : this.cardToggle = false;
    this.newTitle.nativeElement.value = '';
    this.newContent.nativeElement.value = '';
    this.newButtonContent.nativeElement.value = '';

    if(this.buttonCreatCard === 'Criar Cartão'){
      this.clickedButton.emit(false);
    }
  
    return 
  }

  checkCheckBox(event:any){

  }

  cardButtonClicked(){
    this.clickedButton.emit(true);
  }
}
