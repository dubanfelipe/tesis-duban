import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  decode  from 'jwt-decode';
import { RutinaCompleta } from 'src/app/models/rutinaCompleta';
import { RegisterService } from '../../services/register.service';
import { EJERCICIO } from '../../models/EJERCICIOS';
import { rutinaService } from '../../services/rutina.service';
import { subirArchivosService } from '../../services/subirArchivos.service';

@Component({
  selector: 'app-user-rutinas',
  templateUrl: './user-rutinas.component.html',
  styleUrls: ['./user-rutinas.component.css']
})
export class UserRutinasComponent implements OnInit {

  public URL;
  tokenPayload;
  Dia = { lunes : {
    Ejercicio : {
      Nombre : '',
      Serie : 0,
      Repeticion : 0,
      Tiempo_descanso : 0,
      Musculos_id_musculos : 0,
      Nombre_musculo : "", 
      }
    },
    Martes : {
      Ejercicio : {
        Nombre : '',
        Serie : 0,
        Repeticion : 0,
        Tiempo_descanso : 0,
        Musculos_id_musculos : 0,
        Nombre_musculo : "", 
        }
      },
    Miercoles : {
      Ejercicio : {
        Nombre : '',
        Serie : 0,
        Repeticion : 0,
        Tiempo_descanso : 0,
        Musculos_id_musculos : 0,
        Nombre_musculo : "", 
        }
      },
    Jueves : {
      Ejercicio : {
        Nombre : '',
        Serie : 0,
        Repeticion : 0,
        Tiempo_descanso : 0,
        Musculos_id_musculos : 0,
        Nombre_musculo : "", 
        }
      },
    Viernes : {
      Ejercicio : {
        Nombre : '',
        Serie : 0,
        Repeticion : 0,
        Tiempo_descanso : 0,
        Musculos_id_musculos : 0,
        Nombre_musculo : "", 
        }
      },
    Sabado : {
      Ejercicio : {
        Nombre : '',
        Serie : 0,
        Repeticion : 0,
        Tiempo_descanso : 0,
        Musculos_id_musculos : 0,
        Nombre_musculo : "", 
        }
      },
  }
  rutinacompleta : RutinaCompleta ={
    Nombre_Rutina: '',
    Id_rutinacompleta: 0,
    Id_rutinalunes: 0,
    Id_rutinamartes: 0,
    Id_rutinamiercoles: 0,
    Id_rutinajueves: 0,
    Id_rutinaviernes: 0,
    Id_rutinasabado: 0,
  }
  rutinaForm: FormGroup;
  EjerciciosForm: FormGroup;
  NombreEjercicio;
  constructor(private fb: FormBuilder, public registerService: RegisterService, public RutinaService: rutinaService, public subirarchivosServico: subirArchivosService) { 
    this.buildForm();
  }

  settings = {
    hideSubHeader: true,
    actions: {
      custom: [
        {
          name: 'activateAction',
          title: '<i class="material-icons">visibility</i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      Nombre: {
        title: 'Nombre',
      },
      Serie: {
        title: 'Serie',
      },
      Repeticion: {
        title: 'Repeticion',
      },
      Tiempo_descanso: {
        title: 'Tiempo_descanso',
      },
      Nombre_musculos: {
        title: 'Nombre_musculo',
      },
    },
  }

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

  buildForm(){
    this.rutinaForm = this.fb.group({
      Nombre: [{ value: '', disabled: true }, Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ 0-9]*$/)])],
    })
    this.EjerciciosForm = this.fb.group({
      Nombre: [{ value: null, disabled: true }, Validators.required],
      Series: [{ value: null, disabled: true }, Validators.required],
      Repeticiones: [{ value: null, disabled: true }, Validators.required],
      tiempoDescanso: [{ value: null, disabled: true }, Validators.required],
      Musculo: [{ value: null, disabled: true }, Validators.required],
    })
  }

  ngOnInit(): void {
    const token = localStorage.getItem('usuario');
    this.tokenPayload = decode(token);
    this.registerService.getRutinaAsignadaHasPersona(this.tokenPayload.id_persona)
    .subscribe(res =>{
      this.rutinacompleta.Id_rutinacompleta = res[0].Id_rutinacompleta;
          this.rutinacompleta.Id_rutinalunes = res[0].Id_rutinalunes;
          this.rutinacompleta.Id_rutinamartes = res[0].Id_rutinamartes;
          this.rutinacompleta.Id_rutinamiercoles = res[0].Id_rutinamiercoles;
          this.rutinacompleta.Id_rutinajueves = res[0].Id_rutinajueves;
          this.rutinacompleta.Id_rutinaviernes = res[0].Id_rutinaviernes;
          this.rutinacompleta.Id_rutinasabado = res[0].Id_rutinasabado;
          this.rutinacompleta.Nombre_Rutina = res[0].Nombre_Rutina;
          this.rutinaForm.patchValue({"Nombre": this.rutinacompleta.Nombre_Rutina});
          this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinalunes)
          .subscribe(res =>{
            this.Dia.lunes.Ejercicio = res as EJERCICIO; 
            this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinamartes)
            .subscribe(res =>{
              this.Dia.Martes.Ejercicio = res as EJERCICIO;
              this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinamiercoles)
              .subscribe(res =>{
                this.Dia.Miercoles.Ejercicio = res as EJERCICIO;
                this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinajueves)
                .subscribe(res =>{
                  this.Dia.Jueves.Ejercicio = res as EJERCICIO;
                  this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinaviernes)
                  .subscribe(res =>{
                    this.Dia.Viernes.Ejercicio = res as EJERCICIO;
                    this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinasabado)
                    .subscribe(res =>{
                      this.Dia.Sabado.Ejercicio = res as EJERCICIO;
                    })
                  })
                })
              })
            })
          })
    })
  }

}
