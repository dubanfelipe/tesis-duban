import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { PERSONA } from '../../models/PERSONAS';
import { Router } from '@angular/router';
import { datosService } from '../../services/datos.service';

@Component({
  selector: 'app-activate-users',
  templateUrl: './activate-users.component.html',
  styleUrls: ['./activate-users.component.css']
})
export class ActivateUsersComponent implements OnInit {

  constructor(public registerService:RegisterService, private router: Router, public DatosService: datosService) { }
  settings = {
    hideSubHeader: true,
    actions: {
      custom: [
        {
          name: 'activateAction',
          title: '<i class="material-icons">visibility</i>',
        },
      ],
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
      CORREO: {
        title: 'Correo',
      },
      CEDULA: {
        title: 'Cedula',
      },
    },
  }
  onCustom(event) {
    if (event.action == "activateAction") {
      this.DatosService.Value_Cedula = event.data.Cedula;
      this.DatosService.Value_Rol = event.data.Nombre_rol;
      this.DatosService.Value_Id = event.data.Id_persona;
      this.router.navigate(['admin/activate/users']);
    }
  }
  ngOnInit(): void {
    this.getActivos();
  }
  getActivos(){
    let Activo = 0;
    this.registerService.getRegisterByIdPersonaActivo(Activo).
    subscribe(res =>{
      this.registerService.personas = res as PERSONA[];
    })
  }

}
