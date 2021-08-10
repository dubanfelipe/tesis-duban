import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { rutinaService } from '../../services/rutina.service';
import { PERSONA } from '../../models/PERSONAS';
import { RutinaCompleta } from '../../models/rutinaCompleta';
import { Router } from '@angular/router';
import { datosService } from '../../services/datos.service';
import { RutinaCompletahasPersona } from '../../models/rutinaCompletaHasPersona';

declare var M: any;

@Component({
  selector: 'app-asignar-rutinas',
  templateUrl: './asignar-rutinas.component.html',
  styleUrls: ['./asignar-rutinas.component.css']
})
export class AsignarRutinasComponent implements OnInit {

  selectedRows: any;
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
      NOMBRE: {
        title: 'Nombre',
      },
      APELLIDO: {
        title: 'Apellido',
      },
      CEDULA: {
        title: 'Cedula',
      },
      NOMBRE_ROL: {
        title: 'Ocupacion',
      },   
      RUTINA_ASIGNADA:{
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
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      NOMBRE_RUTINA: {
        title: 'Nombre Rutina',
      },        
    },
  }
  onCustom(event) {
    if (event.action == "assignmentRoutines") {      
      if(this.selectedRows === undefined){
        console.log("pailas");
      }else if(this.selectedRows.length === 0){
        console.log("pailas Nuevo");   
      }else{        
        //document.getElementById("prueba").click();
        for (let index = 0; index < this.selectedRows.length; index++) {    
          this.HAS.Id_persona = this.selectedRows[index].ID_PERSONA;
          this.HAS.Id_rutinacompleta = event.data.ID_RUTINACOMPLETA;
          this.selectedRows[index].RUTINA_ASIGNADA = event.data.NOMBRE_RUTINA;
          this.RutinaService.createRutinacompletaHasPersona(this.HAS)
          .subscribe(res => {              
          })   
          this.registerService.updateRegisterRutinaAsignadaByIdPersona(this.HAS.Id_persona, this.selectedRows[index])
          .subscribe(res => {              
          })       
        }   
        M.toast({
          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">RUTINAS ASIGNADAS</h4>
              <hr>
          </div>`});  
          window.location.reload();
      }
    }
    if (event.action == "editRoutines"){
      this.RutinaService.idRutinaCompleta = event.data.ID_RUTINACOMPLETA;
      this.router.navigate(['/admin/routines/'+event.data.ID_RUTINACOMPLETA]);
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
      this.RutinaService.rutina = res as RutinaCompleta[];
    })
  }
  onRowSelect(event) {
    this.selectedRows = event.selected;
  }
}
