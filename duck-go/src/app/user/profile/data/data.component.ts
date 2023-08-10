import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpfValidator } from 'src/app/utils/cpf_validator';
import { CepValidator } from 'src/app/utils/cep_validator';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  profile!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.profile = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, CpfValidator.cpf]],
      cep: ['', [Validators.required, CepValidator.cep]],
      rua: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });

    this.profile.disable();
  }
}
