import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { PERSONA } from '../../models/PERSONAS';
import { Router } from '@angular/router';
import { datosService } from '../../services/datos.service';

declare var M: any;

@Component({
  selector: 'app-data-users',
  templateUrl: './data-users.component.html',
  styleUrls: ['./data-users.component.css']
})
export class DataUsersComponent implements OnInit {

  constructor(public registerService:RegisterService, private router: Router, public DatosService:datosService) { }
  settings = {
    hideSubHeader: false,
    actions: {
      custom: [
        {
          name: 'editAction',
          title: '<i class="material-icons">edit</i>',
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
      ID_PERSONA:{
        title:'#',
      },
      NOMBRE: {
        title: 'Nombre',
      },
      APELLIDO: {
        title: 'Apellido',
      },
      CORREO: {
        title: 'Correo',
      },
      CEDULA: {
        title: 'Cedula',
      },
      NOMBRE_ROL: {
        title: 'Ocupacion',
      },    
    },
  }
  onCustom(event) {
    if (event.action == "editAction") {
      this.DatosService.Value_Cedula = event.data.CEDULA;
      this.DatosService.Value_Rol = event.data.NOMBRE_ROL;
      this.router.navigate(['admin/users/edit']);
    }
    if (event.action == "deleteAction") {
      var answer = confirm("Esta seguro de querer eliminar el Usuario del sistema");
      if (answer) {
        if (event.data.NOMBRE_ROL == "Estudiante") {
          this.registerService.getRegisterByIdEstudiante(event.data.CEDULA)
          .subscribe(res =>{
            console.log(res);
            let ESTUDIANTE = res[0].ID_ESTUDIANTE;
            let USUARIO = res[0].ID_USUARIO;
            let PERSONA = res[0].ID_PERSONA;
            this.registerService.deleteRegisterByIdEstudiante(ESTUDIANTE)
            .subscribe(res =>{              
              console.log(res);
              this.registerService.deleteRegisterByIdUsuario(USUARIO)
              .subscribe(res =>{
                console.log(res);
                this.registerService.deleteRegisterByIdPersona(PERSONA)
                .subscribe(res =>{
                  console.log(res);
                  M.toast({
                    html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">USUARIO ELIMINADO</h4>
                        <hr>
                    </div>`});
                  window.location.reload();
                }) 
              }) 
            })             
          })
        } else if (event.data.NOMBRE_ROL == "Administrador") {
          if (event.data.ID_PERSONA == 1) {
            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">IMPOSIBLE ELIMINAR ESTE USUARIO</h4>
                  <hr>
              </div>`});      
          } else {
            this.registerService.getRegisterByIdPersonaCedula(event.data.CEDULA)
            .subscribe(res =>{
              console.log(res);
              let PERSONA = res[0].ID_PERSONA;
              this.registerService.deleteRegisterByIdPersona(PERSONA)
              .subscribe(res =>{
                console.log(res);
                M.toast({
                  html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">ADMINISTRADOR ELIMINADO</h4>
                      <hr>
                  </div>`});
                window.location.reload();
              }) 
            }) 
          }          
        } else {
          this.registerService.getRegisterByIdUsuario(event.data.CEDULA)
          .subscribe(res =>{
            console.log(res);
            let USUARIO = res[0].ID_USUARIO;
            let PERSONA = res[0].ID_PERSONA;
            this.registerService.deleteRegisterByIdUsuario(USUARIO)
            .subscribe(res =>{
              console.log(res);
              this.registerService.deleteRegisterByIdPersona(PERSONA)
              .subscribe(res =>{
                console.log(res);
                M.toast({
                  html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">USUARIO ELIMINADO</h4>
                      <hr>
                  </div>`});
                window.location.reload();
              }) 
            }) 
          })
        }
      } 
    }
  }
  ngOnInit(): void {
    this.getUsuarios();
  }
  getUsuarios(){
    this.registerService.getRegister().
    subscribe(res =>{
      this.registerService.personas = res as PERSONA[];
    })
  }
}
