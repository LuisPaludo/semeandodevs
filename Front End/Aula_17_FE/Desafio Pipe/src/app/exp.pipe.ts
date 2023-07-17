import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exp'
})
export class ExpPipe implements PipeTransform {

  transform(value: number, exponent: number=2): number {
    return Math.pow(value,exponent);
  }

}
