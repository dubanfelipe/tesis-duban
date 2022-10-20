import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { DatosPersona } from '../../models/DATOSPERSONA';
import { Router } from '@angular/router';
import { datosService } from '../../services/datos.service';
import { AutenticarusuariosService } from '../../services/autenticarusuarios.service';
import { emailService } from '../../services/email.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import { subirArchivosService } from '../../services/subirArchivos.service';
import swal from 'sweetalert2';

declare var M: any;

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  public rolAdministrador: boolean = false;
  public Cargo: boolean = false;
  archivoCarnet;
  archivoTamizaje;
  NombreUsuario : string = '';
  ApellidoUsuario : string = '';
  URLS: string[] = [];
  Documentos: string[] = [];
  datospersona : DatosPersona = {
    Id_persona : 0,
    Nombre : '',
    Apellido : '',
    Correo : '',
    Cedula : 0,  
    Activo : 0,
    Password : '',
    Rol_id_rol: 0,
    Texto: '',
  }
  registerForm: FormGroup;
  DocumentosForm: FormGroup;
  TextoForm:FormGroup;
  datosFormulario = new FormData();
  constructor(public registerService: RegisterService, private router: Router, public DatosService: datosService, 
    public autenticarusuariosService: AutenticarusuariosService, public EmailService: emailService, private fb: FormBuilder, public subirarchivosServico: subirArchivosService) { 
      this.buildForm();
    }
  buildForm(){
    this.registerForm = this.fb.group({
      Nombre: [''],
      Apellido: [''],
      Correo: [''],
      Cedula: [''],  
      Texto: [''], 
    })
    this.TextoForm = this.fb.group({
      Texto: ['', Validators.compose([Validators.required])],
    })
    this.DocumentosForm = this.fb.group({
      CarnetDocument: [{ value: '', disabled: true }, Validators.required],
      TamizajeDocument: [{ value: '', disabled: true }, Validators.required],
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
      this.datospersona = res[0];
      if (this.datospersona.Rol_id_rol === 1) {
        this.rolAdministrador = true;
      }
      this.NombreUsuario = this.datospersona.Nombre;
      this.ApellidoUsuario = this.datospersona.Apellido;
      this.registerForm.patchValue({"Id_persona": this.datospersona.Id_persona});
      this.registerForm.patchValue({"Nombre": this.datospersona.Nombre});
      this.registerForm.patchValue({"Apellido": this.datospersona.Apellido});  
      this.registerForm.patchValue({"Correo": this.datospersona.Correo});
      this.registerForm.patchValue({"Cedula": this.datospersona.Cedula});
      this.Documentos[0] = this.datospersona.Cedula+"_Carnet";
      this.Documentos[1] = this.datospersona.Cedula+"_Tamizaje";
      this.DocumentosForm.patchValue({
        CarnetDocument: this.Documentos[0],
        TamizajeDocument: this.Documentos[1],
      })
      for (let index = 0; index < this.Documentos.length; index++) {        
        this.handleInputChange(this.Documentos[index], index);
      }
      this.Cargo = true;
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

  public handleInputChange(nombreArchivo: string, i:number) {
    let referencia = this.subirarchivosServico.getUrlArchivo(nombreArchivo);
    referencia.getDownloadURL().subscribe((URL) => {    
      this.URLS[i] = URL;
    },(error) => {
        console.log(error)  
    });  
  }

  contactForm(form, form2){
    form.value.Texto = form2.value.Texto;   
    this.EmailService.postFormulario(form.value)
    .subscribe(() => {
      swal.fire('Correo enviado!', 'Se le informa al usuario por medio de correo electronico!');
      swal.update({
        icon: 'success'
      })
    });  
  }
}
