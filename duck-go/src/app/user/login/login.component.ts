import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: [
        '',
        [
          Validators.required,
        ],
      ],
    });

    // this.subscribeForms();
  }

  onSubmit() {
    if (this.login?.valid) {
      console.log('deu certo');
    } else {
      this.login.markAllAsTouched();
      return;
    }
  }
}
