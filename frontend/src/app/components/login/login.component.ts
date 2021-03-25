import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginService } from '../../services/login.service';
import  decode  from 'jwt-decode';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm: FormGroup;
  tokenPayload;
  constructor(private LoginService: loginService, private fb: FormBuilder, private router: Router) { 
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      cedula: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit(): void {
    this.LoginService.logout()
      .subscribe((data) => {
        localStorage.setItem('usuario', data['token']);
        this.router.navigate(['login']);
      });
  }
  
  login(form){
  this.LoginService.authentication(form.value)
    .subscribe((data) => {
      if (data['fail'] == 1) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">FALLO AUTENTICACIÓN</h4>
                 <p>Correo y/o contraseña incorrecta</p>
                 <hr>
            </div>`});
      }
      else if (data['fail'] == 2) {        
        M.toast({          
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">FALLO AUTENTICACIÓN</h4>
                 <p>Correo y/o contraseña incorrecta</p>
                 <hr>
            </div>`});
      }else if (data['fail'] == 3) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
               <h4 class="alert-heading">USUARIO INACTIVO</h4>
               <p>El usuario ya se encuentra registrado, pero aun no ha sido activado</p>
               <hr>
           </div>`});
      } else {
        localStorage.setItem('usuario', data['token']);      
        this.tokenPayload = decode(data['token']); 
        console.log("ROl",this.tokenPayload.rol);
        if (this.tokenPayload.rol == 1) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['usuarios']);
        }
           
      } 
    });
  }
}
