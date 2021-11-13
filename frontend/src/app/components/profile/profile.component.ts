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
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuarios: USUARIO = {
    Id_persona : 0,
    Nombre : '',
    Apellido : '',
    Correo : '',
    Cedula : 0, 
    Rol_id_rol : 0,
    Id_usuario : 0,    
    Celular : '',
    Edad : 0,
    Estatura : 0,
    Peso : 0,
    Rh : '',
    Eps : '',
    Deportista : '',
    Facultdad_id_facultad: 0,
    EscalaPeso : '',
    Dificultades_patologicas : '',
    Fecha_nacimiento: '',
    Nombre_Acompanante: '',
    Celular_Acompanante: '',
    Parentesco_Acompanante: '',
  };
  estudiantes: ESTUDIANTE = {
    Id_persona : 0,
    Nombre : '',
    Apellido : '',
    Correo : '',
    Cedula : 0, 
    Rutina_asignada: '',
    Rol_id_rol : 0,
    Id_usuario : 0,    
    Celular : '',
    Edad : 0,
    Estatura : 0,
    Peso : 0,
    Rh : '',
    Eps : '',
    Deportista : '',
    Dificultades_patologicas : '',
    EscalaPeso : '',
    Fecha_nacimiento: '',
    Nombre_Acompanante: '',
    Celular_Acompanante: '',
    Parentesco_Acompanante: '',
    Id_estudiante: 0,
    Codigo: 0,
    Semestre: 0,
    Usuario_id_usuario: 0,
    Facultad_id_facultad: 0,
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
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*.[a-z A-Z ñ Ñ]*@(usantotomas)[.](edu)[.](co)$/)])],
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
        this.registerForm.patchValue({"Id_persona": this.usuarios.Id_persona});
        this.registerForm.patchValue({"Nombre": this.usuarios.Nombre});
        this.registerForm.patchValue({"Apellido": this.usuarios.Apellido});  
        this.registerForm.patchValue({"Correo": this.usuarios.Correo});
        this.registerForm.patchValue({"Cedula": this.usuarios.Cedula}); 
        this.registerForm.patchValue({"Rol_id_rol": this.usuarios.Rol_id_rol});
        this.registerUsuarioForm.patchValue({"Id_usuario": this.usuarios.Id_usuario});
        this.registerUsuarioForm.patchValue({"Celular": this.usuarios.Celular});
        this.registerUsuarioForm.patchValue({"Edad": this.usuarios.Edad});
        this.registerUsuarioForm.patchValue({"Estatura": this.usuarios.Estatura});
        this.registerUsuarioForm.patchValue({"Peso": this.usuarios.Peso});
        this.registerUsuarioForm.patchValue({"Rh": this.usuarios.Rh});
        this.registerUsuarioForm.patchValue({"Eps": this.usuarios.Eps});
        this.registerUsuarioForm.patchValue({"Dificultades_patologicas": this.usuarios.Dificultades_patologicas});
        this.registerUsuarioForm.patchValue({"Fecha_nacimiento": this.usuarios.Fecha_nacimiento});
        this.registerUsuarioForm.patchValue({"Nombre_Acompanante": this.usuarios.Nombre_Acompanante});
        this.registerUsuarioForm.patchValue({"Celular_Acompanante": this.usuarios.Celular_Acompanante});
        this.registerUsuarioForm.patchValue({"Parentesco_Acompanante": this.usuarios.Parentesco_Acompanante});
        Cargando=true;
      },
      err=> console.log(err)
    )
    if (tokenPayload.rol == 2) {
        this.registerService.getRegisterByIdEstudiante(tokenPayload.cedula)
      .subscribe(
        res =>{
          this.estudiantes = res[0];
          this.registerForm.patchValue({"Id_persona": this.usuarios.Id_persona});
          this.registerForm.patchValue({"Nombre": this.usuarios.Nombre});
          this.registerForm.patchValue({"Apellido": this.usuarios.Apellido});  
          this.registerForm.patchValue({"Correo": this.usuarios.Correo});
          this.registerForm.patchValue({"Cedula": this.usuarios.Cedula}); 
          this.registerForm.patchValue({"Rol_id_rol": this.usuarios.Rol_id_rol});
          this.registerUsuarioForm.patchValue({"Id_usuario": this.usuarios.Id_usuario});
          this.registerUsuarioForm.patchValue({"Celular": this.usuarios.Celular});
          this.registerUsuarioForm.patchValue({"Edad": this.usuarios.Edad});
          this.registerUsuarioForm.patchValue({"Estatura": this.usuarios.Estatura});
          this.registerUsuarioForm.patchValue({"Peso": this.usuarios.Peso});
          this.registerUsuarioForm.patchValue({"Rh": this.usuarios.Rh});
          this.registerUsuarioForm.patchValue({"Eps": this.usuarios.Eps});
          this.registerUsuarioForm.patchValue({"Dificultades_patologicas": this.usuarios.Dificultades_patologicas});
          this.registerUsuarioForm.patchValue({"Fecha_nacimiento": this.usuarios.Fecha_nacimiento});
          this.registerUsuarioForm.patchValue({"Nombre_Acompanante": this.usuarios.Nombre_Acompanante});
          this.registerUsuarioForm.patchValue({"Celular_Acompanante": this.usuarios.Celular_Acompanante});
          this.registerUsuarioForm.patchValue({"Parentesco_Acompanante": this.usuarios.Parentesco_Acompanante});
          this.registerEstudianteForm.patchValue({"Id_estudiante": this.estudiantes.Id_estudiante});
          this.registerEstudianteForm.patchValue({"Codigo": this.estudiantes.Codigo});
          this.registerEstudianteForm.patchValue({"Semestre": this.estudiantes.Semestre});
          this.registerEstudianteForm.patchValue({"Facultad_id_facultad": this.estudiantes.Facultad_id_facultad});
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
