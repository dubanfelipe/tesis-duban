import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login } from '../models/login';

@Injectable({
    providedIn: 'root'
})
export class loginService{
    API_URL = 'http://localhost:3000/api';
    constructor(private http: HttpClient) {}

    authentication(usuario:login){
        console.log(this.API_URL+`/login`);
        return this.http.post(this.API_URL+'/login',usuario);
    }
    logout(){
        return this.http.get(this.API_URL+'/login/logout');
    }
    recoveryPassword(recovery:any){    
        return this.http.post(this.API_URL+'/login/recoveryPassword',recovery);
    }
    recoveryCode(correo:string){
        return this.http.post(this.API_URL+'/login/recoveryCode',{correo});
    }
}