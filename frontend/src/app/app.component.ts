import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdminSign_in: boolean = false;
  isAdminUsers: boolean = false;
  isAdminUsersEdit: boolean = false;
  isAdminActivateUsers: boolean = false;
  isAdminActivate: boolean = false;
  isAdminRegister: boolean = false;
  isAdminExercise: boolean = false;
  isAdminRutina: boolean = false;
  isAdminAssignRoutines: boolean = false;
  numero: any;
  constructor(private router: Router, private _activeRouter: ActivatedRoute) {
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
        }
        else if (e.url === '/admin/users') {
          this.isAdminSign_in = false;
          this.isAdminUsers = true;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = false;
          this.isAdminAssignRoutines = false;
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
        }else if(e.url === '/admin/routines' || e.url ==='/admin/routines/#id'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
          this.isAdminActivate = false;
          this.isAdminRegister = false;
          this.isAdminExercise = false;
          this.isAdminRutina = true;
          this.isAdminAssignRoutines = false;
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
        }
      }
    });
  }
  ngOnInit(): void { }
}
