import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CpfValidator } from '../utils/cpf_validator';
import { SelectValidator } from '../utils/select_validator';
import { NumberValidator } from '../utils/number_validator';
import { CepValidator } from '../utils/cep_validator';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
    form!: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

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
            cpf: ['', [Validators.required, CpfValidator.cpf]],
            perfil: ['', [Validators.required, SelectValidator.select]],
            senhaAdmin: '',
            senhaVend: '',
            cep: ['', [Validators.required, CepValidator.cep]],
            rua: ['', Validators.required],
            cidade: ['', Validators.required],
            uf: ['', Validators.required],
        });

        this.subscribeForms();
    }

    subscribeForms(): void {

        this.form.get('cep')?.valueChanges.subscribe((valor) => {
            if (this.form.get('cep')?.valid) {
                this.http.get<any>('https://viacep.com.br/ws/' + valor + '/json/').subscribe(
                    data => {
                        
                        if(data.erro){
                            console.log('deu ruim')
                        }

                        console.log(data)
                        this.form.get('cidade').setValue(data?.localidade, {
                            emitEvent: false,
                        })  
                        this.form.get('rua').setValue(data?.logradouro, {
                            emitEvent: false,
                        }) 
                        this.form.get('uf').setValue(data?.uf, {
                            emitEvent: false,
                        })               
                    })
                
            }
        });    

        this.form.get('perfil')?.valueChanges.subscribe((valor) => {
            if (valor == 1) {
                this.form
                    .get('senhaAdmin')
                    ?.addValidators([Validators.required, NumberValidator.number]);
                this.form.get('senhaVend')?.clearValidators();
            } else if (valor == 2) {
                this.form
                    .get('senhaVend')
                    ?.addValidators([Validators.required, NumberValidator.number]);
                this.form.get('senhaAdmin')?.clearValidators();
            } else {
                this.form.get('senhaAdmin')?.clearValidators();
                this.form.get('senhaVend')?.clearValidators();
            }

            this.form.get('senhaAdmin')?.updateValueAndValidity({
                emitEvent: false,
            });

            this.form.get('senhaVend')?.updateValueAndValidity({
                emitEvent: false,
            });

            this.form.get('perfil')?.valueChanges.subscribe((valor) =>
                this.form.get('senhaAdmin')?.setValue('', {
                    emitEvent: false,
                })
            );

            this.form.get('perfil')?.valueChanges.subscribe((valor) =>
                this.form.get('senhaVend')?.setValue('', {
                    emitEvent: false,
                })
            );
        });
    }


    salvar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
    }
}
