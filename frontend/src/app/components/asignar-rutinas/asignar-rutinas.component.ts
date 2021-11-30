import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { rutinaService } from '../../services/rutina.service';
import { PERSONA } from '../../models/PERSONAS';
import { RutinaCompleta } from '../../models/rutinaCompleta';
import { Router } from '@angular/router';
import { datosService } from '../../services/datos.service';
import { RutinaCompletahasPersona } from '../../models/rutinaCompletaHasPersona';
import { Subscription } from 'rxjs';

declare var M: any;

@Component({
  selector: 'app-asignar-rutinas',
  templateUrl: './asignar-rutinas.component.html',
  styleUrls: ['./asignar-rutinas.component.css']
})
export class AsignarRutinasComponent implements OnInit {

  selectedRows: any;
  RutinaSeleccionada;
  message: string;
  subscription: Subscription;
  bandera = false;
  HAS: RutinaCompletahasPersona = {
    Id_rutinacompleta: 0,
    Id_persona: 0
  }

  constructor(public registerService:RegisterService, private router: Router, public DatosService:datosService, public RutinaService:rutinaService) { }
  settings = {
    selectMode: 'multi',
    hideSubHeader: false,
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      Nombre: {
        title: 'Nombre',        
        width: '150px',
      },
      Apellido: {
        title: 'Apellido',        
        width: '150px',
      },
      Cedula: {
        title: 'Cedula',  
        width: '150px',
      },
      Nombre_rol: {
        title: 'Ocupacion',
        width: '150px',
      },   
      Rutina_asignada:{
        title: 'Rutina Asignada',
      } 
    },
  }
  settingsRutina = {
    actions: {
      custom: [
        {
          name: 'assignmentRoutines',
          title: '<i class="material-icons">check_box_outline_blank</i>',
        },
        {
          name: 'editRoutines',
          title: '<i class="material-icons">open_in_new</i>',
        },
        {
          name: 'deleteAction',
          title: '<i class="material-icons">delete</i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      Nombre_Rutina: {
        title: 'Rutina',
      },        
    },
  }
  onCustom(event) {
    if (event.action == "assignmentRoutines") { 
      this.RutinaSeleccionada = event.data;     
      if(this.selectedRows === undefined){
        document.getElementById("modalUsers").click();
      }else if(this.selectedRows.length === 0){
        document.getElementById("modalUsers").click();   
      }else{        
        document.getElementById("modalConfirm").click();         
      }
    } else if (event.action == "editRoutines"){
      this.RutinaService.idRutinaCompleta = event.data.Id_rutinacompleta;
      this.subscription = this.RutinaService.currentMessage.subscribe(message => this.message = message);
      this.RutinaService.changeMessage(event.data.Id_rutinacompleta);
      this.router.navigate(['/admin/routines/'+event.data.Id_rutinacompleta]);
    } else if (event.action == "deleteAction"){
      document.getElementById("modalDelete").click();      
    }    
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.getRutinas();
  }
  getUsuarios(){
    this.registerService.getRegisterRol().
    subscribe(res =>{
      console.log(res);
      this.registerService.personas = res as PERSONA[];
    })
  }
  getRutinas(){
    this.RutinaService.getRutinacompleta()
    .subscribe(res =>{
      console.log(res);
      this.RutinaService.rutina = res as RutinaCompleta[];
    })
  }
  onRowSelect(event) {
    this.selectedRows = event.selected;
  }
  DeleteRutina(){
    let RutinaNo = "No";
    this.registerService.updateRegisterRutinaAsignadaByRutinaAsignada(this.RutinaSeleccionada.Nombre_Rutina, RutinaNo)
    .subscribe(res =>{
      this.RutinaService.deleteRutinaCompletaHasPersona(this.RutinaSeleccionada.Id_rutinacompleta)
      .subscribe(res =>{
        this.RutinaService.deleteRutinacompleta(this.RutinaSeleccionada.Id_rutinacompleta)
        .subscribe(res =>{ 
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">RUTINAS ELIMINADAS</h4>
                <hr>
            </div>`}); 
          this.getRutinas();
          this.getUsuarios();
        })
      })
    })
  }

  ConfirmRutina(){
    for (let index = 0; index < this.selectedRows.length; index++) {    
      this.HAS.Id_persona = this.selectedRows[index].Id_persona;
      this.HAS.Id_rutinacompleta = this.RutinaSeleccionada.Id_rutinacompleta;
      this.selectedRows[index].Rutina_asignada = this.RutinaSeleccionada.Nombre_Rutina;
      this.RutinaService.deleteRutinaCompletaHas(this.HAS.Id_persona)
      .subscribe(res =>{
        this.RutinaService.createRutinacompletaHasPersona(this.HAS)
        .subscribe(res => {                 
          this.registerService.updateRegisterRutinaAsignadaByIdPersona(this.HAS.Id_persona, this.selectedRows[index])
          .subscribe(res => {  
            M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">RUTINAS ASIGNADAS</h4>
                  <hr>
              </div>`});  
              this.getUsuarios();            
          })            
        }) 
      })           
    }       
  }
}
