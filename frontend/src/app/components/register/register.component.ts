import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { verifyPasswords } from 'src/app/validators/register.validator';

declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerUsuarioForm: FormGroup;
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }
  buildForm(){
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Apellido: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z]*.[a-z]*@(usantotomas)[.](edu)[.](co)$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],
      Celular: ['', Validators.compose([Validators.required, Validators.min(3000000000), Validators.max(3999999999), Validators.pattern(/^[0-9]*$/)])],
      Rol_id_rol: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      PasswordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],      
    }, {
      validators: verifyPasswords
    })
    this.registerUsuarioForm = this.fb.group({
      Edad: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Estatura: ['', Validators.compose([Validators.required, Validators.min(140), Validators.max(250),Validators.pattern(/^[0-9]*$/)])],
      Peso: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Rh: ['', Validators.compose([Validators.required])],
      Eps: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Dificultades_patologicas: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Fecha_nacimiento: ['', Validators.compose([Validators.required])],
      Nombre_Acompanante: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Celular_Acompanante: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Parentesco_Acompanante: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Activo: ['0']
    })
  };
  ngOnInit(): void {
    
  }  

  addRegister(form?, form2?){
    this.registerService.createRegisterPersona(form.value).subscribe((data) =>{
      this.registerService.getRegisterByIdPersona(form.value.Cedula)
      .subscribe(
        res => {          
          form2.value.Persona_id_persona = res[0].ID_PERSONA;
          console.log("me llegooo",res[0].ID_PERSONA);
          this.registerService.createRegisterUsuario(form2.value).subscribe((data) =>{
            M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                      <p>El usuario se ha registrado correctamente y espera activacion</p>
                      <hr>
                  </div>`});
            this.router.navigate(['home'])
          })
        },
        err=> console.log(err)
      )
    })
    
  }
  
  verifyPasswordConfirm() {
    return this.registerForm.hasError('notEquals') && this.registerForm.get('Password').dirty && this.registerForm.get('PasswordConfirm').dirty
  }
}
