import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import  decode  from 'jwt-decode';

declare var M: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  tokenPayload;
  registerForm: FormGroup;
  disabled: boolean = false;
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    const token = localStorage.getItem('usuario');
    this.tokenPayload = decode(token)
    this.tokenPayload.activo == 0 ? this.disabled = false : this.disabled = true;
  }

  routeRutina(){
    this.registerService.getRegisterByIdPersonaCedula(this.tokenPayload.cedula)
    .subscribe( res => {
      if(res[0].Rutina_asignada == "NO"){
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">ACCIÓN FALLIDA</h4>
                 <p>El usuario aun no tiene Rutina Asignada</p>
                 <hr>
            </div>`});
      }else{
        this.router.navigate(['usuarios/rutinas']);
      }
    })
  }
  
}
