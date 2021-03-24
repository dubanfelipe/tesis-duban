import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { DatosPersona } from '../../models/DATOSPERSONA';
import { Router } from '@angular/router';
import { datosService } from '../../services/datos.service';
import { AutenticarusuariosService } from '../../services/autenticarusuarios.service';
import { emailService } from '../../services/email.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import swal from 'sweetalert2';

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
    TEXTO: '',
  }
  registerForm: FormGroup;
  constructor(public registerService: RegisterService, private router: Router, public DatosService: datosService, 
    public autenticarusuariosService: AutenticarusuariosService, public EmailService: emailService, private fb: FormBuilder) { 
      this.buildForm();
    }
  buildForm(){
    this.registerForm = this.fb.group({
      Nombre: [''],
      Apellido: [''],
      Correo: [''],
      Cedula: [''],  
      Texto: ['', Validators.compose([Validators.required])],
    })
  }
  
  ngOnInit(): void {
    if (this.DatosService.Value_Cedula == undefined) {
      this.router.navigate(['admin/users']);
    } else {
      this.getDatos();
    }
  }
  getDatos(){
    this.registerService.getRegisterByIdPersonaCedula(this.DatosService.Value_Cedula)
    .subscribe(res => {
      console.log(res);
      this.datospersona = res[0];
      this.registerForm.patchValue({"Id_persona": this.datospersona.ID_PERSONA});
      this.registerForm.patchValue({"Nombre": this.datospersona.NOMBRE});
      this.registerForm.patchValue({"Apellido": this.datospersona.APELLIDO});  
      this.registerForm.patchValue({"Correo": this.datospersona.CORREO});
      this.registerForm.patchValue({"Cedula": this.datospersona.CEDULA});
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
  contactForm(form){
    console.log(form.value);
    this.EmailService.postFormulario(form.value)
    .subscribe(() => {
      swal.fire('Correo enviado!', 'Se le informa al usuario por medio de correo electronico!, Por favor eliminar el usuario del Sitema');
      swal.update({
        icon: 'success'
      })
    }); 
  }
  deleteUser(form){
    var answer = confirm("Esta seguro de querer eliminar el Usuario del sistema");
      if (answer) 
      {
        console.log(this.DatosService.Value_Cedula);
        console.log(this.DatosService.Value_Rol);     
        if (this.DatosService.Value_Rol == "Estudiante") {
          this.registerService.getRegisterByIdEstudiante(this.DatosService.Value_Cedula)
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
        } else if (this.DatosService.Value_Rol == "Administrador") {
          if (this.DatosService.Value_Id == 1) {
            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">IMPOSIBLE ELIMINAR ESTE USUARIO</h4>
                  <hr>
              </div>`});      
          } else {
            this.registerService.getRegisterByIdPersonaCedula(this.DatosService.Value_Cedula)
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
          this.registerService.getRegisterByIdUsuario(this.DatosService.Value_Cedula)
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
