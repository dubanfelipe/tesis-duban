import { Component, OnInit } from '@angular/core';
import { rutinaService } from '../../services/rutina.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { EJERCICIO } from '../../models/EJERCICIOS';
import { ActivatedRoute, Router } from '@angular/router';
import { rutinas } from '../../models/rutina';
import { has } from '../../models/ejerciciohasrutina';
import { RutinaCompleta } from '../../models/rutinaCompleta';
import { async } from '@angular/core/testing';

let listaEjercicio;
let idRutina;
declare var M: any;
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

  yacargoLunes; yacargoMartes; yacargoMiercoles; yacargoJueves; yacargoViernes; yacargoSabado;
  diaSelecDia;
  diaSeleccionado;
  banderaParaEditar;
  isSelected = false;
  idrutina_Actual = 0;  
  conteRutina = 0; 
  rutinaCheck=true;  
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
    EJERCICIO : {
      NOMBRE : '',
      SERIE : 0,
      REPETICION : 0,
      TIEMPO_DESCANSO : 0,
      MUSCULOS_ID_MUSCULOS : 0,
      NOMBRE_MUSCULOS : "", 
      }
    },
    Martes : {
      EJERCICIO : {
        NOMBRE : '',
        SERIE : 0,
        REPETICION : 0,
        TIEMPO_DESCANSO : 0,
        MUSCULOS_ID_MUSCULOS : 0,
        NOMBRE_MUSCULOS : "", 
      }
    },
    Miercoles : {
      EJERCICIO : {
        NOMBRE : '',
        SERIE : 0,
        REPETICION : 0,
        TIEMPO_DESCANSO : 0,
        MUSCULOS_ID_MUSCULOS : 0,
        NOMBRE_MUSCULOS : "", 
      }
    },
    Jueves : {
      EJERCICIO : {
        NOMBRE : '',
        SERIE : 0,
        REPETICION : 0,
        TIEMPO_DESCANSO : 0,
        MUSCULOS_ID_MUSCULOS : 0,
        NOMBRE_MUSCULOS : "", 
      }
    },
    Viernes : {
      EJERCICIO : {
        NOMBRE : '',
        SERIE : 0,
        REPETICION : 0,
        TIEMPO_DESCANSO : 0,
        MUSCULOS_ID_MUSCULOS : 0,
        NOMBRE_MUSCULOS : "", 
      }
    },
    Sabado : {
      EJERCICIO : {
        NOMBRE : '',
        SERIE : 0,
        REPETICION : 0,
        TIEMPO_DESCANSO : 0,
        MUSCULOS_ID_MUSCULOS : 0,
        NOMBRE_MUSCULOS : "", 
      }
    }    
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
  Boleean: boolean;
  constructor(public RutinaService:rutinaService, private route:ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.route.params.subscribe( params => {
      if(params.id)
      {
        this.RutinaService.getRutinacompletaById(params.id)
        .subscribe(res =>{
          this.rutinacompleta.Id_rutinacompleta = res[0].ID_RUTINACOMPLETA;
          this.rutinacompleta.Id_rutinalunes = res[0].ID_RUTINALUNES;
          this.rutinacompleta.Id_rutinamartes = res[0].ID_RUTINAMARTES;
          this.rutinacompleta.Id_rutinamiercoles = res[0].ID_RUTINAMIERCOLES;
          this.rutinacompleta.Id_rutinajueves = res[0].ID_RUTINAJUEVES;
          this.rutinacompleta.Id_rutinaviernes = res[0].ID_RUTINAVIERNES;
          this.rutinacompleta.Id_rutinasabado = res[0].ID_RUTINASABADO;
          this.rutinacompleta.Nombre_Rutina = res[0].NOMBRE_RUTINA;
          this.rutinaForm.patchValue({"Nombre": this.rutinacompleta.Nombre_Rutina});
          for (let index = 0; index < 6; index++) {
            this.Domingo = true;
            this.diaSelecDia = index;                  
            this.banderaParaEditar = true;              
            this.rutinaCheck = false;
            if (index == 0){ 
              this.HAS.Id_rutina = this.rutinacompleta.Id_rutinalunes;   
              this.Lunes = true;                                    
            }else if(index == 1){
              this.HAS.Id_rutina = this.rutinacompleta.Id_rutinamartes;   
              this.Martes = true; 
            }else if(index == 2){
              this.HAS.Id_rutina = this.rutinacompleta.Id_rutinamiercoles;   
              this.Miercoles = true;  
            }else if(index == 3){
              this.HAS.Id_rutina = this.rutinacompleta.Id_rutinajueves;   
              this.Jueves = true;  
            }else if(index == 4){
              this.HAS.Id_rutina = this.rutinacompleta.Id_rutinaviernes;   
              this.Viernes = true;  
            }else if(index == 5){
              this.HAS.Id_rutina = this.rutinacompleta.Id_rutinasabado;   
              this.Sabado = true;  
            }  
            this.getEjerciciosById()                                                
          }
        })
      }
    })
    this.buildForm();
  }
  buildForm(){
    this.rutinaForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ 0-9]*$/)])],
    })
  }
  ngOnInit(): void { 

  } 
  getEjerciciosById(){
    this.RutinaService.getEjercicioHasRutina(this.HAS.Id_rutina)
    .subscribe(res =>{
      if (this.banderaParaEditar == true) {
        if (this.diaSelecDia == 0) { 
          this.Dia.lunes.EJERCICIO = res as EJERCICIO;
          if (this.Dia.lunes.EJERCICIO[0] === undefined) { this.yacargoLunes = false;
          }else { this.yacargoLunes = true;}
        }
        if (this.diaSelecDia == 1) { 
          this.Dia.Martes.EJERCICIO = res as EJERCICIO;
          if (this.Dia.Martes.EJERCICIO[0] === undefined) { this.yacargoMartes = false;
          }else { this.yacargoMartes = true;}
        } 
        if (this.diaSelecDia == 2) { 
          this.Dia.Miercoles.EJERCICIO = res as EJERCICIO;
          if (this.Dia.Miercoles.EJERCICIO[0] === undefined) { this.yacargoMiercoles = false;
          }else { this.yacargoMiercoles = true;}
        } 
        if (this.diaSelecDia == 3) { 
          this.Dia.Jueves.EJERCICIO = res as EJERCICIO; 
          if (this.Dia.Jueves.EJERCICIO[0] === undefined) { this.yacargoJueves = false;
          }else { this.yacargoJueves = true;}
        } 
        if (this.diaSelecDia == 4) { 
          this.Dia.Viernes.EJERCICIO = res as EJERCICIO;
          if (this.Dia.Viernes.EJERCICIO[0] === undefined) { this.yacargoViernes = false;
          }else { this.yacargoViernes = true;}
        } 
        if (this.diaSelecDia == 5) { 
          this.Dia.Sabado.EJERCICIO = res as EJERCICIO; 
          if (this.Dia.Sabado.EJERCICIO[0] === undefined) { this.yacargoSabado = false;
          }else { this.yacargoSabado = true;}
        }   
      }else{
        if (this.conteRutina == 1) { 
          this.Dia.lunes.EJERCICIO = res as EJERCICIO; 
          if (this.Dia.lunes.EJERCICIO[0] === undefined) { this.yacargoLunes = false;
          }else { this.yacargoLunes= true;}
        }      
        if (this.conteRutina == 2) { 
          this.Dia.Martes.EJERCICIO = res as EJERCICIO; 
          if (this.Dia.Martes.EJERCICIO[0] === undefined) { this.yacargoMartes = false;
          }else { this.yacargoMartes = true;}
        } 
        if (this.conteRutina == 3) { 
          this.Dia.Miercoles.EJERCICIO = res as EJERCICIO;
          if (this.Dia.Miercoles.EJERCICIO[0] === undefined) { this.yacargoMiercoles = false;
          }else { this.yacargoMiercoles = true;}
        } 
        if (this.conteRutina == 4) { 
          this.Dia.Jueves.EJERCICIO = res as EJERCICIO; 
          if (this.Dia.Jueves.EJERCICIO[0] === undefined) { this.yacargoJueves = false;
          }else { this.yacargoJueves = true;}
        } 
        if (this.conteRutina == 5) { 
          this.Dia.Viernes.EJERCICIO = res as EJERCICIO;
          if (this.Dia.Viernes.EJERCICIO[0] === undefined) { this.yacargoViernes = false;
          }else { this.yacargoViernes = true;}
        } 
        if (this.conteRutina == 6) { 
          this.Dia.Sabado.EJERCICIO = res as EJERCICIO; 
          if (this.Dia.Sabado.EJERCICIO[0] === undefined) { this.yacargoSabado = false;
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
    this.rutinaCheck=false;
    this.RUTINAS.Nombre = form.value.Nombre;    
    this.rutinacompleta.Nombre_Rutina = form.value.Nombre; 
    this.RUTINAS.Dia_rutina = this.diaRutina[this.conteRutina];
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
            if(listaEjercicio[contador1].ID_EJERCICIO === listaEjerciciosSeleccionados[contador2].ID_EJERCICIO){
              listaEjercicio[contador1].isSelected = true;
              bandera = true;
            }
          }
          if (bandera == false) {
            listaEjercicio[contador1].isSelected = false;
          }          
        }
        Object.keys(this.Musculos).forEach(musculo => this.Musculos[musculo].Ejercicios = listaEjercicio.filter(Ejercicios => Ejercicios.MUSCULOS_ID_MUSCULOS === this.Musculos[musculo].Id));     
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
        this.router.navigate(['admin']);
    })
  }
}
