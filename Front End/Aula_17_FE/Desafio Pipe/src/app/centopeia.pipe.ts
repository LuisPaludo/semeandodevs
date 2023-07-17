import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'centopeia'
})
export class CentopeiaPipe implements PipeTransform {

  transform(value: string): string {
    let new_word:string = '';
    let aux:number = 1;

    for (var letter of value) {
      if(aux === 1){
      new_word += letter.toUpperCase()
      }
      else{
      new_word += letter.toLowerCase()
      }
      aux == 0 ? aux = 1 : aux = 0
    }

    return new_word;
  }

}
