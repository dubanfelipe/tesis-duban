import { Component, OnInit } from '@angular/core';
import { rutinaService } from '../../services/rutina.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { EJERCICIO } from '../../models/EJERCICIOS';
import { ActivatedRoute, Router } from '@angular/router';
import { rutinas } from '../../models/rutina';
import { has } from '../../models/ejerciciohasrutina';
import { RutinaCompleta } from '../../models/rutinaCompleta';
import { async } from '@angular/core/testing';
import { subirArchivosService } from '../../services/subirArchivos.service';

let listaEjercicio;
let idRutina;
declare var M: any;
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

  public URL;
  yacargoLunes; yacargoMartes; yacargoMiercoles; yacargoJueves; yacargoViernes; yacargoSabado;
  diaSelecDia;
  diaSeleccionado;
  banderaParaEditar;
  isSelected = false;
  idrutina_Actual = 0;  
  conteRutina = 0; 
  rutinaCheck=false;  
  yaCargo=false;
  yaCargo2=false;
  Lunes=false;
  Martes=false;
  Miercoles=false;
  Jueves=false;
  Viernes=false;
  Sabado=false;
  Domingo=false;
  diaRutina = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
  ]
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
  ejercicioSelect : {
    id_ejercicio : number,
    select: boolean
  }
  RUTINAS: rutinas = {
    Id_rutina: 0,
    Nombre:'',
    Dia_rutina: ''
  }
  HAS: has = {
    Id_ejercicio: 0,
    Id_rutina: 0
  }
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
  conteoEjercicios = [{
    musculo: 0,
    ejercicio: 0,
    estado: '',
  }];
  Musculos = {
    Abdominales: {
      Id:1,
      Ejercicios:[]
    },
    Biceps:{
      Id:2,
      Ejercicios:[]
    },
    Cuadriceps:{
      Id:3,
      Ejercicios:[]
    },    
    Dorsal:{
      Id:4,
      Ejercicios:[]
    }, 
    Gemelos:{
      Id:5,
      Ejercicios:[]
    }, 
    Gluteos:{
      Id:6,
      Ejercicios:[]
    },
    Hombros:{
      Id:7,
      Ejercicios:[]
    },
    Isquios:{
      Id:8,
      Ejercicios:[]
    },
    Antebrazo:{
      Id:9,
      Ejercicios:[]
    },
    Cuello:{
      Id:10,
      Ejercicios:[]
    },
    Pectoral:{
      Id:11,
      Ejercicios:[]
    },
    Triceps:{
      Id:12,
      Ejercicios:[]
    },
  }

  rutinaForm: FormGroup;
  EjerciciosForm: FormGroup;
  Boleean: boolean;
  NombreEjercicio;
  constructor(public RutinaService:rutinaService, private route:ActivatedRoute, private router: Router, private fb: FormBuilder, public subirarchivosServico: subirArchivosService) {
    this.buildForm();
    this.route.params.subscribe( params => {
      if(params.id)
      {
        this.RutinaService.getRutinacompletaById(params.id)
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
          this.Domingo = true;                  
          this.banderaParaEditar = true;              
          this.rutinaCheck = true;
          this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinalunes)
          .subscribe(res =>{
            this.Dia.lunes.Ejercicio = res as EJERCICIO; 
            this.yacargoLunes = true;
            this.Lunes = true;
            this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinamartes)
            .subscribe(res =>{
              this.Dia.Martes.Ejercicio = res as EJERCICIO;
              this.yacargoMartes = true;
              this.Martes = true;
              this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinamiercoles)
              .subscribe(res =>{
                this.Dia.Miercoles.Ejercicio = res as EJERCICIO;
                this.yacargoMiercoles = true;
                this.Miercoles = true;
                this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinajueves)
                .subscribe(res =>{
                  this.Dia.Jueves.Ejercicio = res as EJERCICIO;
                  this.yacargoJueves = true;
                  this.Jueves = true;
                  this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinaviernes)
                  .subscribe(res =>{
                    this.Dia.Viernes.Ejercicio = res as EJERCICIO;
                    this.yacargoViernes = true;
                    this.Viernes = true;
                    this.RutinaService.getEjercicioHasRutina(this.rutinacompleta.Id_rutinasabado)
                    .subscribe(res =>{
                      this.Dia.Sabado.Ejercicio = res as EJERCICIO;
                      this.yacargoSabado = true;
                      this.Sabado = true;
                    })
                  })
                })
              })
            })
          })
        })
      }
    })
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

  get nombre() {
    return this.rutinaForm.get("Nombre");
  }

  buildForm(){
    this.rutinaForm = this.fb.group({
      Nombre: [{ value: '', disabled: this.rutinaCheck }, Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ 0-9]*$/)])],
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

  } 
  getEjerciciosById(){
    this.RutinaService.getEjercicioHasRutina(this.HAS.Id_rutina)
    .subscribe(res =>{
      if (this.banderaParaEditar == true) {
        if (this.diaSelecDia == 0) { 
          this.Dia.lunes.Ejercicio = res as EJERCICIO;
          if (this.Dia.lunes.Ejercicio[0] === undefined) { this.yacargoLunes = false;
          }else { this.yacargoLunes = true;}
        }
        if (this.diaSelecDia == 1) { 
          this.Dia.Martes.Ejercicio = res as EJERCICIO;
          if (this.Dia.Martes.Ejercicio[0] === undefined) { this.yacargoMartes = false;
          }else { this.yacargoMartes = true;}
        } 
        if (this.diaSelecDia == 2) { 
          this.Dia.Miercoles.Ejercicio = res as EJERCICIO;
          if (this.Dia.Miercoles.Ejercicio[0] === undefined) { this.yacargoMiercoles = false;
          }else { this.yacargoMiercoles = true;}
        } 
        if (this.diaSelecDia == 3) { 
          this.Dia.Jueves.Ejercicio = res as EJERCICIO; 
          if (this.Dia.Jueves.Ejercicio[0] === undefined) { this.yacargoJueves = false;
          }else { this.yacargoJueves = true;}
        } 
        if (this.diaSelecDia == 4) { 
          this.Dia.Viernes.Ejercicio = res as EJERCICIO;
          if (this.Dia.Viernes.Ejercicio[0] === undefined) { this.yacargoViernes = false;
          }else { this.yacargoViernes = true;}
        } 
        if (this.diaSelecDia == 5) { 
          this.Dia.Sabado.Ejercicio = res as EJERCICIO; 
          if (this.Dia.Sabado.Ejercicio[0] === undefined) { this.yacargoSabado = false;
          }else { this.yacargoSabado = true;}
        }   
      }else{
        if (this.conteRutina == 1) { 
          this.Dia.lunes.Ejercicio = res as EJERCICIO; 
          if (this.Dia.lunes.Ejercicio[0] === undefined) { this.yacargoLunes = false;
          }else { 
            this.yacargoLunes= true;
          }
        }      
        if (this.conteRutina == 2) { 
          this.Dia.Martes.Ejercicio = res as EJERCICIO; 
          if (this.Dia.Martes.Ejercicio[0] === undefined) { this.yacargoMartes = false;
          }else { this.yacargoMartes = true;}
        } 
        if (this.conteRutina == 3) { 
          this.Dia.Miercoles.Ejercicio = res as EJERCICIO;
          if (this.Dia.Miercoles.Ejercicio[0] === undefined) { this.yacargoMiercoles = false;
          }else { this.yacargoMiercoles = true;}
        } 
        if (this.conteRutina == 4) { 
          this.Dia.Jueves.Ejercicio = res as EJERCICIO; 
          if (this.Dia.Jueves.Ejercicio[0] === undefined) { this.yacargoJueves = false;
          }else { this.yacargoJueves = true;}
        } 
        if (this.conteRutina == 5) { 
          this.Dia.Viernes.Ejercicio = res as EJERCICIO;
          if (this.Dia.Viernes.Ejercicio[0] === undefined) { this.yacargoViernes = false;
          }else { this.yacargoViernes = true;}
        } 
        if (this.conteRutina == 6) { 
          this.Dia.Sabado.Ejercicio = res as EJERCICIO; 
          if (this.Dia.Sabado.Ejercicio[0] === undefined) { this.yacargoSabado = false;
          }else { this.yacargoSabado = true;}
        } 
      }
    })
  }
  ejercicioSeleccionado(idEjercicio,checkbox,estado){    
    this.HAS.Id_ejercicio=idEjercicio; 
    if(this.banderaParaEditar == true){   
      this.HAS.Id_rutina=this.diaSeleccionado;
    }else{      
      this.HAS.Id_rutina=idRutina; 
    }  
    if(estado === true){           
      this.RutinaService.createEjercicioHasRutina(this.HAS)
      .subscribe(res =>{    
        this.getEjerciciosById();    
      })
    }else{      
      this.RutinaService.deleteEjercicioHasRutina(this.HAS)
      .subscribe(res =>{
        this.getEjerciciosById();         
      })
    }
  } 
  saveRutina(form){
    this.rutinaCheck=true;
    this.RUTINAS.Nombre = form.value.Nombre;    
    this.rutinacompleta.Nombre_Rutina = form.value.Nombre; 
    this.RUTINAS.Dia_rutina = this.diaRutina[this.conteRutina];
    this.buildForm();
    this.rutinaForm.patchValue({
      Nombre : form.value.Nombre
    })
    this.RutinaService.createRutina(this.RUTINAS)
    .subscribe(res =>{
      idRutina = res;      
      this.idrutina_Actual = this.idrutina_Actual +1;        
      if (this.conteRutina === 0) { 
        this.Lunes = true;
        this.rutinacompleta.Id_rutinalunes = idRutina;
      }
      if (this.conteRutina === 1) { 
        this.Martes = true;
        this.rutinacompleta.Id_rutinamartes = idRutina; 
      }
      if (this.conteRutina === 2) { 
        this.Miercoles = true;
        this.rutinacompleta.Id_rutinamiercoles = idRutina; 
      }
      if (this.conteRutina === 3) { 
        this.Jueves = true;
        this.rutinacompleta.Id_rutinajueves = idRutina; 
      }
      if (this.conteRutina === 4) { 
        this.Viernes = true; 
        this.rutinacompleta.Id_rutinaviernes = idRutina; 
      }
      if (this.conteRutina === 5) { 
        this.Sabado = true;
        this.rutinacompleta.Id_rutinasabado = idRutina; 
      }
      if (this.conteRutina === 6){
        this.Domingo = true;
      }
      this.SelectDia(this.conteRutina,0);
      this.conteRutina = this.conteRutina + 1;      
    })    
  }  
  update(){
    let nuevoConteoRutina = this.conteRutina - 1;
    this.banderaParaEditar = false;
    this.Domingo = false;
    this.SelectDia(nuevoConteoRutina,0);
  }
  SelectDia(dia, SaveOUpdate){  
    this.diaSelecDia = dia; 
    let listaEjerciciosSeleccionados;
    let bandera;
    if(SaveOUpdate === 1) {this.banderaParaEditar = true;}
    if(dia == 0){
      this.diaSeleccionado = this.rutinacompleta.Id_rutinalunes;
    }else if(dia == 1){
      this.diaSeleccionado = this.rutinacompleta.Id_rutinamartes;
    }else if(dia == 2){
      this.diaSeleccionado = this.rutinacompleta.Id_rutinamiercoles;
    }else if(dia == 3){
      this.diaSeleccionado = this.rutinacompleta.Id_rutinajueves;
    }else if(dia == 4){
      this.diaSeleccionado = this.rutinacompleta.Id_rutinaviernes;
    }else if(dia == 5){
      this.diaSeleccionado = this.rutinacompleta.Id_rutinasabado;
    }
    this.RutinaService.getEjercicioHasRutina(this.diaSeleccionado)
    .subscribe(res =>{
      listaEjerciciosSeleccionados = res;
      this.RutinaService.getEjercicio()
      .subscribe(res =>{
        listaEjercicio = res;
        for (let contador1 = 0; contador1 < listaEjercicio.length; contador1++) {
          bandera = false;
          for(let contador2 = 0; contador2 < listaEjerciciosSeleccionados.length; contador2++)
          {            
            if(listaEjercicio[contador1].Id_ejercicio === listaEjerciciosSeleccionados[contador2].Id_ejercicio){
              listaEjercicio[contador1].isSelected = true;
              bandera = true;
            }
          }
          if (bandera == false) {
            listaEjercicio[contador1].isSelected = false;
          }          
        }
        Object.keys(this.Musculos).forEach(musculo => this.Musculos[musculo].Ejercicios = listaEjercicio.filter(Ejercicios => Ejercicios.Musculos_id_musculos === this.Musculos[musculo].Id));     
      })
    })
    this.yaCargo = true;
    this.yaCargo2 = true;
  }
  GuardarRutina(){
    this.RutinaService.createRutinacompleta(this.rutinacompleta)
    .subscribe(res =>{
      M.toast({
        html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">RUTINA CREADA</h4>
              <p>Se ha creado la rutina satisfactoriamente</p>
              <hr>
              </div>`});
        this.router.navigate(['admin/sign_in']);
    })
  }
}
