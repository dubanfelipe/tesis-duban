import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { verifyPasswords } from 'src/app/validators/register.validator';
import { facultades } from '../../models/Facultad';
import { roles } from '../../models/rol';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerUsuarioForm: FormGroup;
  registerEstudianteForm: FormGroup;
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }
  buildForm(){
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Apellido: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*.[a-z A-Z ñ Ñ]*@(usantotomas)[.](edu)[.](co)$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],
      Activo: [0],
      Recovery: [''],
      Rol_id_rol: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      PasswordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],       
    }, {
      validators: verifyPasswords
    })
    this.registerUsuarioForm = this.fb.group({
      Celular: ['', Validators.compose([Validators.required, Validators.min(3000000000), Validators.max(3999999999), Validators.pattern(/^[0-9]*$/)])],
      Edad: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Estatura: ['', Validators.compose([Validators.required, Validators.min(140), Validators.max(250),Validators.pattern(/^[0-9]*$/)])],
      Peso: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Ingreso: ['false'],
      Hora: [''],
      Rh: ['', Validators.compose([Validators.required])],
      Eps: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Sede_id_sede: [1],
      Dificultades_patologicas: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Fecha_nacimiento: ['', Validators.compose([Validators.required])],
      Nombre_Acompanante: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Celular_Acompanante: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Parentesco_Acompanante: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
    })
    this.registerEstudianteForm = this.fb.group({
      Codigo: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Semestre: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10), Validators.pattern(/^[0-9]*$/)])],
      Facultad_id_facultad: ['', Validators.compose([Validators.required])]
    })
  };
  ngOnInit(): void {
    this.getFacultades();
    this.getRoles();
  }  

  addRegister(form?, form2?, form3?){
    this.registerService.createRegisterPersona(form.value)
    .subscribe((data) =>{
      this.registerService.getRegisterByIdPersonaCedula(form.value.Cedula)
      .subscribe(
        res => {  
          form2.value.Persona_id_persona = res[0].ID_PERSONA;
          this.registerService.createRegisterUsuario(form2.value)
          .subscribe((data) =>{                  
            if (form.value.Rol_id_rol == 2) {            
              this.registerService.getRegisterByIdUsuarioCelular(form2.value.Celular)              
              .subscribe(
                  res => {
                    form3.value.Usuario_id_usuario = res[0].ID_USUARIO;
                    this.registerService.createRegisterEstudiante(form3.value).subscribe((data) =>{
                      M.toast({
                      html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                                <p>El usuario se ha registrado correctamente y espera activacion</p>
                                <hr>
                            </div>`});
                      this.router.navigate(['home'])
                   })
                })
            } else {            
              M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                        <p>El usuario se ha registrado correctamente y espera activacion</p>
                        <hr>
                    </div>`});
              this.router.navigate(['home'])
            }
          })                              
        },
        err=> console.log(err)
      )
    })    
  }
  
  verifyPasswordConfirm() {
    return this.registerForm.hasError('notEquals') && this.registerForm.get('Password').dirty && this.registerForm.get('PasswordConfirm').dirty
  }
  estudianteCargo(form){
    if (form.value.Rol_id_rol == 2) {
      return true;
    } else {
      return false;
    }    
  }
  getFacultades() {
    this.registerService.getFacultades()
      .subscribe(res => {
        this.registerService.Facultad = res as facultades[];
      })
  }
  getRoles(){
    this.registerService.getRoles()
    .subscribe(res =>{
      this.registerService.Rol = res as roles[];
    })
  }

}
