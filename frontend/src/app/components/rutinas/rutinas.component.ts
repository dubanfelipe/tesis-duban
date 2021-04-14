import { Component, OnInit } from '@angular/core';
import { rutinaService } from '../../services/rutina.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { EJERCICIO } from '../../models/EJERCICIOS';
import { Router } from '@angular/router';
import { rutinas } from '../../models/rutina';
import { has } from '../../models/ejerciciohasrutina';
import { RutinaCompleta } from '../../models/rutinaCompleta';

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
  diaRutina = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
  ]
  rutinacompleta : RutinaCompleta ={
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
  constructor(public RutinaService:rutinaService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }
  buildForm(){
    this.rutinaForm = this.fb.group({
      Nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z ñ Ñ 0-9]*$/)])],
    })
  }
  ngOnInit(): void {
    
  }  
  getEjercicios(){
    this.RutinaService.getEjercicio()
    .subscribe(res =>{   
      listaEjercicio = res;
      for (let index = 0; index < listaEjercicio.length; index++) {
        listaEjercicio[index].isSelected = false;
      }
      Object.keys(this.Musculos).forEach(musculo => this.Musculos[musculo].Ejercicios = listaEjercicio.filter(Ejercicios => Ejercicios.MUSCULOS_ID_MUSCULOS === this.Musculos[musculo].Id));     
    })
    this.yaCargo = true;
    this.yaCargo2 = true;
  }
  getEjerciciosById(){
    this.RutinaService.getEjercicioHasRutina(this.HAS.Id_rutina)
    .subscribe(res =>{
      if (this.conteRutina == 1) { 
        this.Dia.lunes.EJERCICIO = res as EJERCICIO; 
        this.yacargoLunes = false;
        if (this.Dia.lunes.EJERCICIO[0] === undefined) { this.yacargoLunes = false;
        }else { this.yacargoLunes= true;}
      }      
      if (this.conteRutina == 2) { 
        this.Dia.Martes.EJERCICIO = res as EJERCICIO; 
        this.yacargoMartes = false;
        if (this.Dia.Martes.EJERCICIO[0] === undefined) { this.yacargoMartes = false;
        }else { this.yacargoMartes = true;}
      } 
      if (this.conteRutina == 3) { 
        this.Dia.Miercoles.EJERCICIO = res as EJERCICIO;
        this.yacargoMiercoles = false;
        if (this.Dia.Miercoles.EJERCICIO[0] === undefined) { this.yacargoMiercoles = false;
        }else { this.yacargoMiercoles = true;}
      } 
      if (this.conteRutina == 4) { 
        this.Dia.Jueves.EJERCICIO = res as EJERCICIO; 
        this.yacargoJueves = false;
        if (this.Dia.Jueves.EJERCICIO[0] === undefined) { this.yacargoJueves = false;
        }else { this.yacargoJueves = true;}
      } 
      if (this.conteRutina == 5) { 
        this.Dia.Viernes.EJERCICIO = res as EJERCICIO; 
        this.yacargoViernes = false;
        if (this.Dia.Viernes.EJERCICIO[0] === undefined) { this.yacargoViernes = false;
        }else { this.yacargoViernes = true;}
      } 
      if (this.conteRutina == 6) { 
        this.Dia.Sabado.EJERCICIO = res as EJERCICIO; 
        this.yacargoSabado = false;
        if (this.Dia.Sabado.EJERCICIO[0] === undefined) { this.yacargoSabado = false;
        }else { this.yacargoSabado = true;}
      } 
    })
  }
  ejercicioSeleccionado(idEjercicio,checkbox,estado){  
    console.log(idEjercicio,checkbox,estado);
    this.HAS.Id_ejercicio=idEjercicio; 
    this.HAS.Id_rutina=idRutina;   
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
    this.getEjercicios();
    this.rutinaCheck=false;
    this.RUTINAS.Nombre = form.value.Nombre;
    this.RUTINAS.Dia_rutina = this.diaRutina[this.conteRutina];
    this.RutinaService.createRutina(this.RUTINAS)
    .subscribe(res =>{
      idRutina = res;      
      this.idrutina_Actual = this.idrutina_Actual +1;  
      if (this.Sabado === true) {
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
      this.conteRutina = this.conteRutina + 1;
    })    
  }  
}
