import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rutinaService } from '../../services/rutina.service';
import { EJERCICIO } from '../../models/EJERCICIOS';

declare var M: any;

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

  constructor(public RutinaService:rutinaService, private router: Router) { }
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
      NOMBRE: {
        title: 'Nombre',
      },
      SERIE: {
        title: 'No de series',
      },
      REPETICION: {
        title: 'No de repeticiones',
      },
      TIEMPO_DESCANSO: {
        title: 'Tiempo de descanso en seg',
      },
    },    
  };
  onCreateConfirm(event) {
    if (event.newData.SERIE >= 0 && event.newData.SERIE <= 99) {
      if (event.newData.REPETICION >= 0 && event.newData.REPETICION <= 99){
        if (event.newData.TIEMPO_DESCANSO >= 0 && event.newData.TIEMPO_DESCANSO <= 300){
          this.RutinaService.createEjercicio(event.newData)
          .subscribe(res =>{
            window.location.reload();
          }) 
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
    event.newData.SERIE = parseInt(event.newData.SERIE);
    event.newData.REPETICION = parseInt(event.newData.REPETICION);
    event.newData.TIEMPO_DESCANSO = parseInt(event.newData.TIEMPO_DESCANSO);
    if (event.newData.SERIE >= 0 && event.newData.SERIE <= 99) {
      if (event.newData.REPETICION >= 0 && event.newData.REPETICION <= 99){
        if (event.newData.TIEMPO_DESCANSO >= 0 && event.newData.TIEMPO_DESCANSO <= 300){          
          this.RutinaService.updateEjercicio(event.newData.ID_EJERCICIO,event.newData)
          .subscribe(res =>{
            window.location.reload();
          }) 
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
    console.log("Delete Event In Console")
    console.log(event);
    var answer = confirm("Esta seguro de querer eliminar el ejercicio del sistema");
    if (answer) 
    {
      console.log(event.data.ID_EJERCICIO);
      this.RutinaService.deleteEjercicio(event.data.ID_EJERCICIO)
      .subscribe(res =>{
        window.location.reload();
      })       
    }
  }
  ngOnInit(): void {
    this.getEjercicios();
  }
  getEjercicios(){
    this.RutinaService.getEjercicio()
    .subscribe(res =>{
      this.RutinaService.ejercicios = res as EJERCICIO[];
    })
  }

}
