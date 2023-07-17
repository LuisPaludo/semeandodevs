import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exercicios-aula-dezesseis';
  clicked:boolean = false;
  showFocused:boolean = false;
  focusMessage:string = '';


  wasClicked(event:any){
    if(event){
    this.clicked = true;
    }
    else{
      this.clicked = false;
    }
  }

  wasFocused(event:any){
    if(event){
      this.focusMessage = 'Fui Focado!'
    }
    else {
      this.focusMessage = 'Fui Desfocado!'
    }
  }

  showFocusMessage(event:any){
    if(event){
      this.showFocused = true;
    }
    else{
      this.showFocused = false;
    }
  }
}
