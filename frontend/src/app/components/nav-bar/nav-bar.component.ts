import { Component, OnInit } from '@angular/core';
import { loginService } from '../../services/login.service';
import { Router } from '@angular/router'

import decode from 'jwt-decode';
import { from } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})


//let condition: number=0;

export class NavBarComponent implements OnInit {

  nombre_Persona: any;
  

  constructor(private LoginService : loginService, private router:Router) {  }

  ngOnInit(): void {
    this.getValidRol();
  }
  logout(){
    this.LoginService.logout()
    .subscribe( (data)=>{
      localStorage.setItem('usuario', data['token']);
      this.router.navigate(['login']);
    });
  }
  getValidRol(){
    const token = localStorage.getItem('usuario');
    const tokenPayload: any = decode(token);     
    this.nombre_Persona = tokenPayload.nombre;
  }

  estudianteCargo(){
    const token = localStorage.getItem('usuario');
    const tokenPayload: any = decode(token);     
    this.nombre_Persona = tokenPayload.nombre;
    if (tokenPayload.rol != 1) {
      return true;
    } else {
      return false;
    }    
  }

}
