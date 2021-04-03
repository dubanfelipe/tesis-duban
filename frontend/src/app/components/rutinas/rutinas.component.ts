import { Component, OnInit } from '@angular/core';
import { rutinaService } from '../../services/rutina.service';
import { EJERCICIO } from '../../models/EJERCICIOS';
import { Router } from '@angular/router';

let listaEjercicio;
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

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
    MúsculosAntebrazo:{
      Id:9,
      Ejercicios:[]
    },
    MúsculosCuello:{
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
  constructor(public RutinaService:rutinaService, private router: Router) { }
  
  ngOnInit(): void {
    this.getEjercicios();
  }  
  getEjercicios(){
    this.RutinaService.getEjercicio()
    .subscribe(res =>{   
      listaEjercicio = res;
      Object.keys(this.Musculos).forEach(musculo => this.Musculos[musculo].Ejercicios = listaEjercicio.filter(Ejercicios => Ejercicios.MUSCULOS_ID_MUSCULOS === this.Musculos[musculo].Id));
      console.log(this.Musculos);      
    })
  }
}
