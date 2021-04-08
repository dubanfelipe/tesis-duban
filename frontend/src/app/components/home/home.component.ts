import { Component, OnInit } from '@angular/core';
import { rutinaService } from '../../services/rutina.service';
import { RegisterService } from '../../services/register.service';
import { musculos } from '../../models/musculo';
import { facultades } from '../../models/facultad';

let Inicio=true;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  constructor(public RutinaService: rutinaService, public registerService: RegisterService) { }

  ngOnInit(): void {
    this.createMusculos();
    this.createFacultades();
  }
  createMusculos(){    
    for (let conteoMusculos = 1; conteoMusculos < this.Musculos.length; conteoMusculos++) {
      this.MUSCULOS.Id_musculos = conteoMusculos;
      this.MUSCULOS.Nombre_musculos = this.Musculos[conteoMusculos];
      this.RutinaService.createMusculos(this.MUSCULOS)
      .subscribe(res =>{

      })      
    }
  }
  createFacultades(){
    for (let conteoFacultades = 1; conteoFacultades < this.Facultades.length; conteoFacultades++) {
      this.FACULTADES.Id_facultad = conteoFacultades;
      this.FACULTADES.Nombre_facultad = this.Facultades[conteoFacultades];
      this.registerService.createFacultades(this.FACULTADES)
      .subscribe(res =>{

      })      
    }
  }
}
