import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  registerForm: FormGroup;
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }

  get nombre() {
    return this.registerForm.get("Nombre");
  }
  get apellido() {
    return this.registerForm.get("Apellido");
  }
  get correo() {
    return this.registerForm.get("Correo");
  }
  get cedula() {
    return this.registerForm.get("Cedula");
  }
  get password() {
    return this.registerForm.get("Password");
  }

  buildForm(){
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Apellido: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑ]*.[a-zA-ZñÑ]*@(usantotomas|usta|ustabuca|ustadistancia|ustamed|ustatunja)[.](edu)[.](co)$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],
      Activo: [1],
      Recovery: [''],
      Rutina_asignada: ['NO'],
      Rol_id_rol: [1],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],      
    })
  }
  ngOnInit(): void {
  }
  addRegister(form){
    this.registerService.createRegisterPersona(form.value)
    .subscribe((data) =>{
      M.toast({
      html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
              <p>El administrador se ha registrado correctamente</p>
              <hr>
              </div>`});
      this.router.navigate(['admin/sign_in']);
    })
  }
}
