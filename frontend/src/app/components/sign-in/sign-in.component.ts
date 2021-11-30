import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { sedes } from '../../models/sede';
import { signinService } from '../../services/sign-in.service';
import { PERSONA } from '../../models/PERSONAS';
import { Estadisticas} from '../../models/Estadisticas';
import { EstadisticasService } from '../../services/estadisticas.service';
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
  estadisticas : Estadisticas ={
    diaNumero : 0,
    diaLetra : '',
    mes : '',
    sede : '',
    ano : '',
    hora : '',
  }
  constructor(public registerService: RegisterService, private fb: FormBuilder, private router: Router, public SigninService: signinService, public estadisticasService : EstadisticasService) { 
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
      Nombre: {
        title: 'Nombre',
      },
      Cedula: {
        title: 'Cedula',
      },
      Nombre_sede: {
        title: 'Sede',
      },
      Hora: {
        title: 'Ingreso',
      }
    },
  }
  get cedula() {
    return this.loginForm.get("cedula");
  }

  get sede() {
    return this.loginForm.get("Sede_id_sede");
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
    var sede = this.registerService.sede[form.value.Sede_id_sede];
    var dateDay = new Date().getDay();
    var DIALETRA = this.getDia(dateDay);
    var DIANUMERO = new Date().getDate();
    var AÑO = moment(new Date()).format('YYYY');
    var MES = moment(new Date()).format('MMMM');
    var HORA = moment(new Date()).format('HH');
    this.estadisticas.ano = AÑO;
    this.estadisticas.diaLetra = DIALETRA;
    this.estadisticas.diaNumero = DIANUMERO;
    this.estadisticas.mes = MES;
    this.estadisticas.sede = sede.Nombre_sede;
    this.estadisticas.hora = HORA;
    this.registerService.getRegisterByIdUsuario(form.value.cedula)
    .subscribe(
      res => {  
      if (res[0] == undefined) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">ERROR DE AUTENTICACION</h4>
                 <p>Cedula no registrada</p>
                 <hr>
          </div>`});
      } else if(res[0].Activo == 0){
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">ERROR DE INGRESO</h4>
                 <p>Usuario se encuentra inactivo</p>
                 <hr>
          </div>`});
      }else if (res[0].Ingreso == "false"){       
        let estudiantes = "true";
        let hora = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.loginForm.patchValue({"Ingreso": estudiantes});
        this.loginForm.patchValue({"Hora": hora});
        console.log(form.value);
        this.SigninService.updateEstadoByIdUsuario(res[0].Id_usuario, form.value)
        .subscribe((data) =>{
          this.estadisticasService.createEstadisticas(this.estadisticas)
          .subscribe((data) => {
            M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">INGRESO EXITOSO</h4>
                <hr>
            </div>`});
            this.getIngreso();
          })          
        })  
      } else {
        let estudiantes = "false";
        let hora = '';
        this.loginForm.patchValue({"Ingreso": estudiantes});
        this.loginForm.patchValue({"Hora": hora});
        console.log(form.value);
        this.SigninService.updateEstadoByIdUsuario(res[0].Id_usuario, form.value)
        .subscribe((data) =>{
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">SALIDA EXITOSA</h4>
              <hr>
          </div>`});
          this.getIngreso();
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
    let Ingreso = "true";
    this.SigninService.getRegisterByIdUsuarioIngreso(Ingreso).
    subscribe(res =>{
      console.log("datos", res[0])
      this.registerService.personas = res as PERSONA[];
    }) 
  }
  getDia(index){
    var dia = new Array(7);
    dia[0] = "Domingo";
    dia[1] = "Lunes";
    dia[2] = "Martes";
    dia[3] = "Miércoles";
    dia[4] = "Jueves";
    dia[5] = "Viernes";
    dia[6] = "Sábado";
    return dia[index];
  }
}
