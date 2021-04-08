import { Component, OnInit } from '@angular/core';
import { rutinaService } from '../../services/rutina.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { EJERCICIO } from '../../models/EJERCICIOS';
import { Router } from '@angular/router';
import { rutinas } from '../../models/rutina';
import { has } from '../../models/ejerciciohasrutina';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

let listaEjercicio;
let idRutina;
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

  idrutina_Actual = 0;
  conteRutina = 0;
  rutinaCheck=true;
  conteo = 0;
  yaCargo=false;
  diaRutina = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
  ]
  RUTINAS: rutinas = {
    Id_rutina: 0,
    Nombre:'',
    Dia_rutina: ''
  }
  HAS: has ={
    Id_ejercicio: 0,
    Id_rutina: 0
  }
  ejercicio: EJERCICIO = {
    NOMBRE : '',
    SERIE : 0,
    REPETICION : 0,
    TIEMPO_DESCANSO : 0,
    MUSCULOS_ID_MUSCULOS : 0,
    NOMBRE_MUSCULOS : "", 
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
    this.getEjercicios();
  }  
  getEjercicios(){
    this.RutinaService.getEjercicio()
    .subscribe(res =>{   
      listaEjercicio = res;
      console.log(listaEjercicio);
      Object.keys(this.Musculos).forEach(musculo => this.Musculos[musculo].Ejercicios = listaEjercicio.filter(Ejercicios => Ejercicios.MUSCULOS_ID_MUSCULOS === this.Musculos[musculo].Id));     
    })
  }
  getEjerciciosById(){
    this.RutinaService.getEjercicioHasRutina(this.HAS.Id_rutina)
    .subscribe(res =>{
      this.ejercicio = res as EJERCICIO;
      console.log(this.ejercicio);
    })
    this.yaCargo=true;
  }
  ejercicioSeleccionado(idEjercicio,checkbox,estado){  
    this.HAS.Id_ejercicio=idEjercicio; 
    this.HAS.Id_rutina=idRutina;     
    console.log(idEjercicio);
    console.log(checkbox);
    console.log(estado);
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
    //this.conteoEjercicios[this.conteo] = {musculo: idEjercicio, ejercicio: checkbox, estado: estado};
    //console.log("arreglo",this.conteoEjercicios);
    //this.conteo= this.conteo+1;
  } 
  saveRutina(form){
    this.rutinaCheck=false;
    this.RUTINAS.Nombre = form.value.Nombre;
    this.RUTINAS.Dia_rutina = this.diaRutina[this.conteRutina];
    this.RutinaService.createRutina(this.RUTINAS)
    .subscribe(res =>{
      idRutina = res;      
      this.idrutina_Actual = this.idrutina_Actual +1;     
      if (this.conteRutina == 5) {
        this.conteRutina = 0;
      } else {
        this.conteRutina = this.conteRutina + 1;
      }      
    })
  }  
}
