import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { sedes } from '../../models/sede';
import { signinService } from '../../services/sign-in.service';
import { PERSONA } from '../../models/PERSONAS';
import { from } from 'rxjs';
import * as moment from 'moment';

declare var M: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  constructor(public registerService: RegisterService, private fb: FormBuilder, private router: Router, public SigninService: signinService) { 
    this.buildForm();
  }
  settings = {
    hideSubHeader: true,
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
      CEDULA: {
        title: 'Cedula',
      },
      NOMBRE_SEDE: {
        title: 'Sede',
      },
      HORA: {
        title: 'Ingreso',
      }
    },
  }
  buildForm() {
    this.loginForm = this.fb.group({
      cedula: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)])],
      Sede_id_sede: ['', Validators.compose([Validators.required])],
      Ingreso: [''],
      Hora: [''],
    });
  }
  sigin(form){
    console.log(form.value.cedula);
    this.registerService.getRegisterByIdUsuario(form.value.cedula)
    .subscribe(
      res => {  
      console.log(res[0]);
      if (res[0] == undefined) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">ERROR DE AUTENTICACION</h4>
                 <p>Cedula no registrada</p>
                 <hr>
          </div>`});
      } else if (res[0].INGRESO == 0){       
        let estudiantes = "true";
        let hora = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.loginForm.patchValue({"Ingreso": estudiantes});
        this.loginForm.patchValue({"Hora": hora});
        console.log(form.value);
        this.SigninService.updateEstadoByIdUsuario(res[0].ID_USUARIO, form.value)
        .subscribe((data) =>{
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">INGRESO EXITOSO</h4>
              <hr>
          </div>`});
          window.location.reload();
        })  
      } else {
        let estudiantes = "false";
        let hora = '';
        this.loginForm.patchValue({"Ingreso": estudiantes});
        this.loginForm.patchValue({"Hora": hora});
        console.log(form.value);
        this.SigninService.updateEstadoByIdUsuario(res[0].ID_USUARIO, form.value)
        .subscribe((data) =>{
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">SALIDA EXITOSA</h4>
              <hr>
          </div>`});
          window.location.reload();
        })  
      }       
    });
  }
  ngOnInit(): void {
    this.getSedes();
    this.getIngreso();
  }
  getSedes(){      
    this.registerService.getSede()
      .subscribe(res => {
        this.registerService.sede = res as sedes[];
      })
  }
  getIngreso(){
    let Ingreso = 1;
    this.SigninService.getRegisterByIdUsuarioIngreso(Ingreso).
    subscribe(res =>{
      console.log("datos", res[0])
      this.registerService.personas = res as PERSONA[];
    }) 
  }
}
