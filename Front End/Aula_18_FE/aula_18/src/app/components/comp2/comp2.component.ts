import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component {

  ngOnInit() {
    this.somar(10,10)
  }

  somar(a: number, b: number):number {
    return a + b;
  }
}
