import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { rutinaService } from '../app/services/rutina.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAdminSign_in: boolean = false;
  isAdminUsers: boolean = false;
  isAdminUsersEdit: boolean = false;
  isAdminActivateUsers: boolean = false;
  isAdminActivate: boolean = false;
  isAdminRegister: boolean = false;
  isAdminExercise: boolean = false;
  isAdminRutina: boolean = false;
  isAdminAssignRoutines: boolean = false;
  isAdminEstadisticas: boolean  = false;
  isUsuariosProfile: boolean  = false;
  isUsuariosRoutines: boolean  = false;
  subscription : Subscription;
  message: string;
  numero: any;
  constructor(private router: Router, private RutinaService: rutinaService) {  
    this.subscription = this.RutinaService.currentMessage.subscribe(message => this.message = message) 
    this.routeEvent(this.router);    
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isAdminSign_in = false;
        this.isAdminUsers = false;
        this.isAdminUsersEdit = false;
        this.isAdminActivateUsers = false;
        this.isAdminActivate = false;
        this.isAdminRegister = false;
        this.isAdminExercise = false;
        this.isAdminRutina = false;
        this.isAdminAssignRoutines = false;
        this.isAdminEstadisticas = false;
        this.isUsuariosProfile = false;
        this.isUsuariosRoutines = false;
        if (e.url === '/admin/sign_in') {
          this.isAdminSign_in = true;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        } else if (e.url === '/admin/users') {
          this.isAdminSign_in = false;
          this.isAdminUsers = true;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        } else if (e.url === '/admin/users/edit') {          
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = true;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        } else if (e.url === '/admin/activate/users'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = true;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        } else if (e.url === '/admin/activate'){          
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = true;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        }else if(e.url === '/admin/register'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = true;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        }else if(e.url === '/admin/exercise'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = true;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        }else if(e.url === '/admin/routines' || e.url ==='/admin/routines/'+this.message){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = true;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        }else if(e.url === '/admin/assignRoutines'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = true;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        }else if(e.url === '/admin/estadisticas'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = true;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = false;
        }else if(e.url === '/usuarios/profile'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = true;
          this.isUsuariosRoutines = false;
        }else if(e.url === '/usuarios/rutinas'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
          this.isAdminEstadisticas = false;
          this.isUsuariosProfile = false;
          this.isUsuariosRoutines = true;
        }
      }
    });
  }
  ngOnInit(): void { 
    
  }

  ngOnDestroy(){

  }
}
