import { NONE_TYPE } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'
})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: string, filter: string): any {

    let index:number = 0;
    let output = null;

    for (let input of filter) {
      for (let letter of value) {
        if(letter.toLowerCase() === input.toLowerCase()) {
          index += 1;
          break
        }        
      }
      if (index === filter.length) {
        output = value;
      }
    }

    return output
    
  }

}
