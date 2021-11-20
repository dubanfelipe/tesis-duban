import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { rutinaService } from '../../services/rutina.service';
import { EJERCICIO } from '../../models/EJERCICIOS';
import { musculos } from '../../models/musculo';
import { dato } from '../../models/datos';
import { subirArchivosService } from '../../services/subirArchivos.service';

declare var M: any;
let listaMusculos;
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  public datos: dato[] = [];
  public objeto: any;
  public URL;
  yaCargo = false;
  datosEjercicio;
  DocumentosForm: FormGroup;
  EjerciciosForm: FormGroup;
  datosFormulario = new FormData();
  NombreEjercicio;
  constructor(public RutinaService: rutinaService, private router: Router, private fb: FormBuilder, public subirarchivosServico: subirArchivosService) {
    this.buildForm();
    this.datos = new Array<dato>();
  }
  settings = {
    actions: {
      position: 'right',
      custom: [{
        name: 'activateAction',
        title: '<i class="material-icons">visibility</i>',
      },]
    },
    add: {
      addButtonContent: '<i class="material-icons">add</i>',
      createButtonContent: '<i class="material-icons">check_circle</i>',
      cancelButtonContent: '<i class="material-icons">cancel</i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="material-icons">edit</i>',
      saveButtonContent: '<i class="material-icons">save</i>',
      cancelButtonContent: '<i class="material-icons">cancel</i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="material-icons">delete</i>',
      saveButtonContent: '<i class="material-icons">save</i>',
      cancelButtonContent: '<i class="material-icons">cancel</i>',
      confirmDelete: true,
    },
    columns: {
      Nombre: {
        title: 'Nombre',
      },
      Serie: {
        title: 'No de series',
      },
      Repeticion: {
        title: 'No de repeticiones',
      },
      Tiempo_descanso: {
        title: 'Tiempo de descanso en seg',
      },
      Nombre_musculos: {
        title: 'Musculo',
        editor: {
          type: 'list',
          selectText: 'Select...',
          config: {
            list: new Array
          }
        },
        add: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: new Array
          }
        },
      },
    },
  };
  onCustom(event) {
    if (event.action == "activateAction") {
      this.NombreEjercicio = event.data.Nombre;
      let nombreArchivo = event.data.Id_ejercicio + "_ImagenEjercicio";
      let referencia = this.subirarchivosServico.getUrlArchivo(nombreArchivo);
      referencia.getDownloadURL().subscribe((URL) => {
        this.URL = URL;
        this.EjerciciosForm.patchValue({
          Nombre: event.data.Nombre,
          Series: event.data.Serie,
          Repeticiones: event.data.Repeticion,
          tiempoDescanso: event.data.Tiempo_descanso,
          Musculo: event.data.Nombre_musculos,
        });
        document.getElementById("modalVisibility").click();
      }, (error) => {
        console.log(error)
      });    
    }
  }
  onCreateConfirm(event) {
    if (event.newData.Serie >= 0 && event.newData.Serie <= 99) {
      if (event.newData.Repeticion >= 0 && event.newData.Repeticion <= 99) {
        if (event.newData.Tiempo_descanso >= 0 && event.newData.Tiempo_descanso <= 300) {
          if (event.newData.Nombre_musculos >= 1 && event.newData.Nombre_musculos <= 12) {
            this.datosEjercicio = event.newData;
            this.DocumentosForm.patchValue({
              EjercicioImagen: null
            });
            document.getElementById("modalNotificacion").click();
          }
        }
      }
    } else {
      M.toast({
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">ERROR CREANDO EJERCICIO</h4>
            <p>No cumple con las parametros</p>
            <hr>
      </div>`});
    }
  }
  onSaveConfirm(event) {
    event.newData.Serie = parseInt(event.newData.Serie);
    event.newData.Repeticion = parseInt(event.newData.Repeticion);
    event.newData.Tiempo_descanso = parseInt(event.newData.Tiempo_descanso);
    if (event.newData.Serie >= 0 && event.newData.Serie <= 99) {
      if (event.newData.Repeticion >= 0 && event.newData.Repeticion <= 99) {
        if (event.newData.Tiempo_descanso >= 0 && event.newData.Tiempo_descanso <= 300) {
          if (event.newData.Nombre_musculos >= 1 && event.newData.Nombre_musculos <= 12) {
            this.datosEjercicio = event.newData;
            let nombreArchivo = event.newData.Id_ejercicio + "_ImagenEjercicio";
            let referencia = this.subirarchivosServico.getUrlArchivo(nombreArchivo);
            referencia.getDownloadURL().subscribe((URL) => {
              this.URL = URL;
              this.DocumentosForm.patchValue({
                EjercicioImagen: null
              });
              document.getElementById("modalImagen").click();
            }, (error) => {
              console.log(error)
            });
          }
        }
      }
    } else {
      M.toast({
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">ERROR EDITANDO EJERCICIO</h4>
            <p>No cumple con las parametros</p>
            <hr>
      </div>`});
    }
  }
  onDeleteConfirm(event) {
    this.datosEjercicio = event.data;
    document.getElementById("modalDelete").click();
  }

  ngOnInit(): void {
    this.getEjercicios();
    this.getMusculos();
  }

  buildForm() {
    this.DocumentosForm = this.fb.group({
      EjercicioImagen: [{ value: null, disabled: true }, Validators.required],
    })
    this.EjerciciosForm = this.fb.group({
      Nombre: [{ value: null, disabled: true }, Validators.required],
      Series: [{ value: null, disabled: true }, Validators.required],
      Repeticiones: [{ value: null, disabled: true }, Validators.required],
      tiempoDescanso: [{ value: null, disabled: true }, Validators.required],
      Musculo: [{ value: null, disabled: true }, Validators.required],
    })
  }

  handleInputChange(e) {
    if (e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg' || e.target.files[0].type == 'image/png') {
      if (this.datosFormulario.get('archivo')) {
        this.datosFormulario.delete('archivo');
      }
      this.datosFormulario.append('archivo', e.target.files[0], e.target.files[0].name);
      this.DocumentosForm.patchValue({
        EjercicioImagen: e.target.files[0].name
      });
    } else {
      M.toast({
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">ERROR INSERTANDO IMAGEN</h4>
              <p>solo se permiten archivos .jpeg, .jpg ó .png</p>
              <hr>
        </div>`});
    }

  }

  subirImagen() {
    if (this.DocumentosForm.value.EjercicioImagen != null) {
      this.RutinaService.createEjercicio(this.datosEjercicio)
        .subscribe(res => {
          let archivo = this.datosFormulario.get('archivo');
          let nombreArchivo = res + "_ImagenEjercicio";
          let tarea = this.subirarchivosServico.subirArchivos(nombreArchivo, archivo);
          tarea.percentageChanges().subscribe((porcentaje) => {
            if (porcentaje == 100) {
              M.toast({
                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">EJERCICIO CREADO</h4>
                        <hr>
                  </div>`});
              this.getEjercicios();
              this.getMusculos();
            }
          })
        })
    } else {
      M.toast({
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">ERROR CREANDO EJERCICIO</h4>
              <p>No se ha subido imagen</p>
              <hr>
        </div>`});
    }
  }

  EditarImagen() {
    if (this.DocumentosForm.value.EjercicioImagen != null) {
      this.RutinaService.updateEjercicio(this.datosEjercicio.Id_ejercicio, this.datosEjercicio)
        .subscribe(res => {
          let archivo = this.datosFormulario.get('archivo');
          let nombreArchivo = this.datosEjercicio.Id_ejercicio + "_ImagenEjercicio";
          let tarea = this.subirarchivosServico.subirArchivos(nombreArchivo, archivo);
          tarea.percentageChanges().subscribe((porcentaje) => {
            if (porcentaje == 100) {
              M.toast({
                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">EJERCICIO EDITADO</h4>
                      <hr>
                </div>`});
              this.getEjercicios();
              this.getMusculos();
            }
          })
        })
    } else if (this.DocumentosForm.value.EjercicioImagen == null) {
      this.RutinaService.updateEjercicio(this.datosEjercicio.Id_ejercicio, this.datosEjercicio)
        .subscribe(res => {
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">EJERCICIO EDITADO</h4>
                <hr>
          </div>`});
          this.getEjercicios();
          this.getMusculos();
        })
    }
  }

  DeleteEjercicio() {
    this.RutinaService.deleteEjercicio(this.datosEjercicio.Id_ejercicio)
      .subscribe(res => {
        M.toast({
          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">EJERCICIO ELIMINADO</h4>
              <hr>
        </div>`});
        this.getEjercicios();
        this.getMusculos();
      })
  }
  EditEjercicio() {
    document.getElementById("modalEdit").click();
  }

  getEjercicios() {
    this.RutinaService.getEjercicio()
      .subscribe(res => {
        this.RutinaService.ejercicios = res as EJERCICIO[];
      })
  }

  getMusculos() {
    this.RutinaService.getMusculos()
      .subscribe(res => {
        listaMusculos = res;
        for (let turnoMusculo = 0; turnoMusculo < listaMusculos.length; turnoMusculo++) {
          this.objeto = new Object();
          this.objeto.value = listaMusculos[turnoMusculo].Id_musculos;
          this.objeto.title = listaMusculos[turnoMusculo].Nombre_musculos;
          this.datos.push(this.objeto);
        }
        this.settings.columns.Nombre_musculos.add.config.list = this.datos;
        this.settings.columns.Nombre_musculos.editor.config.list = this.datos;
        this.yaCargo = true;
      })
  }

}
