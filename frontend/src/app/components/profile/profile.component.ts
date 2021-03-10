import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ESTUDIANTE } from '../../models/ESTUDIANTES';
import { USUARIO } from '../../models/USUARIOS';
import { facultades} from '../../models/Facultad';
import { roles } from '../../models/rol';
import decode from 'jwt-decode';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var M: any;
let Cargando = false;
let Valor_Rol: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuarios: USUARIO = {
    ID_PERSONA : 0,
    NOMBRE : '',
    APELLIDO : '',
    CORREO : '',
    CEDULA : 0, 
    ROL_ID_ROL : 0,
    ID_USUARIO : 0,    
    CELULAR : '',
    EDAD : 0,
    ESTATURA : 0,
    PESO : 0,
    RH : '',
    EPS : '',
    DIFICULTADES_PATOLOGICAS : '',
    FECHA_NACIMIENTO: '',
    NOMBRE_ACOMPANANTE: '',
    CELULAR_ACOMPANANTE: '',
    PARENTESCO_ACOMPANANTE: '',
  };
  estudiantes: ESTUDIANTE = {
    ID_PERSONA : 0,
    NOMBRE : '',
    APELLIDO : '',
    CORREO : '',
    CEDULA : 0, 
    ROL_ID_ROL : 0,
    ID_USUARIO : 0,    
    CELULAR : '',
    EDAD : 0,
    ESTATURA : 0,
    PESO : 0,
    RH : '',
    EPS : '',
    DIFICULTADES_PATOLOGICAS : '',
    FECHA_NACIMIENTO: '',
    NOMBRE_ACOMPANANTE: '',
    CELULAR_ACOMPANANTE: '',
    PARENTESCO_ACOMPANANTE: '',
    ID_ESTUDIANTE: 0,
    CODIGO: 0,
    SEMESTRE: 0,
    UUSUARIO_ID_USUARIO: 0,
    FACULTAD_ID_FACULTAD: 0,
  };

  editForm: FormGroup;
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
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z]*.[a-z]*@(usantotomas)[.](edu)[.](co)$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],  
      Rol_id_rol: ['', Validators.compose([Validators.required])],
    })
    this.registerUsuarioForm = this.fb.group({
      Celular: ['', Validators.compose([Validators.required, Validators.min(3000000000), Validators.max(3999999999), Validators.pattern(/^[0-9]*$/)])],
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
    })
    this.registerEstudianteForm = this.fb.group({
      Codigo: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Semestre: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10), Validators.pattern(/^[0-9]*$/)])],
      Facultad_id_facultad: ['', Validators.compose([Validators.required])]
    })
    Cargando = false;
  };
  ngOnInit(): void { 
    this.getRoles();
    this.getFacultades();
    const token = localStorage.getItem('usuario');
    const tokenPayload: any = decode(token); 
    this.registerService.getRegisterByIdUsuario(tokenPayload.cedula)  
    .subscribe(
      res => {
        this.usuarios = res[0];
        this.registerForm.patchValue({"Id_persona": this.usuarios.ID_PERSONA});
        this.registerForm.patchValue({"Nombre": this.usuarios.NOMBRE});
        this.registerForm.patchValue({"Apellido": this.usuarios.APELLIDO});  
        this.registerForm.patchValue({"Correo": this.usuarios.CORREO});
        this.registerForm.patchValue({"Cedula": this.usuarios.CEDULA}); 
        this.registerForm.patchValue({"Rol_id_rol": this.usuarios.ROL_ID_ROL});
        this.registerUsuarioForm.patchValue({"Id_usuario": this.usuarios.ID_USUARIO});
        this.registerUsuarioForm.patchValue({"Celular": this.usuarios.CELULAR});
        this.registerUsuarioForm.patchValue({"Edad": this.usuarios.EDAD});
        this.registerUsuarioForm.patchValue({"Estatura": this.usuarios.ESTATURA});
        this.registerUsuarioForm.patchValue({"Peso": this.usuarios.PESO});
        this.registerUsuarioForm.patchValue({"Rh": this.usuarios.RH});
        this.registerUsuarioForm.patchValue({"Eps": this.usuarios.EPS});
        this.registerUsuarioForm.patchValue({"Dificultades_patologicas": this.usuarios.DIFICULTADES_PATOLOGICAS});
        this.registerUsuarioForm.patchValue({"Fecha_nacimiento": this.usuarios.FECHA_NACIMIENTO});
        this.registerUsuarioForm.patchValue({"Nombre_Acompanante": this.usuarios.NOMBRE_ACOMPANANTE});
        this.registerUsuarioForm.patchValue({"Celular_Acompanante": this.usuarios.CELULAR_ACOMPANANTE});
        this.registerUsuarioForm.patchValue({"Parentesco_Acompanante": this.usuarios.PARENTESCO_ACOMPANANTE});
        Cargando=true;
      },
      err=> console.log(err)
    )
    if (tokenPayload.rol == 2) {
        this.registerService.getRegisterByIdEstudiante(tokenPayload.cedula)
      .subscribe(
        res =>{
          this.estudiantes = res[0];
          this.registerForm.patchValue({"Id_persona": this.estudiantes.ID_PERSONA});
          this.registerForm.patchValue({"Nombre": this.estudiantes.NOMBRE});
          this.registerForm.patchValue({"Apellido": this.estudiantes.APELLIDO});  
          this.registerForm.patchValue({"Correo": this.estudiantes.CORREO});
          this.registerForm.patchValue({"Cedula": this.estudiantes.CEDULA}); 
          this.registerForm.patchValue({"Rol_id_rol": this.estudiantes.ROL_ID_ROL});
          this.registerUsuarioForm.patchValue({"Id_usuario": this.estudiantes.ID_USUARIO});
          this.registerUsuarioForm.patchValue({"Celular": this.estudiantes.CELULAR});
          this.registerUsuarioForm.patchValue({"Edad": this.estudiantes.EDAD});
          this.registerUsuarioForm.patchValue({"Estatura": this.estudiantes.ESTATURA});
          this.registerUsuarioForm.patchValue({"Peso": this.estudiantes.PESO});
          this.registerUsuarioForm.patchValue({"Rh": this.estudiantes.RH});
          this.registerUsuarioForm.patchValue({"Eps": this.estudiantes.EPS});
          this.registerUsuarioForm.patchValue({"Dificultades_patologicas": this.estudiantes.DIFICULTADES_PATOLOGICAS});
          this.registerUsuarioForm.patchValue({"Fecha_nacimiento": this.estudiantes.FECHA_NACIMIENTO});
          this.registerUsuarioForm.patchValue({"Nombre_Acompanante": this.estudiantes.NOMBRE_ACOMPANANTE});
          this.registerUsuarioForm.patchValue({"Celular_Acompanante": this.estudiantes.CELULAR_ACOMPANANTE});
          this.registerUsuarioForm.patchValue({"Parentesco_Acompanante": this.estudiantes.PARENTESCO_ACOMPANANTE});
          this.registerEstudianteForm.patchValue({"Id_estudiante": this.estudiantes.ID_ESTUDIANTE});
          this.registerEstudianteForm.patchValue({"Codigo": this.estudiantes.CODIGO});
          this.registerEstudianteForm.patchValue({"Semestre": this.estudiantes.SEMESTRE});
          this.registerEstudianteForm.patchValue({"Facultad_id_facultad": this.estudiantes.FACULTAD_ID_FACULTAD});
          Cargando=true; 
        },
        err=> console.log(err)
      )      
    }     
  }  
  addRegister(form?, form2?, form3?){ 
    const token = localStorage.getItem('usuario');
    const tokenPayload: any = decode(token); 
    this.registerService.updateRegisterByIdPersona(tokenPayload.id_persona,form.value)
    .subscribe((data) =>{
        this.registerService.updateRegisterByIdUsuario(tokenPayload.id_usuario,form2.value)
        .subscribe((data) =>{
          if (form.value.Rol_id_rol == 2) {
            this.registerService.updateRegisterByIdEstudiante(tokenPayload.id_estudiante,form3.value)
            .subscribe((data) =>{
              M.toast({
                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">DATOS EDITADOS</h4>
                  <p>Se observaran los nuevos cambios al iniciar sesion nuevamente</p>
                  <hr>
              </div>`});
            })            
          } else {
            M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">DATOS EDITADOS</h4>
                <p>Se observaran los nuevos cambios al iniciar sesion nuevamente</p>
                <hr>
            </div>`});
          }
        })
    })
  }
  estudianteCargo(form){
    if (form.value.Rol_id_rol == 2) {
      return true;
    } else {
      return false;
    }    
  }
  getRoles(){
    this.registerService.getRoles()
    .subscribe(res =>{
      this.registerService.Rol = res as roles[];
    })
  }
  getFacultades() {
    this.registerService.getFacultades()
      .subscribe(res => {
        this.registerService.Facultad = res as facultades[];
      })
  }
  yaCargo() {
    if (Cargando == false) {
      return false;
    } else {
      return true;
    }
  }

}
