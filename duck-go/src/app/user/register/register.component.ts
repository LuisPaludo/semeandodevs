import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { CpfValidator } from 'src/app/utils/cpf_validator';
import { SelectValidator } from 'src/app/utils/select_validator';
import { NumberValidator } from 'src/app/utils/number_validator';
import { CepValidator } from 'src/app/utils/cep_validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isDisabled: boolean = true;

  estados: { sigla: string; nome: string }[] = [
    { sigla: '', nome: '' },
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'TO', nome: 'Tocantins' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required]],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      confSenha: ['', Validators.required],
      cpf: ['', [Validators.required, CpfValidator.cpf]],
      cep: ['', [Validators.required, CepValidator.cep]],
      rua: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });

    this.subscribeForms();
    this.form.controls['cidade'].disable();
    this.form.controls['rua'].disable();
    this.form.controls['uf'].disable();
  }

  subscribeForms(): void {
    this.form.get('cep')?.valueChanges.subscribe((valor) => {
      if (this.form.get('cep')?.valid) {
        this.http
          .get<any>('https://viacep.com.br/ws/' + valor + '/json/')
          .subscribe((data) => {
            if (data.erro) {
              this.form.get('cep')?.setErrors({ incorrect: true });
              this.form.get('rua').setValue('', {
                emitEvent: false,
              });
              this.form.get('cidade').setValue('', {
                emitEvent: false,
              });
              this.form.get('uf').setValue('', {
                emitEvent: false,
              });
              this.form.controls['cidade'].disable();
              this.form.controls['rua'].disable();
              this.form.controls['uf'].disable();
              return;
            }

            this.form.controls['cidade'].enable();
            this.form.controls['rua'].enable();
            this.form.controls['uf'].enable();

            if (data?.localidade) {
              this.form.get('cidade').setValue(data?.localidade, {
                emitEvent: false,
              });
              this.form.controls['cidade'].disable();
              this.form.get('cidade')?.updateValueAndValidity({
                emitEvent: false,
              });
            }

            if (data?.logradouro) {
              this.form.get('rua').setValue(data?.logradouro, {
                emitEvent: false,
              });
              this.form.controls['rua'].disable();
              this.form.get('rua')?.updateValueAndValidity({
                emitEvent: false,
              });
            }

            if (data?.uf) {
              let estadoEncontrado = this.estados.find(
                (estado) => estado.sigla === data?.uf
              );
              this.form
                .get('uf')
                .setValue(this.estados.indexOf(estadoEncontrado), {
                  emitEvent: false,
                });
              this.form.controls['uf'].disable();
            }
          });
      }
    });

    this.form.get('confSenha')?.valueChanges.subscribe((valor) => {
      let senha = this.form.get('senha').value;
      if(valor != senha){
        this.form.get('confSenha')?.setErrors({ incorrect: true });
        return
      }
    });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    else {
      console.log('deu certo')
    }
  }

  onSubmit() {
    if (this.form?.valid) {
      console.log('deu certo')
    }
  }
}
