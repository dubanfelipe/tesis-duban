import { Component, OnInit } from '@angular/core';
import { datosService} from '../../services/datos.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ESTUDIANTE } from '../../models/ESTUDIANTES';
import { facultades} from '../../models/Facultad';
import { roles } from '../../models/rol';

declare var M: any;
@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {  
  Cargando = false
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
  tipoSangre = [];
  listDeportista = [];
  pesoEscala = [];
  roles = [];
  facultadArray = [];
  rolEstudiante : boolean = false;
  rolAdministrador : boolean = false;
  rolOtro : boolean = false;
  NombreUsuario : string = '';
  ApellidoUsuario : string = '';
  editForm: FormGroup;
  registerForm: FormGroup;
  registerUsuarioForm: FormGroup;
  registerEstudianteForm: FormGroup;
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder, public DatosService:datosService) {
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
  get rol() {
    return this.registerForm.get("Rol_id_rol");
  }
  get password() {
    return this.registerForm.get("Password");
  }
  get passwordConfirm() {
    return this.registerForm.get("PasswordConfirm");
  }
  get celular() {
    return this.registerUsuarioForm.get("Celular");
  }
  get edad() {
    return this.registerUsuarioForm.get("Edad");
  }
  get estatura() {
    return this.registerUsuarioForm.get("Estatura");
  }
  get peso() {
    return this.registerUsuarioForm.get("Peso");
  }
  get rh() {
    return this.registerUsuarioForm.get("Rh");
  }
  get deportista() {
    return this.registerUsuarioForm.get("Deportista");
  }
  get eps() {
    return this.registerUsuarioForm.get("Eps");
  }
  get dificultades_patologicas() {
    return this.registerUsuarioForm.get("Dificultades_patologicas");
  }
  get fecha_nacimiento() {
    return this.registerUsuarioForm.get("Fecha_nacimiento");
  }
  get nombre_Acompanante() {
    return this.registerUsuarioForm.get("Nombre_Acompanante");
  }
  get celular_Acompanante() {
    return this.registerUsuarioForm.get("Celular_Acompanante");
  }
  get parentesco_Acompanante() {
    return this.registerUsuarioForm.get("Parentesco_Acompanante");
  }
  get facultad() {
    return this.registerUsuarioForm.get("Facultad_id_facultad");
  }
  get escalapeso() {
    return this.registerUsuarioForm.get("EscalaPeso");
  }
  get codigo() {
    return this.registerEstudianteForm.get("Codigo");
  }
  get semestre() {
    return this.registerEstudianteForm.get("Semestre");
  }

  buildForm(){
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Apellido: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*.[a-z A-Z ñ Ñ]*@(usantotomas)[.](edu)[.](co)$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],  
      Rutina_asignada: [{ value: '', disabled: true },],
      Rol_id_rol: [{ value: '', disabled: true },],      
    })
    this.registerUsuarioForm = this.fb.group({
      Celular: ['', Validators.compose([Validators.required, Validators.min(3000000000), Validators.max(3999999999), Validators.pattern(/^[0-9]*$/)])],
      Edad: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Estatura: ['', Validators.compose([Validators.required, Validators.min(140), Validators.max(250), Validators.pattern(/^[0-9]*$/)])],
      Peso: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Rh: ['', Validators.compose([Validators.required])],
      Deportista: ['', Validators.compose([Validators.required])],
      Facultad_id_facultad: ['', Validators.compose([Validators.required])],
      EscalaPeso: ['', Validators.compose([Validators.required])],
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
    })
  };
  async ngOnInit() { 
    await this.getFacultades();    
    await this.getRh();
    await this.getDeportista();
    await this.getEscalaPeso();       
  }  
  addRegister(form?, form2?, form3?){ 
    form.value.Rutina_asignada = this.estudiantes.Rutina_asignada;
    form.value.Rol_id_rol = this.estudiantes.Rol_id_rol;
    form.value.Correo = form.value.Correo.toLowerCase();
    if (form.value.Rol_id_rol != 1) {    
      for (let index = 0; index < this.facultadArray[0].length; index++) {
        if(this.facultadArray[0][index].Nombre_facultad === form2.value.Facultad_id_facultad){
          form2.value.Facultad_id_facultad = this.facultadArray[0][index].Id_facultad;
        }        
      }  
    }
    this.registerService.getRegisterByIdPersonaCorreo(form.value.Correo)
    .subscribe((data) => {
      if ((data[0] != undefined) && (data[0].Id_persona != this.estudiantes.Id_persona)) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">ACTUALIZACIÓN INCOMPLETA</h4>
                  <p>Ya existe un usuario registrado con este correo ${form.value.Correo}</p>
                  <hr>
              </div>`});
      }else{
        this.registerService.getRegisterByIdPersonaCedula(form.value.Cedula)
        .subscribe((data) => {
            if ((data[0] != undefined) && (data[0].Id_persona != this.estudiantes.Id_persona)) {
              M.toast({
                html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">ACTUALIZACIÓN INCOMPLETA</h4>
                      <p>Ya existe un usuario registrado con este documento ${form.value.Cedula}</p>
                      <hr>
                  </div>`});
            }
          else{
            if (form.value.Rol_id_rol == 1) {
              this.registerService.updateRegisterByIdPersona(this.estudiantes.Id_persona,form.value)
              .subscribe((data) =>{
                M.toast({
                  html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                    <h4 class="alert-heading">DATOS EDITADOS</h4>
                    <p>Se observaran los nuevos cambios al usuario iniciar sesion nuevamente</p>
                    <hr>
                </div>`});
              })
            }else{
              this.registerService.getRegisterByIdUsuarioCelular(form2.value.Celular)
              .subscribe((data) => {
                if ((data[0] != undefined) && (data[0].Id_usuario != this.estudiantes.Id_usuario)) {
                  M.toast({
                    html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">REGISTRO INCOMPLETO</h4>
                      <p>Ya existe un usuario registrado con este celular ${form2.value.Celular}</p>
                      <hr>
                    </div>`});
                }else{
                  if(form.value.Rol_id_rol == 2){
                    this.registerService.getRegisterByIdEstudianteCodigo(form3.value.Codigo)
                    .subscribe((data) => {
                      if ((data[0] != undefined) && (data[0].Id_estudiante != this.estudiantes.Id_estudiante)) {
                        M.toast({
                          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                            <h4 class="alert-heading">REGISTRO INCOMPLETO</h4>
                            <p>Ya existe un usuario registrado con este codigo ${form3.value.Codigo}</p>
                            <hr>
                        </div>`});
                      }
                      else{
                        this.registerService.updateRegisterByIdPersona(this.estudiantes.Id_persona,form.value)
                        .subscribe((data) =>{
                          this.registerService.updateRegisterByIdUsuario(this.estudiantes.Id_usuario,form2.value)
                          .subscribe((data) =>{
                            this.registerService.updateRegisterByIdEstudiante(this.estudiantes.Id_estudiante,form3.value)
                            .subscribe((data) =>{
                              M.toast({
                                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                  <h4 class="alert-heading">DATOS EDITADOS</h4>
                                  <p>Se observaran los nuevos cambios al usuario iniciar sesion nuevamente</p>
                                  <hr>
                              </div>`});
                            })
                          })
                        })
                      }
                    })
                  }else{
                    this.registerService.updateRegisterByIdPersona(this.estudiantes.Id_persona,form.value)
                    .subscribe((data) =>{
                      this.registerService.updateRegisterByIdUsuario(this.estudiantes.Id_usuario,form2.value)
                      .subscribe((data) =>{
                        M.toast({
                          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                            <h4 class="alert-heading">DATOS EDITADOS</h4>
                            <p>Se observaran los nuevos cambios al usuario iniciar sesion nuevamente</p>
                            <hr>
                        </div>`});
                      })
                    })
                  }
                }
              })              
            }
          }
        })
      }
    })
  }

  async getFacultades() {
    this.registerService.getFacultades()
      .subscribe(async res => {
        this.facultadArray[0] = res;
        await this.getRoles();
      })
  }
  async getRoles() {
    this.registerService.getRoles()
    .subscribe( async res => {
      this.roles[0] = res;    
      await this.Datos(); 
    })
  }
  async Datos(){
    if (this.DatosService.Value_Cedula == undefined) {
      this.router.navigate(['admin/users']);
    } else {
      if (this.DatosService.Value_Rol == 'Estudiante') {
        this.rolEstudiante = true;
        this.rolOtro = true;
        this.registerService.getRegisterByIdEstudiante(this.DatosService.Value_Cedula)
        .subscribe(
          res =>{
            this.estudiantes = res[0];
            this.NombreUsuario = this.estudiantes.Nombre;
            this.ApellidoUsuario = this.estudiantes.Apellido;
            this.registerForm.patchValue({"Id_persona": this.estudiantes.Id_persona});
            this.registerForm.patchValue({"Nombre": this.estudiantes.Nombre});
            this.registerForm.patchValue({"Apellido": this.estudiantes.Apellido});  
            this.registerForm.patchValue({"Correo": this.estudiantes.Correo});
            this.registerForm.patchValue({"Cedula": this.estudiantes.Cedula}); 
            this.registerForm.patchValue({"Rutina_asignada": this.estudiantes.Rutina_asignada});
            this.registerForm.patchValue({"Rol_id_rol": this.roles[0][this.estudiantes.Rol_id_rol-1].Nombre_rol}); 
            this.registerUsuarioForm.patchValue({"Id_usuario": this.estudiantes.Id_usuario});
            this.registerUsuarioForm.patchValue({"Celular": this.estudiantes.Celular});
            this.registerUsuarioForm.patchValue({"Edad": this.estudiantes.Edad});
            this.registerUsuarioForm.patchValue({"Estatura": this.estudiantes.Estatura});
            this.registerUsuarioForm.patchValue({"Peso": this.estudiantes.Peso});
            this.registerUsuarioForm.patchValue({"Rh": this.estudiantes.Rh});
            this.registerUsuarioForm.patchValue({"Deportista": this.estudiantes.Deportista});
            this.registerUsuarioForm.patchValue({"Facultad_id_facultad": this.facultadArray[0][this.estudiantes.Facultad_id_facultad-1].Nombre_facultad});
            this.registerUsuarioForm.patchValue({"EscalaPeso": this.estudiantes.EscalaPeso});
            this.registerUsuarioForm.patchValue({"Eps": this.estudiantes.Eps});
            this.registerUsuarioForm.patchValue({"Dificultades_patologicas": this.estudiantes.Dificultades_patologicas});
            this.registerUsuarioForm.patchValue({"Fecha_nacimiento": this.estudiantes.Fecha_nacimiento});
            this.registerUsuarioForm.patchValue({"Nombre_Acompanante": this.estudiantes.Nombre_Acompanante});
            this.registerUsuarioForm.patchValue({"Celular_Acompanante": this.estudiantes.Celular_Acompanante});
            this.registerUsuarioForm.patchValue({"Parentesco_Acompanante": this.estudiantes.Parentesco_Acompanante});
            this.registerEstudianteForm.patchValue({"Id_estudiante": this.estudiantes.Id_estudiante});
            this.registerEstudianteForm.patchValue({"Codigo": this.estudiantes.Codigo});
            this.registerEstudianteForm.patchValue({"Semestre": this.estudiantes.Semestre});
            this.Cargando=true; 
          },
          err=> console.log(err)
        )      
      } else if (this.DatosService.Value_Rol == 'Administrador'){
        this.registerService.getRegisterByIdPersonaCedula(this.DatosService.Value_Cedula) 
        .subscribe(
          res => {
            this.estudiantes = res[0];    
            this.rolAdministrador = true;  
            this.NombreUsuario = this.estudiantes.Nombre;
            this.ApellidoUsuario = this.estudiantes.Apellido;
            this.registerForm.patchValue({"Id_persona": this.estudiantes.Id_persona});
            this.registerForm.patchValue({"Nombre": this.estudiantes.Nombre});
            this.registerForm.patchValue({"Apellido": this.estudiantes.Apellido});  
            this.registerForm.patchValue({"Correo": this.estudiantes.Correo});
            this.registerForm.patchValue({"Cedula": this.estudiantes.Cedula}); 
            this.registerForm.patchValue({"Rutina_asignada": this.estudiantes.Rutina_asignada}); 
            this.registerForm.patchValue({"Rol_id_rol": this.roles[0][this.estudiantes.Rol_id_rol-1].Nombre_rol});            
            this.Cargando=true; 
          },
          err=> console.log(err)
        )      
      }else {
        this.rolEstudiante = false;
        this.rolOtro = true;
        this.registerService.getRegisterByIdUsuario(this.DatosService.Value_Cedula)  
        .subscribe(
          res => {
            this.estudiantes = res[0];            
            this.NombreUsuario = this.estudiantes.Nombre;
            this.ApellidoUsuario = this.estudiantes.Apellido;
            this.registerForm.patchValue({"Id_persona": this.estudiantes.Id_persona});
            this.registerForm.patchValue({"Nombre": this.estudiantes.Nombre});
            this.registerForm.patchValue({"Apellido": this.estudiantes.Apellido});  
            this.registerForm.patchValue({"Correo": this.estudiantes.Correo});
            this.registerForm.patchValue({"Cedula": this.estudiantes.Cedula}); 
            this.registerForm.patchValue({"Rutina_asignada": this.estudiantes.Rutina_asignada}); 
            this.registerForm.patchValue({"Rol_id_rol": this.roles[0][this.estudiantes.Rol_id_rol-1].Nombre_rol});
            this.registerUsuarioForm.patchValue({"Id_usuario": this.estudiantes.Id_usuario});
            this.registerUsuarioForm.patchValue({"Celular": this.estudiantes.Celular});
            this.registerUsuarioForm.patchValue({"Edad": this.estudiantes.Edad});
            this.registerUsuarioForm.patchValue({"Estatura": this.estudiantes.Estatura});
            this.registerUsuarioForm.patchValue({"Peso": this.estudiantes.Peso});
            this.registerUsuarioForm.patchValue({"Rh": this.estudiantes.Rh});
            this.registerUsuarioForm.patchValue({"Deportista": this.estudiantes.Deportista});
            this.registerUsuarioForm.patchValue({"Facultad_id_facultad": this.facultadArray[0][this.estudiantes.Facultad_id_facultad-1].Nombre_facultad});
            this.registerUsuarioForm.patchValue({"EscalaPeso": this.estudiantes.EscalaPeso});
            this.registerUsuarioForm.patchValue({"Eps": this.estudiantes.Eps});
            this.registerUsuarioForm.patchValue({"Dificultades_patologicas": this.estudiantes.Dificultades_patologicas});
            this.registerUsuarioForm.patchValue({"Fecha_nacimiento": this.estudiantes.Fecha_nacimiento});
            this.registerUsuarioForm.patchValue({"Nombre_Acompanante": this.estudiantes.Nombre_Acompanante});
            this.registerUsuarioForm.patchValue({"Celular_Acompanante": this.estudiantes.Celular_Acompanante});
            this.registerUsuarioForm.patchValue({"Parentesco_Acompanante": this.estudiantes.Parentesco_Acompanante});
            this.Cargando=true;
          },
          err=> console.log(err)
        )
      }
    }
  }
  getRh() {
    this.tipoSangre[0] = "O -";
    this.tipoSangre[1] = "O +";
    this.tipoSangre[2] = "A -";
    this.tipoSangre[3] = "A +";
    this.tipoSangre[4] = "B -";
    this.tipoSangre[5] = "B +";
    this.tipoSangre[6] = "AB -";
    this.tipoSangre[7] = "AB +";
  }
  getDeportista() {
    this.listDeportista[0] = "Ninguno";
    this.listDeportista[1] = "Fútbol";
    this.listDeportista[2] = "Voleibol";
    this.listDeportista[3] = "Baloncesto";
    this.listDeportista[4] = "Últimate";
    this.listDeportista[5] = "Rugby";
    this.listDeportista[6] = "Tenis de campo";
    this.listDeportista[7] = "Taekwondo";
    this.listDeportista[8] = "Atletismo";
    this.listDeportista[9] = "Defensa personal";
    this.listDeportista[10] = "Ciclismo";
    this.listDeportista[11] = "Alta intensidad";
  }
  getEscalaPeso() {
    this.pesoEscala[0] = "A1";
    this.pesoEscala[1] = "A2";
    this.pesoEscala[2] = "A3";
    this.pesoEscala[3] = "B1";
    this.pesoEscala[4] = "B2";
    this.pesoEscala[5] = "C1";
  }  
}
