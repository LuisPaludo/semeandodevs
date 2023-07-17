import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  types_dict = {
    'button': 'Botão',
    'checkbox': 'Check-Box',
    'color': 'Seletor de Cor',
    'date': 'Data',
    'datetime-local': 'Data e Hora Local',
    'email': 'E-mail',
    'file': 'Arquivo',
    'hidden': 'Escondido',
    'image': 'Imagem',
    'month': 'Mês',
    'number': 'Número',
    'password': 'Senha',
    'radio': 'Botão Radial',
    'range': 'Seletor de Intervalo',
    'reset': 'Reset',
    'search': 'Busca',
    'Submit': 'Submeter',
    'tel': 'Tel (?)',
    'text': 'Texto',
    'time': 'Hora',
    'url': 'Link',
    'week': 'Semana'
}

  types = [
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week'
  ]

  type:string = '';
  typeEnable:boolean = false;
  @Output() focus = new EventEmitter();
  @Output() focusMessage = new EventEmitter;

  configureType(event:any){
    this.type = this.types[event.target.value];
    this.typeEnable = true;

    if(this.type === undefined){
      this.type = '';
      this.typeEnable = false;
      this.focusMessage.emit(false);
    }
    return
  }

  focused() {
    this.focusMessage.emit(true);
    return this.focus.emit(true);
  }

  blurred() {
    this.focusMessage.emit(true);
    return this.focus.emit(false);
  }
}
