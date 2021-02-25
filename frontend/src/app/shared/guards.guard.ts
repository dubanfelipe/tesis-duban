import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {

  id_Usuario: any; 
  constructor (private router : Router){
  }
  canActivate(): boolean  {
      const token = localStorage.getItem('usuario');
      console.log("en el guards", token);
      if (token === 'null') {      
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
  }  
}
