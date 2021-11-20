import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { estados } from '../models/estado';

@Injectable({
    providedIn: 'root'
})
export class signinService{

    API_URL = 'http://localhost:3000/api/signin';
    constructor(private http: HttpClient) {}

    updateEstadoByIdUsuario(id:number, datos: estados){    
        console.log(id,datos);
        return this.http.put(this.API_URL+`/ingreso/${id}`,datos);
    }
    getRegisterByIdUsuarioIngreso(Ingreso: string){
        return this.http.get(this.API_URL+`/ingreso/Activate/${Ingreso}`);
    }
}