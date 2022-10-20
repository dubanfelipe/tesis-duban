import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AutenticarusuariosService{

    API_URL = 'http://localhost:3000/api/autenticarusuarios';
    constructor(private http: HttpClient) {}

    changeStatus(id_asesoria:number, status:number){  
        var estado : object = {status}
        return this.http.put(`${this.API_URL}/changeStatus/${id_asesoria}`,estado);
      }
}