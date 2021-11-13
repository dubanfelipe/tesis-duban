import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {
    this.routeEvent(this.router);
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isAdminSign_in = false;
        this.isAdminUsers = false;
        this.isAdminUsersEdit = false;
        this.isAdminActivateUsers = false;
        if (e.url === '/admin/sign_in') {
          this.isAdminSign_in = true;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
        }
        else if (e.url === '/admin/users') {
          this.isAdminSign_in = false;
          this.isAdminUsers = true;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = false;
        } else if (e.url === '/admin/users/edit') {          
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = true;
          this.isAdminActivateUsers = false;
        } else if (e.url === '/admin/activate/users'){
          this.isAdminSign_in = false;
          this.isAdminUsers = false;
          this.isAdminUsersEdit = false;
          this.isAdminActivateUsers = true;
        }
      }
    });
  }
  ngOnInit(): void { }
}
