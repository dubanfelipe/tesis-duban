import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { verifyPasswords } from 'src/app/validators/register.validator';
import { facultades } from '../../models/Facultad';
import { roles } from '../../models/rol';
import { rutinaService } from '../../services/rutina.service';
import { musculos } from '../../models/musculo';
import { subirArchivosService } from '../../services/subirArchivos.service';


declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public fileU: any;
  public fileUU: any;
  FACULTADES: facultades = {
    Id_facultad: 0,
    Nombre_facultad: ''
  }
  MUSCULOS: musculos = {
    Id_musculos: 0,
    Nombre_musculos: ''
  }
  Musculos = [
    '',
    'Abdominales',
    'Bíceps',
    'Cuádriceps',
    'Dorsal',
    'Gemelos',
    'Gluteos',
    'Hombros',
    'Isquios',
    'Músculos del antebrazo',
    'Músculos del cuello',
    'Pectoral',
    'Tríceps'
  ];
  Facultades = [
    '',
    'Administración de Empresas',
    'Comunicación Social',
    'Contaduría Pública',
    'Cultura Física, Deporte y Recreación',
    'Derecho',
    'Diseño Gráfico',
    'Economía',
    'Estadística',
    'Gobierno y Relaciones Internacionales',
    'Ingeniería Ambiental',
    'Ingeniería Civil',
    'Ingeniería de Telecomunicaciones',
    'Ingeniería Electrónica',
    'Ingeniería Industrial',
    'Ingeniería Mecánica',
    'Licenciatura en Filosofía y Letras',
    'Mercadeo',
    'Negocios Internacionales',
    'Psicología',
    'Sociología',
    'Teología',
    'Especialización',
    'Maestría',
    'Doctorado'
  ];

  tipoSangre = [];
  listDeportista = [];
  pesoEscala = [];
  registerForm: FormGroup;
  registerUsuarioForm: FormGroup;
  registerEstudianteForm: FormGroup;
  DocumentosForm: FormGroup;
  datosFormulario = new FormData();
  constructor(public RutinaService: rutinaService, public registerService: RegisterService, private router: Router, private fb: FormBuilder, public subirarchivosServico: subirArchivosService) {
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

  buildForm() {
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Apellido: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*$/)])],
      Correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ]*.[a-z A-Z ñ Ñ]*@(usantotomas)[.](edu)[.](co)$/)])],
      Cedula: ['', Validators.compose([Validators.required, Validators.min(100000), Validators.max(2000000000), Validators.pattern(/^[0-9]*$/)])],
      Activo: [0],
      Recovery: [''],
      Rutina_asignada: ['NO'],
      Rol_id_rol: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      PasswordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    }, {
      validators: verifyPasswords
    })
    this.registerUsuarioForm = this.fb.group({
      Celular: ['', Validators.compose([Validators.required, Validators.min(3000000000), Validators.max(3999999999), Validators.pattern(/^[0-9]*$/)])],
      Edad: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Estatura: ['', Validators.compose([Validators.required, Validators.min(140), Validators.max(250), Validators.pattern(/^[0-9]*$/)])],
      Peso: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      Ingreso: ['false'],
      Hora: [''],
      Rh: ['', Validators.compose([Validators.required])],
      Deportista: ['', Validators.compose([Validators.required])],
      Facultad_id_facultad: ['', Validators.compose([Validators.required])],
      EscalaPeso: ['', Validators.compose([Validators.required])],
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
    })
    this.DocumentosForm = this.fb.group({
      CarnetDocument: [{ value: '', disabled: true }, Validators.required],
      TamizajeDocument: [{ value: '', disabled: true }, Validators.required],
    })

  };
  ngOnInit(): void {
    this.getFacultades();
    this.getRoles();
    this.getRh();
    this.getDeportista();
    //this.createMusculos();
    //this.createFacultades();
    this.getEscalaPeso();
  }

  addRegister(form?, form2?, form3?, form4?) {
    if(form4.value.CarnetDocument && form4.value.TamizajeDocument){
      form.value.Correo = form.value.Correo.toLowerCase();
      this.registerService.getRegisterByIdPersonaCorreo(form.value.Correo)
        .subscribe((data) => {
          if (data[0] != null) {
            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">REGISTRO INCOMPLETO</h4>
                      <p>Ya existe un usuario registrado con este correo ${form.value.Correo}</p>
                      <hr>
                  </div>`});
          } else {
            this.registerService.getRegisterByIdPersonaCedula(form.value.Cedula)
              .subscribe((data) => {
                if (data[0] != null) {
                  M.toast({
                    html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                          <h4 class="alert-heading">REGISTRO INCOMPLETO</h4>
                          <p>Ya existe un usuario registrado con este cedula ${form.value.Cedula}</p>
                          <hr>
                      </div>`});
                } else {
                  this.registerService.getRegisterByIdUsuarioCelular(form2.value.Celular)
                    .subscribe((data) => {
                      if (data[0] != null) {
                        M.toast({
                          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                              <h4 class="alert-heading">REGISTRO INCOMPLETO</h4>
                              <p>Ya existe un usuario registrado con este celular ${form2.value.Celular}</p>
                              <hr>
                          </div>`});
                      } else {
                        if (form.value.Rol_id_rol == 2) {
                          this.registerService.getRegisterByIdEstudianteCodigo(form3.value.Codigo)
                            .subscribe((data) => {
                              if (data[0] != null) {
                                M.toast({
                                  html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                    <h4 class="alert-heading">REGISTRO INCOMPLETO</h4>
                                    <p>Ya existe un usuario registrado con este codigo ${form3.value.Codigo}</p>
                                    <hr>
                                </div>`});
                              } else {
                                this.registerService.createRegisterPersona(form.value)
                                  .subscribe((data) => {
                                    this.registerService.getRegisterByIdPersonaCedula(form.value.Cedula)
                                      .subscribe(
                                        res => {
                                          form2.value.Persona_id_persona = res[0].ID_PERSONA;
                                          this.registerService.createRegisterUsuario(form2.value)
                                            .subscribe((data) => {
                                              this.registerService.getRegisterByIdUsuarioCelular(form2.value.Celular)
                                                .subscribe(
                                                  res => {
                                                    form3.value.Usuario_id_usuario = res[0].ID_USUARIO;
                                                    this.registerService.createRegisterEstudiante(form3.value).subscribe((data) => {
                                                      let archivo = this.datosFormulario.get('archivo');
                                                      let nombreArchivo = form.value.Cedula + "_Carnet";
                                                      let tarea = this.subirarchivosServico.subirArchivos(nombreArchivo, archivo);
                                                      tarea.percentageChanges().subscribe((porcentaje) => {
                                                        if (porcentaje == 100) {
                                                          let archivoDos = this.datosFormulario.get('archivoDos');
                                                          let nombreArchivoDos = form.value.Cedula + "_Tamizaje";
                                                          let tareaDos = this.subirarchivosServico.subirArchivos(nombreArchivoDos, archivoDos);
                                                          tareaDos.percentageChanges().subscribe((porcentajeDos) => {
                                                            if (porcentajeDos == 100) {
                                                              M.toast({
                                                                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                                                <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                                                                <p>El usuario se ha registrado correctamente y espera activacion</p>
                                                                <hr>
                                                                </div>`});
                                                              this.router.navigate(['login'])
                                                            }
                                                          })
                                                        }
                                                      })
                                                    })
                                                  })
                                            })
                                        },
                                        err => console.log(err)
                                      )
                                  })
                              }
                            })
                        } else {
                          this.registerService.createRegisterPersona(form.value)
                            .subscribe((data) => {
                              this.registerService.getRegisterByIdPersonaCedula(form.value.Cedula)
                                .subscribe(
                                  res => {
                                    form2.value.Persona_id_persona = res[0].ID_PERSONA;
                                    this.registerService.createRegisterUsuario(form2.value)
                                      .subscribe((data) => {
                                        this.registerService.getRegisterByIdUsuarioCelular(form2.value.Celular)
                                          .subscribe(
                                            res => {
                                              let archivo = this.datosFormulario.get('archivo');
                                              let nombreArchivo = form.value.Cedula + "_Carnet";
                                              let tarea = this.subirarchivosServico.subirArchivos(nombreArchivo, archivo);
                                              tarea.percentageChanges().subscribe((porcentaje) => {
                                                if (porcentaje == 100) {
                                                  let archivoDos = this.datosFormulario.get('archivoDos');
                                                  let nombreArchivoDos = form.value.Cedula + "_Tamizaje";
                                                  let tareaDos = this.subirarchivosServico.subirArchivos(nombreArchivoDos, archivoDos);
                                                  tareaDos.percentageChanges().subscribe((porcentajeDos) => {
                                                    if (porcentajeDos == 100) {
                                                      M.toast({
                                                        html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                                                <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                                                                <p>El usuario se ha registrado correctamente y espera activacion</p>
                                                                <hr>
                                                                </div>`});
                                                      this.router.navigate(['login'])
                                                    }
                                                  })
                                                }
                                              })
                                            })
                                      })
                                  },
                                  err => console.log(err)
                                )
                            })
                        }
                      }
                    })
                }
              })
          }
        })
    }else{
      document.getElementById("modalDate").click();
    }    
  }

  verifyPasswordConfirm() {
    return this.registerForm.hasError('notEquals') && this.registerForm.get('Password').dirty && this.registerForm.get('PasswordConfirm').dirty
  }
  estudianteCargo(form) {
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
  getRoles() {
    this.registerService.getRoles()
      .subscribe(res => {
        this.registerService.Rol = res as roles[];
      })
  }
  public handleInputChange(e) {
    if (this.datosFormulario.get('archivo')) {
      this.datosFormulario.delete('archivo');
    }
    this.datosFormulario.append('archivo', e.target.files[0], e.target.files[0].name);
    this.DocumentosForm.controls["CarnetDocument"].patchValue(e.target.files[0].name);
  }
  public handleInputChangee(e) {
    if (this.datosFormulario.get('archivoDos')) {
      this.datosFormulario.delete('archivoDos');
    }
    this.datosFormulario.append('archivoDos', e.target.files[0], e.target.files[0].name);
    this.DocumentosForm.controls["TamizajeDocument"].patchValue(e.target.files[0].name);
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
  createMusculos() {
    for (let conteoMusculos = 1; conteoMusculos < this.Musculos.length; conteoMusculos++) {
      this.MUSCULOS.Id_musculos = conteoMusculos;
      this.MUSCULOS.Nombre_musculos = this.Musculos[conteoMusculos];
      this.RutinaService.createMusculos(this.MUSCULOS)
        .subscribe(res => {

        })
    }
  }
  createFacultades() {
    for (let conteoFacultades = 1; conteoFacultades < this.Facultades.length; conteoFacultades++) {
      this.FACULTADES.Id_facultad = conteoFacultades;
      this.FACULTADES.Nombre_facultad = this.Facultades[conteoFacultades];
      this.registerService.createFacultades(this.FACULTADES)
        .subscribe(res => {

        })
    }
  }

}
