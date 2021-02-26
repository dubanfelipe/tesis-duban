import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { Usuarios } from './../../models/Usuarios';
import decode from 'jwt-decode';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var M: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuarios: Usuarios = {
    ID_USERS : 0,
    CEDULA : 0,
    NOMBRE : '',
    CODIGO : 0,
    FACULTAD : '',
    SEMESTRE : 0,
    OCUPACION : '',
  };

  editForm: FormGroup;
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }
  
  buildForm(){
    this.editForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],
      Codigo: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Facultad: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Semestre: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(10), Validators.min(1)])],
      Ocupacion: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],      
    })
  };
  ngOnInit(): void {
    const token = localStorage.getItem('usuario');
    const tokenPayload: any = decode(token);     
    this.registerService.getRegisterById(tokenPayload.id_usuario)
    .subscribe(
      res => {        
        this.usuarios = res[0] ;
        console.log("Nombre", this.usuarios);   
        this.editForm.patchValue({"Id_users": this.usuarios.ID_USERS});
        this.editForm.patchValue({"Cedula": this.usuarios.CEDULA});
        this.editForm.patchValue({"Nombre": this.usuarios.NOMBRE});  
        this.editForm.patchValue({"Codigo": this.usuarios.CODIGO});
        this.editForm.patchValue({"Facultad": this.usuarios.FACULTAD}); 
        this.editForm.patchValue({"Semestre": this.usuarios.SEMESTRE});
        this.editForm.patchValue({"Ocupacion": this.usuarios.OCUPACION});
      },
      err=> console.log(err)
    )    
  }  
  addEdit(form: FormGroup){    
    this.registerService.updateRegisterById(this.usuarios.ID_USERS,form.value)
    .subscribe (res => {
      M.toast({          
        html: `<div class="alert alert-info" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
               <h4 class="alert-heading">USUARIO EDITADO EXITOSAMENTE</h4>
               <hr>
          </div>`});
    })
    console.log(form.value);
  }

}
