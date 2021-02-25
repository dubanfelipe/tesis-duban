import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { verifyPasswords } from 'src/app/validators/register.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }
  
  buildForm(){
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],
      Codigo: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Facultad: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Semestre: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(10), Validators.min(1)])],
      Ocupacion: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      PasswordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validators: verifyPasswords
    })
  };
  ngOnInit(): void {
    
  }  

  addRegister(form: FormGroup){
    this.createRegister(form);
  }
  createRegister(form){
      this.registerService.createRegister(form.value).subscribe(res => {
        this.router.navigate(['home']);
      })
      console.log(form.value);
  }
  verifyPasswordConfirm() {
    return this.registerForm.hasError('notEquals') && this.registerForm.get('Password').dirty && this.registerForm.get('PasswordConfirm').dirty
  }
}
