import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import  decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class NewGuardsGuard implements CanActivate {
  
  tokenPayload;
  id_Usuario: any;
  constructor (private router: Router){

  }
  canActivate(): boolean {
    const token = localStorage.getItem('usuario');
    this.tokenPayload = decode(token)
    if (this.tokenPayload.rol >= 2 && this.tokenPayload.rol <= 5) {      
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
