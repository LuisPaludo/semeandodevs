import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  cont:number = 0;

  aumentar() {
    this.cont += 1;
  }

  diminuir() {
    this.cont -= 1;

    if(this.cont <= 0){
      this.cont = 0;
    }
  }
}
