import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Users } from '../../models/Users';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

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
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordone: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  };
  ngOnInit(): void {
    
  }  
  addRegister(form: FormGroup){
    this.createRegister(form);
  }
  createRegister(form){
      this.registerService.createRegister(form.value).subscribe(res => {
        console.log(res);
      })
      console.log(form.value);
  }
}
