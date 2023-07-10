import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { PERSONA } from '../../models/PERSONAS';
import { Router } from '@angular/router';
import { datosService } from '../../services/datos.service';
import { rutinaService } from 'src/app/services/rutina.service';

declare var M: any;

@Component({
  selector: 'app-data-users',
  templateUrl: './data-users.component.html',
  styleUrls: ['./data-users.component.css']
})
export class DataUsersComponent implements OnInit {

  Nombre_Rol;
  Cedula;
  Id_Persona: any;
  Nombre_Apellido: any;
  constructor(public registerService:RegisterService, private router: Router, public DatosService:datosService, public RutinaService:rutinaService) { }
  settings = {
    hideSubHeader: false,
    actions: {
      custom: [
        {
          name: 'activateAction',
          title: '<i class="material-icons">visibility</i>',
        },
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
      Nombre: {
        title: 'Nombre',
      },
      Apellido: {
        title: 'Apellido',
      },
      Correo: {
        title: 'Correo',
      },
      Cedula: {
        title: 'Cedula',
      },
      Nombre_rol: {
        title: 'Ocupacion',
      },    
    },
  }
  onCustom(event) {
    if (event.action == "editAction") {
      this.DatosService.Value_Cedula = event.data.Cedula;
      this.DatosService.Value_Rol = event.data.Nombre_rol;
      this.DatosService.Value_Id = event.data.Id_persona;
      this.router.navigate(['admin/users/edit']);
    }
    if (event.action == "activateAction") {
      this.DatosService.Value_Cedula = event.data.Cedula;
      this.DatosService.Value_Rol = event.data.Nombre_rol;
      this.DatosService.Value_Id = event.data.Id_persona;
      this.router.navigate(['admin/activate/users']);
    }
    if (event.action == "deleteAction") {
      this.Nombre_Rol = event.data.Nombre_rol;
      this.Cedula = event.data.Cedula;
      this.Id_Persona = event.data.Id_persona; 
      this.Nombre_Apellido = event.data.Nombre + ' ' + event.data.Apellido;
      document.getElementById("modalNotificacion").click();        
    }
  }
  DeleteUser(){
    this.RutinaService.deleteRutinaCompletaHas(this.Id_Persona)
      .subscribe(res =>{
        if (this.Nombre_Rol == "Estudiante") {
          this.registerService.getRegisterByIdEstudiante(this.Cedula)
          .subscribe(res =>{
            let ESTUDIANTE = res[0].Id_estudiante;
            let USUARIO = res[0].Id_usuario;
            let PERSONA = res[0].Id_persona;
            this.registerService.deleteRegisterByIdEstudiante(ESTUDIANTE)
            .subscribe(res =>{   
              this.registerService.deleteRegisterByIdUsuario(USUARIO)
              .subscribe(res =>{
                this.registerService.deleteRegisterByIdPersona(PERSONA)
                .subscribe(res =>{
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
        } else if (this.Nombre_Rol == "Administrador") {
          if (this.Id_Persona == 1) {
            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">IMPOSIBLE ELIMINAR ESTE USUARIO</h4>
                  <hr>
              </div>`});      
          } else {
            this.registerService.getRegisterByIdPersonaCedula(this.Cedula)
            .subscribe(res =>{
              let PERSONA = res[0].Id_persona;
              this.registerService.deleteRegisterByIdPersona(PERSONA)
              .subscribe(res =>{
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
          this.registerService.getRegisterByIdUsuario(this.Cedula)
          .subscribe(res =>{
            let USUARIO = res[0].Id_usuario;
            let PERSONA = res[0].Id_persona;
            this.registerService.deleteRegisterByIdUsuario(USUARIO)
            .subscribe(res =>{
              this.registerService.deleteRegisterByIdPersona(PERSONA)
              .subscribe(res =>{
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
      }) 
    
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
