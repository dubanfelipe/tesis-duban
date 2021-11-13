import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rutinaService } from '../../services/rutina.service';
import { EJERCICIO } from '../../models/EJERCICIOS';
import { musculos } from '../../models/musculo';
import { dato } from '../../models/datos';

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
  yaCargo=false;
  constructor(public RutinaService:rutinaService, private router: Router) {
    this.datos=new Array<dato>();
  }
  settings = {
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
    actions: {      
      position: 'right',
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
      Nombre_musculos:{
        title: 'Musculo',         
        editor:{
            type: 'list',
            selectText: 'Select...',
            config: {
            list: new Array
          }
        },
        add:{
            type: 'list',
            config: {
            selectText: 'Select...',
            list: new Array
          }
        },        
      },
    },    
  };
  onCreateConfirm(event) {
    console.log(event.newData);
    if (event.newData.Serie >= 0 && event.newData.Serie <= 99) {
      if (event.newData.Repeticion >= 0 && event.newData.Repeticion <= 99){
        if (event.newData.Tiempo_descanso >= 0 && event.newData.Tiempo_descanso <= 300){
          if (event.newData.Nombre_musculos >= 1 && event.newData.Nombre_musculos <=12) {
            console.log(event.newData)
            this.RutinaService.createEjercicio(event.newData)
            .subscribe(res =>{
              window.location.reload();
            }) 
          }          
        }
      }
    } else{
      M.toast({
      html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">ERROR CREANDO EJERCICIO</h4>
            <p>No cumple con las indicaciones</p>
            <hr>
      </div>`});
    }    
  }
  onSaveConfirm(event) {    
    event.newData.Serie = parseInt(event.newData.Serie);
    event.newData.Repeticion = parseInt(event.newData.Repeticion);
    event.newData.Tiempo_descanso = parseInt(event.newData.Tiempo_descanso);
    if (event.newData.Serie >= 0 && event.newData.Serie <= 99) {
      if (event.newData.Repeticion >= 0 && event.newData.Repeticion <= 99){
        if (event.newData.Tiempo_descanso >= 0 && event.newData.Tiempo_descanso <= 300){  
          if (event.newData.Nombre_musculos >= 1 && event.newData.Nombre_musculos <=12) {  
            console.log(event.newData);      
            this.RutinaService.updateEjercicio(event.newData.Id_ejercicio,event.newData)
            .subscribe(res =>{
              window.location.reload();
            })
          } 
        }
      }
    } else{
      M.toast({
      html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">ERROR EDITANDO EJERCICIO</h4>
            <p>No cumple con las indicaciones</p>
            <hr>
      </div>`});
    }    
  }
  onDeleteConfirm(event) {
    var answer = confirm("Esta seguro de querer eliminar el ejercicio del sistema");
    if (answer) 
    {
      console.log(event.data.Id_ejercicio);
      this.RutinaService.deleteEjercicio(event.data.Id_ejercicio)
      .subscribe(res =>{
        window.location.reload();
      })       
    }
  }
  ngOnInit(): void {
    this.getEjercicios();
    this.getMusculos();
  }
  getEjercicios(){
    this.RutinaService.getEjercicio()
    .subscribe(res =>{      
      this.RutinaService.ejercicios = res as EJERCICIO[];
    })
  }
  getMusculos(){    
    this.RutinaService.getMusculos()
    .subscribe(res =>{ 
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
