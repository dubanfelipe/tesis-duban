import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { DatosPersona } from '../../models/DATOSPERSONA';
import { Router } from '@angular/router';
import { datosService } from '../../services/datos.service';
import { AutenticarusuariosService } from '../../services/autenticarusuarios.service';

declare var M: any;

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  datospersona : DatosPersona = {
    ID_PERSONA : 0,
    NOMBRE : '',
    APELLIDO : '',
    CORREO : '',
    CEDULA : 0,  
    ACTIVO: 0,
    PASSWORD: '',
    ROL_ID_ROL: 0,
  }
  constructor(public registerService: RegisterService, private router: Router, public DatosService: datosService, public autenticarusuariosService: AutenticarusuariosService) { }

  
  ngOnInit(): void {
    this.getDatos();
  }
  getDatos(){
    this.registerService.getRegisterByIdPersonaCedula(this.DatosService.Value_Cedula)
    .subscribe(res => {
      this.datospersona = res[0] as DatosPersona;
    })
  }
  changeStatus(id_usuario:number, estado: any) 
  {    
    if(estado == true)
    {
      let datoEstado = 1;
      this.autenticarusuariosService.changeStatus(id_usuario, datoEstado)
      .subscribe(
        (res) => {
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">USUARIO ACTIVADO</h4>
                <hr>
            </div>`});
      })
    }    
    if(estado == false)
    {
      let datoEstado = 0;
      this.autenticarusuariosService.changeStatus(id_usuario, datoEstado)
      .subscribe(
        (res) => {
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">USUARIO INACTIVADO</h4>
                <hr>
            </div>`});
      })
    }   
  }
}
